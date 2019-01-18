const express = require('express');
const db = require('../data/dbConfig');


const router = express.Router();

router.get('/', (req, res) => {
  db('projects')
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ message: "error getting data"}))
})

module.exports = router;