const Post = require('../models/postModel');
const mongoose = require('mongoose');
const User = require("../models/userModel");

const socket = require('../socket');




exports.post_create = function (req, res) {
    console.log(`Entered insert post with body ${JSON.stringify(req.body)}`)
    const title = req.body.title || '';
    const text = req.body.text || '';
    const imageLink = req.body.imageLink || '';
    const tag = req.body.tag || '';
    console.log('gty')
    console.log(req.user)
    const author = req.user.id || '';
    const counter = 0;

    const requestBody = {title, text, imageLink};

    //validation
    let errors = {};
    if (!title) {
        errors = {...errors, title: "Post must have a title"};
    }
    if (Object.keys(errors).length > 0) {
        res.json({errors});
    } else {
        const post = new Post({
            title,
            text,
            imageLink,
            author,
            tag,
            counter
        });
        post.save();
        res.json({success: true});
    }

    socket.updateStatistics();

    console.log("Finished insert post")

}

exports.post_get = function (req, res) {
    Post.aggregate([
            {
                $lookup: {
                    "from": "users",
                    "localField": "author",
                    "foreignField": "_id",
                    "as": "author"
                },
            },
            {
                $unwind: "$author"
            },
            {
                $project:
                    {
                        "id": "$_id",
                        "title": 1,
                        "text": 1,
                        "imageLink": 1,
                        "videoLink": 1,
                        "createDate": 1,
                        "tag": 1,
                        "authorName": "$author.username",
                    }
            },
            {
                $sort:
                    {
                        "createDate": -1
                    }
            }

        ],
        (err, docs) => res.json(docs));
};

exports.post_getMyPosts = async function (req, res){
    console.log(req.params.userId)
    return res.send(await Post.find({ author: req.params.userId}));
}

exports.post_findById = function (req, res) {
    let doc = null;
    Post.findOneAndUpdate({_id: req.params.id},  {$inc: {counter: 1}}, {}, (err, r) => {
        if (err) {
            res.json({error: err.message})
        }
    })

    Post.aggregate([
        {
            $match:
                {
                    "_id": mongoose.Types.ObjectId(req.params.id)
                }
        },
        {
            $lookup:
                {
                    "from": "users",
                    "localField": "author",
                    "foreignField": "_id",
                    "as": "author"
                },
        },
        {
            $unwind: "$author"
        },
        {
            $project:
                {
                    "id": "$_id",
                    "title": 1,
                    "text": 1,
                    "imageLink": 1,
                    "videoLink": 1,
                    "createDate": 1,
                    "tag": 1,
                    "authorName": "$author.username",
                }
        },
        {
            $sort:
                {
                    "createDate": -1
                }
        }

    ], {allowDiskUse: true}, (err, docs) => {
        res.json(docs[0])
    })
    ;
}

exports.post_deleteOne = function (req, res) {
    Post.deleteOne({'_id': req.params.id}, (err) => {
        if (err) {
            res.status(401).send("Unable to delete post")
        } else {
            res.json({success: true});
        }
    })
}

exports.post_update = function (req, res) {
    const title = req.body.title || '';
    const text = req.body.text || '';
    const imageLink = req.body.imageLink || '';
    const tag = req.body.tag || '';
    const requestBody = {title, text, imageLink, tag};

    Post.updateOne({'_id': req.params.id},
        {
            title: requestBody.title,
            text: requestBody.text,
            imageLink: requestBody.imageLink,
            tag: requestBody.tag
        }, {}, (err, r) => {
            if (err) {
                res.json({error: err.message})
            } else {
                res.json({success: true});
            }
        })
};

