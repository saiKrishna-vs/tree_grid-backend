const express = require('express');
const router = express.Router();
const partyController = require('../controllers/partyController');

router.get('/getGenderList', partyController.getGenderList);
router.get('/findCountOfGender/:gender', partyController.findCountOfGender);
router.get('/getClientsForAge', partyController.getClientsForAge);

module.exports = router;
