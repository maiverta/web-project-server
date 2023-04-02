const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/commentController');


//endpoint for creating tag

router.post('/', comment_controller.comment_create);
router.delete('/:id', comment_controller.comment_delete);
router.get('/post/:postId', comment_controller.comment_getAllByPost);
router.get('/:id', comment_controller.comment_getById);
router.put('/:id', comment_controller.comment_updateById);





module.exports = router;