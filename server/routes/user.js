const express = require('express')
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.get('/', (req, res) => {
  res.send('hello world')
})

router.post('/signup', (req, res) => {
  let user = req.body;
  query = 'select email,password,role,status from user where email=?'
connection.query(query,[user.email], (err, results) => {
if(!err){
if(results.length <= 0){
  query= "insert into user(name, contactNumber, email,password,status,role) values(?,?,?,?,'false','user')"
  connection.query(query,[user.name, user.contactNumber, user.email, user.password], (err, results) =>{
    if(!err) {
      return res.status(200).json({message: "Successfully Registered"})
    }
    else{
      return res.status(500).json({message: "Something Went Wrong. Try AGain!."})
    }
  })
}else{
  return res.status(400).json({message: 'Email Already Exist!.'})
}
}else{
  return res.status(500).json(err);
}
})
})

router.post('/login', (req, res) => {
  const  user = req.body;
  query = "select email, password, role, status from user where email =?"
  connection.query(query, [user.email], (err, results) => {
    if(!err) {
if(results.length <= 0 || results[0].password != user.password) {
  return res.status(401).json({message: 'Incorrect Username or Password'});
}
else if (results[0].status === 'false') {
  return res.status(401).json({message: 'wait for Admin Approval to Approve'});
}
else if (results[0].password === user.password) {
  const response = {email: results[0].email, role: results[0].role}
  const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn: '8h'})
  res.status(200).json({token: accessToken})
}
    }else{
      return res.status(400).json({message: "Something Wrong. Try AGain!."})
    }
  })
})


var transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

router.post('/forgetPassword', (req, res) => {
  const user = req.body;
  query = "select email,password from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if(!err) {
      if(results.length <= 0){
return res.status(200).json({message: "password sent successfully to your email."});
      }else {
        var mailOptions = {
          from: process.env.EMAIL,
          to: results[0].email,
          subject: 'Password by Cafe Management System',
          html: '<p><b>Your Login details for cafe Management System</b><br><b>Email: </b>'+results[0].email+'<br><b>Password: </b>'+results[0].password+'<br><a href="http://localhost:4200/">Click Here to Login</a></p>'
        };

        console.log(results[0].email)
        transporter.sendMail(mailOptions, function(err, info){
          if(err){
            console.log(err);
          }else {
            console.log('Email sent: '+info.response);
          }
        });
return res.status(200).json({message: "password sent successfully to your email."});

      }
    }else {
      return res.status(500).json(err);

    }
  })
})


router.get('/get', (req, res) => {
  var query = "select id,name,email, contactNumber, status from user where role='user'";
  connection.query(query, (err,results) => {
    if(!err) {
      return res.status(200).json(results);
    }
    else {
      return res.status(500).json(err);
    }
  })
})


router.patch('/update', (req, res) => {
  let user = req.body;
  var query = "update user set status = ? where id =?";
  connection.query(query, [user.status,user.id], (err, results) => {
    if(!err) {
if(results.affectedRows == 0){
  return res.status(404).json({message: "User id does not exist"})
}
return res.status(200).json({message: "User updated successfully"});
    }else {
      return res.status(500).json(err);
    }
  })
})

module.exports = router;
