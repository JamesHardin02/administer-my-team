const mysql = require('mysql2');
// alllows for queries to SQL database via JS code
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'company_db'
});

module.exports = db;