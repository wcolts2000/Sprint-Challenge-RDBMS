const express = require('express');
const db = require('../data/dbConfig');


const router = express.Router();

// ADD A ACTION
router.post('/', (req, res) => {
  const { description, notes, project_id } = req.body;
  if(!description 
    || !notes 
    || !project_id
    ) {
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

// GET SINGLE ACTION
router.get('/:id', (req, res) => {
  db('actions')
  .where({ id: req.params.id})
  .then(action => {
    if(action.length) {
      res.status(200).json(action)
    } else { res.status(404).json({ message: "no action by that id found"})}
  })
  .catch(err => res.status(500).json({ messgae: " three was an error retrieving the data"}))
})

// Update Action
router.put('/:id', (req,res) => {
  db('actions')
  .where({ id: req.params.id})
  .then(count => {
    if(count) {
      res.status(200).json(count)
    } else {res.status(404).json({ message: "no action found by that id"})}
  })
  .catch( err => res.status(500).json({ message: "there was an error updating the action"}))
})

// Delete Action
router.delete('/:id', (req, res) => {
  db('actions')
  .where({ id: req.params.id})
  .then(count => {
    if(count) {
      res.status(200).json(count)
    } else {res.status(404).json({ message: "no action found by that id"})}
  })
  .catch(err => res.status(500).json({ message: "there was an error deleting"}))
})

module.exports = router;