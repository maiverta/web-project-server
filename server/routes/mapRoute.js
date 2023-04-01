const express = require('express');
const router = express.Router();
const map_controller = require('../controllers/mapController');


//endpoint for creating tag
router.post('/', map_controller.map_create);

router.get('/', map_controller.map_getAll);

router.get('/:id', map_controller.map_getById);

router.delete('/:id', map_controller.map_delete);

router.put('/:id', map_controller.map_updateById);


module.exports = router;