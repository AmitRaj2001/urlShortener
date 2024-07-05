const express = require('express');

const { handleGenerateNewShortURL, handleGetAnalytics , handleGetUrlByID} = require('../controllers/url');

const router = express.Router();


router.post('/', handleGenerateNewShortURL);

router.get('/:amit',handleGetUrlByID);

router.get('/analytics/:shortId' , handleGetAnalytics)

module.exports = router;