const users = require('./routes/usersRoute');
const posts = require('./routes/postRoute');
const tags = require('./routes/tagRoute');
const maps = require('./routes/mapRoute');
const commercials = require('./routes/commercialRoute');

const statistics = require('./routes/statisticsRoute');
const express = require('express');
router = express.Router();

router.use('/api/users', users);

//sets the posts path
router.use('/api/posts', posts);


router.use('/api/tags', tags);

router.use('/api/commercials', commercials);

router.use('/api/maps', maps);

router.use('/healthz', async (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
    };
    console.log("health check")
    res.send(healthcheck);
})


router.use('/api/stats',statistics );

module.exports = router;