// const express = require('express');
const Comment = require('../models/commentModel');

exports.comment_create = async function (req, res) {
    console.log("post  comments...")

    
        res.json(await Comment.create(req.body))
    

}

exports.comment_delete = async function (req, res) {
    console.log(`Deleting comment: ${req.params.id}`)
    Comment.deleteOne({'_id': req.params.id}, (err) => {
        if (err) {
            res.status(400).send("Unable to delete comment")
        } else {
            res.json({success: true});
        }
    })
}

exports.comment_getAllByPost = async function (req, res) {
    console.log("getting all comments...")
    const allDocs = await Comment.find({ post: req.params.postId})

    if (Object.keys(allDocs).length > 0) {
        res.send(allDocs)
    } else {
        res.status(204).json({})
    }

}

exports.comment_getById = async function (req, res) {
    console.log(`getting comment by id number:  ${req.params.id}`)
    const doc = await Comment.findOne({'_id': req.params.id}).exec()

    if (doc != null) {
        res.send(doc)
    } else {
        res.status(204).json({})
    }
}

exports.comment_updateById = async function (req, res) {
    const name = await (req.body.name);

    Comment.updateOne({'_id': req.params.id}, {name}, {}, (err, r) => {
            if (err) {
                res.json({error: err.message})
            } else {
                res.json({success: true});
            }
        })
}
