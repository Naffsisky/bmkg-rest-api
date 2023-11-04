const router = require('express').Router();
const controller = require('../controllers/list-low-quake');

router.get('/', controller.get);

module.exports = router;
