var express = require('express');
var router = express.Router();


const studentsController=require('../contoller/studentsController')
/* GET home page. */
router.post('/',studentsController.studentsPost)
module.exports = router;
