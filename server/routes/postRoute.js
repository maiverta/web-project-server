const express = require('express');
const router = new express.Router();
const auth = require("../middleware/auth");
const post_controller = require ('../controllers/postController');


router.post('/', auth,post_controller.post_create);

router.get('/', post_controller.post_get);

router.get('/user/:userId', post_controller.post_getMyPosts)

router.get('/:id',post_controller.post_findById);

router.delete('/:id', post_controller.post_deleteOne);

router.put('/:id', auth, post_controller.post_update);

module.exports = router;