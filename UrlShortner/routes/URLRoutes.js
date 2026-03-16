const router = require('express').Router();
const URLController = require('../Controllers/URLController');

router.post('/shorten',URLController.shortenUrl);
router.get('/:code',URLController.redircetToOriginal);

module.exports = router;