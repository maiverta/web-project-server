const Post = require('../models/postModel');

exports.get_postsByAuthor = function (req, res) {
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
            $group: {
                _id: "$author.username",
                count: {$sum: 1}
            }
        },
        {
            $project: {
                name: "$_id",
                count: 1,
                _id: 0
            }
        },

    ], (err, docs) => res.json(docs))
}

exports.get_tagsByPost = function (req, res) {
    Post.aggregate([
        {
            $lookup: {
                "from": "tags",
                "localField": "tag",
                "foreignField": "tag.name",
                "as": "tag"
            },
        },
        {
            $unwind: "$tag"
        },
        {
            $group: {
                _id: "$tag.name",
                count: {$sum: 1}
            }
        }, 
        {
           $project: {
            name: "$_id",
            count: 1,
            _id: 0
           }
        },

    ], (err, docs) => res.json(docs))
}

exports.get_suggestedPost = async function (req, res) {
    const doc = await Post
        .find({})
        .sort({"counter": -1})
        .limit(1)
        .exec(
        )
    res.json(doc[0]._id)
}

