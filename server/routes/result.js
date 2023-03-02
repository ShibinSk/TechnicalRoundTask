var express = require('express');
var router = express.Router();
const resultController=require('../contoller/resultContoller')
router.get('/',resultController.resultget)

router.get('/sum',resultController.sumget)

router.get('/rank',resultController.rangGet)

module.exports = router;
