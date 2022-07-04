const express = require('express');
const router = express.Router();

const db = require('../model/user');

// console.log(db.port)

router.post('/', function(req, res) {
  
})

router.post('/login', function (req, res) {
  const {email, password} = req.body;
  db.query("SELECT * FROM users WHERE email = ? AND password = ?",[email, password], (err,result) =>{
   if(err) {
    res.send({error:err});
   }

   if(result){
    res.send(result)
    res.json({success:true, message:'Success login'})

   }else {
    res.send({message:'wrong username and password'})
   }
  })
})

router.post('/register', function (req, res) {
  const {name, email, password} = req.body;
  db.query('INSERT INTO users SET ?', {name: name, email: email, password: password}, (err, result) => {
    if(err){
      console.log(err);
    }else {
      console.log(result)
      res.json({success: true, message: "user register"})
    }
  })

})


module.exports = router;