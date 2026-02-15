// StAuth10222: I Adoria Stevens, 000754661 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

const db = require('./db');

function getPartyMembers() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM partyMembers', (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function getPartyMembersByClass(charClass) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM partyMembers WHERE class = (?)', charClass, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function getPartyMemberById(id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM partyMembers WHERE id = (?)', id, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function addPartyMember(name, charClass, level, race, hitPoints) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO partyMembers (name, class, level, race, hit_points) VALUES (?, ?, ?, ?, ?)', 
            [name, charClass, level, race, hitPoints], 
            (err) => {
                if(err)
                    reject(err);
                else
                    resolve();
            }
        );
    });
}

function editPartyMember(id, name, charClass, level, race, hitPoints) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE partyMembers SET name = (?), class = (?), level = (?), race = (?), hit_points = (?) WHERE id = (?)', 
            [name, charClass, level, race, hitPoints, id], 
            (err) => {
                if(err)
                    reject(err);
                else
                    resolve();
            }
        );
    });
}

function updateHitPoints(id, hitPoints) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE partyMembers SET hit_points = (?) WHERE id = (?)', 
            [hitPoints, id], 
            (err) => {
                if(err)
                    reject(err);
                else
                    resolve();
            }
        );
    });
}

function deletePartyMember(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM partyMembers WHERE id = (?)', id, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

module.exports = {
    getPartyMembers,
    getPartyMemberById,
    getPartyMembersByClass,
    addPartyMember,
    editPartyMember,
    updateHitPoints,
    deletePartyMember
};