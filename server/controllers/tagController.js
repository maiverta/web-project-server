// const express = require('express');
const Tag = require('../models/tagModel');

exports.tag_create = async function (req, res) {
    const name = await (req.body.name);
    const count = 0

    //check validation
    let errors = {};
    if (!name) {
        errors = {name: "Tag must have name"}
    }
    if (Object.keys(errors).length > 0) {
        res.json({errors})
    } else {
        const tag = new Tag({
            name,
            count
        })
        tag.save();
        res.json({success: true})
    }

}

exports.tag_delete = async function (req, res) {
    console.log(`Deleting tag: ${req.params.id}`)
    Tag.deleteOne({'_id': req.params.id}, (err) => {
        if (err) {
            res.status(400).send("Unable to delete tag")
        } else {
            res.json({success: true});
        }
    })
}

exports.tag_getAll = async function (req, res) {
    console.log("getting all tags...")
    const allDocs = await Tag.find({})

    if (Object.keys(allDocs).length > 0) {
        res.send(allDocs)
    } else {
        res.status(204).json({})
    }

}

exports.tag_getById = async function (req, res) {
    console.log(`getting tag by id number:  ${req.params.id}`)
    const doc = await Tag.findOne({'_id': req.params.id}).exec()

    if (doc != null) {
        res.send(doc)
    } else {
        res.status(204).json({})
    }
}

exports.tag_updateById = async function (req, res) {
    const name = await (req.body.name);

    Tag.updateOne({'_id': req.params.id}, {name}, {}, (err, r) => {
            if (err) {
                res.json({error: err.message})
            } else {
                res.json({success: true});
            }
        })
}
