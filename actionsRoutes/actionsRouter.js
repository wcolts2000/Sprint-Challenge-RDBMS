const express = require('express');
const db = require('../data/dbConfig');


const router = express.Router();

// ADD A ACTION
router.post('/', (req, res) => {
  const { description, notes, complete, project_id } = req.body;
  if(!description.length || !notes.length || complete || !project_id) {
    res.status(400).json({ message: "must provide a description, notes, and if complete or not, and a corresponding project id"})
  } else {

    db('actions')
    .insert(req.body)
    .then(ids => {
      db('actions')
        .where({ id: ids[0]})
        .then(action => {
          res.status(201).json(action)
        })
    })
    .catch(err => res.status(500).json({ message: "there was an error creating the action"}))
  };
})

// GET ACTIONS
router.get('/', (req, res) => {
  db('actions')
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({ message: "error getting data"}))
})

module.exports = router;