const mysql = require('mysql');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node-sql'
})
db.connect((err) => {
  if(err) {
    console.log(err);
  }else 
  {console.log('Sql is ready...')}
})

module.exports = db;