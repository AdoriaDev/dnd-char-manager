// StAuth10222: I Adoria Stevens, 000754661 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./partyMembers.db');

module.exports = db;