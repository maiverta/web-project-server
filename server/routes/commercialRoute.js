const express = require('express');
const router = express.Router();
const commercial_controller = require('../controllers/commercialController');


//endpoint for creating tag

router.get('/', commercial_controller.commercial_getAll);



module.exports = router;