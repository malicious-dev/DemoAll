const express = require('express');
const router = express.Router();

const db = require('../model/crud');

// console.log(db.port)

router.get('/', function(req, res) {
res.send('hello world')
})



module.exports = router;
