const router = require('express').Router();
const eventController = require('../controllers/eventController');

router.post('/create', eventController.createEvent);
router.get('/all', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);

module.exports = router;
