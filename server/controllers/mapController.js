// const express = require('express');
const Map = require('../models/mapModel');

exports.map_create = async function (req, res) {
    const lat = await (req.body.lat);
    const lng = await (req.body.lng);
    const src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.171371873347!2d34.773351384468384!3d31.98336953133235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b37bf96df5af%3A0xab734fe25f9def7a!2z16HXmdeg157XlCDXodeZ15jXmSDXqNeQ16nXnNe016Y!5e0!3m2!1siw!2sil!4v1661333732300!5m2!1siw!2sil"

    //check validation
    let errors = {};
    
    if (Object.keys(errors).length > 0) {
        res.json({errors})
    } else {
        const map = new Map({
            lat,
            lng,
            src
        })
        map.save();
        res.json({success: true})
    }

}

exports.map_delete = async function (req, res) {
    console.log(`Deleting map: ${req.params.id}`)
    Map.deleteOne({'_id': req.params.id}, (err) => {
        if (err) {
            res.status(400).send("Unable to delete map")
        } else {
            res.json({success: true});
        }
    })
}

exports.map_getAll = async function (req, res) {
    console.log("getting all maps...")
    const allDocs = await Map.find({})

    if (Object.keys(allDocs).length > 0) {
        res.send(allDocs)
    } else {
        res.status(204).json({})
    }

}

exports.map_getById = async function (req, res) {
    console.log(`getting map by id number:  ${req.params.id}`)
    const doc = await Map.findOne({'_id': req.params.id}).exec()

    if (doc != null) {
        res.send(doc)
    } else {
        res.status(204).json({})
    }
}

exports.map_updateById = async function (req, res) {
    const lat = await (req.body.lat);
    const lng = await (req.body.lng);

    Map.updateOne({'_id': req.params.id}, {lat,lng}, {}, (err, r) => {
            if (err) {
                res.json({error: err.message})
            } else {
                res.json({success: true});
            }
        })
}
