// const express = require('express');
const Commercial = require('../models/CommercialModel');

exports.commercial_getAll = async function (req, res) {
    console.log("getting all commercials...")
    const allDocs = await Commercial.find({})

    if (Object.keys(allDocs).length > 0) {
        res.send(allDocs)
    } else {
        res.status(204).json({})
    }

}

