const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./partyMembers.db');

module.exports = db;