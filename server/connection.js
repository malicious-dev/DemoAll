const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cafenodejs'
})
connection.connect((err) => {
  if(err) {
    console.log(err);
  }else
  {console.log('Sql is ready...')}
})

module.exports = connection;
