const express = require('express');
const router = new express.Router();
const statistics_controller = require ('../controllers/statisticsController');

router.get('/authors', statistics_controller.get_postsByAuthor);

router.get('/tags', statistics_controller.get_tagsByPost);

router.get('/suggestedPost', statistics_controller.get_suggestedPost);

module.exports = router;