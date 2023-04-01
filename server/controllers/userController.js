// const express = require('express');
const User = require('../models/userModel');
// const Tag = require("../models/tagModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require("../config");
const Tag = require("../models/tagModel");

exports.user_findByUserName = function (req, res) {
    res.send(User.findOne({username: req.body.username}).exec())
}

exports.user_create = async function (req, res) {
    const firstName = req.body.firstName || '';
    const lastName = req.body.lastName || '';
    const gender = req.body.gender || '';
    const username = req.body.username || '';
    const password = req.body.password || '';

    const requestBody = {firstName, lastName, username, gender, password};

    let errors = {};

    //makes sure fields are not empty
    Object.keys(requestBody).forEach(async field => {
        if (requestBody[field] == '') {
            errors = {...errors, [field]: 'Field cannot be empty'}
        }
    });

    //checks if user already exists
    const exists = await userExists(requestBody.username);
    if (exists) {
        errors = {...errors, username: "Username already exists"}
    }

    //if errors are empty, creates user
    if (Object.keys(errors).length > 0) {
        res.json({errors});
    } else {
        //creates user object
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            username: username,
            password: password
        });

        //creating user and puts it in the database with an encrypted password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return err;

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return err;

                user.password = hash;
                user.save((err) => {
                    if (err) return err;
                    res.json({success: 'success'});
                })
            });
        })
    }
}

exports.user_login = function (req, res) {
    const username = req.body.username || '';
    const password = req.body.password || '';

    //checks if fields are empty
    let errors = {};
    if (username === '') {
        errors = {...errors, username: 'This field is required'};
    }
    if (password === '') {
        errors = {...errors, password: 'This field is required'};
    }

    //checks if there are no errors
    if (Object.keys(errors) > 0) {
        res.json({errors});
    } else {
        //tries to find the user requesting to login in the database
        User.findOne({username: username}, (err, user) => {
            if (err) throw err;

            if (user) {
                //user found, checks if password is matching when encrypted
                bcrypt.compare(password, user.password, (err, passwordsMatching) => {
                    if (err) return err;

                    if (passwordsMatching) {
                        //passwords matching, create json web token to give the client
                        const token = jwt.sign({
                            id: user._id,
                            username: user.username
                        }, config.jwtSecret);
                        res.json({token, success: 'success', user});
                    } else {
                        //password did not match
                        res.json({errors: {badLogin: 'Wrong username or password'}});
                    }
                });
            } else {
                //username does not exist
                res.json({errors: {badLogin: 'Wrong username or password'}});
            }
        })
    }


}

exports.user_update = function (req, res) {
    let requestBody = req.body

    if (requestBody.newPassword){
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return err;
            bcrypt.hash(requestBody.newPassword, salt, (err, hash) => {
                if (err) return err;
                requestBody.password = hash;
                updateUser(req, res, req.params.username, requestBody)
            });
        })
    } else {
        delete requestBody.password
        updateUser(req, res, req.params.username, requestBody)
    }
}

exports.user_getByUsername = async function (req, res) {

    const user = await getUsername(req.params.username)

    if (user != null) {
        res.send(
            {
                "id": user._id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "gender": user.gender
            }
        )
    } else {
        res.send("No user found")
    }
}

exports.user_getUsers = async function (req, res) {

    console.log("getting all tags...")
    const allDocs = await User.find()

    if (Object.keys(allDocs).length > 0) {
        res.send(allDocs)
    } else {
        res.status(204).json({})
    }
}

exports.user_delete = async function (req, res) {

    User.deleteOne({username: req.params.username}, (err) => {
        if (err) {
            res.status(400).send("Unable to delete user")
        } else {
            res.json({success: true});
        }
    })
}

const userExists = (username) => {
    return {error, exists} = getUsername(username)
        .then(user => {
            if (user) {
                return true;
            }
            return false;
        })
        .catch(err => console.log(err));
}

const getUsername = (username) => {
    return User.findOne({username: username}).exec()
}

const updateUser = (req,res,username, userUpdate) => {
    User.updateOne({username: username},{$set: userUpdate}, {}, (err, r) => {
        if (err) {
            res.json({error: err.message})
        } else {
            res.json({success: true});
        }
    })
}





