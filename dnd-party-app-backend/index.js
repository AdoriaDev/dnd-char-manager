// StAuth10222: I Adoria Stevens, 000754661 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

var express = require('express');
const cors = require('cors');
var bodyParser = require("body-parser");
const partyMembers = require('./partyMembers');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET ALL + optional filter
app.get("/members", async function(req, res) {
    const filter = req.query.filter;
    
    if (filter) {
        const filtered = await partyMembers.getPartyMembersByClass(filter);
        res.send(filtered);
    } else {
        const allMembers = await partyMembers.getPartyMembers();
        res.send(allMembers);
    }
});

// GET by ID
app.get("/members/:id", async function(req, res) {
    const partyMember = await partyMembers.getPartyMemberById(req.params.id);
    res.send(partyMember);
});

// POST - create new member
app.post("/members", async function(req, res) {
    const { name, class: charClass, level, race, hitPoints } = req.body;
    await partyMembers.addPartyMember(name, charClass, level, race, hitPoints);
    res.send({"message": "Success"});
});

// PUT - update member (can be partial update for HP only)
app.put("/members/:id", async function(req, res) {
    const id = req.params.id;
    const hitPoints = req.body.hit_points;
    
    await partyMembers.updateHitPoints(id, hitPoints);
    console.log("Updating member with hitpoints: " + hitPoints);
    res.send({"message": "Success"});
});

// DELETE
app.delete("/members/:id", async function(req, res) {
    await partyMembers.deletePartyMember(req.params.id);
    res.send({"message": "Success"});
});

app.listen(process.env.PORT || 4000, function(req,res){
    console.log("Server Started on port 4000!");
});