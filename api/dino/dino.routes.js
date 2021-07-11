
const { Router } = require('express');
const router = Router();

const { dinoName, dinoImage } = require('./dino.controller');

router.get('/name', dinoName);
router.get('/image', dinoImage);

module.exports = router;