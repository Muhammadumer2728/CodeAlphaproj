const router = require('express').Router();
const registrationController = require('../controllers/registrationController');

router.post('/register', registrationController.registerUserToEvent);
router.get('/event/:eventId', registrationController.getRegistrationsByEvent);
router.get('/user/:userId', registrationController.getRegistrationsByUser);
router.delete('/cancel/:id', registrationController.cancelRegistration);

module.exports = router;
