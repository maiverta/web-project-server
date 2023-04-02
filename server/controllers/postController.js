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
    const author = req.body.author || '';
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
            counter, 
            likedByUsers: []
        });
        post.save();
        res.json({success: true});
    }

    socket.updateStatistics();

    console.log("Finished insert post")

}

exports.post_get = async function (req, res) {

    const allDocs = await Post.find()

    if (Object.keys(allDocs).length > 0) {
        res.send(allDocs)
    } else {
        res.status(204).json({})
    }

};

exports.post_getMyPosts = async function (req, res){
    console.log(req.params.email)
    return res.send(await Post.find({ author: req.params.email}));
}

exports.post_findById = async function (req, res) {
    console.log(`getting post by id number:  ${req.params.id}`)
    const doc = await Post.findOne({'_id': req.params.id}).exec()

    if (doc != null) {
        res.send(doc)
    } else {
        res.status(204).json({})
    }
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
    console.log('ffffffsefgedgf')
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

exports.post_update_like = async function (req, res) {
    console.log(req.params.id + '111')
    console.log(req.body.isLike)
    const postToUpdate = await Post.findOne({'_id': req.params.id}).exec();
    if(req.body.isLike){
        postToUpdate.likedByUsers.push(req.params.userId)
    } else{
        const userIndex = postToUpdate.likedByUsers.findIndex(user=> user === req.params.userId)
        postToUpdate.likedByUsers.splice(userIndex, 1)
    }
    console.log(postToUpdate.likedByUsers)

    Post.updateOne({'_id': req.params.id},
      postToUpdate, {}, (err, r) => {
            if (err) {
                res.json({error: err.message})
            } else {
                res.json(postToUpdate);
            }
        })
};

