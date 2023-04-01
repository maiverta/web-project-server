const express = require('express');
const router = express.Router();
const tag_controller = require('../controllers/tagController');



//endpoint for creating tag
router.post('/', tag_controller.tag_create);

router.get('/', tag_controller.tag_getAll);

router.get('/:id', tag_controller.tag_getById);

router.delete('/:id', tag_controller.tag_delete);

router.put('/:id', tag_controller.tag_updateById);


module.exports = router;