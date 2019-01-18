const express = require('express');
const db = require('../data/dbConfig');


const router = express.Router();

// ADD A PROJECT
router.post('/', (req, res) => {
  const { name, description ,complete } = req.body;
  if(!name.length || !description.length || completed !== undefined) {
    res.status(400).json({ message: "must provide a name, a description, and if complete or not"})
  } else {

    db('projects')
    .insert(req.body)
    .then(ids => {
      db('projects')
        .where({ id: ids[0]})
        .then(project => {
          res.status(201).json(project)
        })
    })
    .catch(err => res.status(500).json({ message: "there was an error creating the project"}))
  };
})

// GET ALL PROJECTS
router.get('/', (req, res) => {
  db('projects')
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ message: "error getting data"}))
})


// GET SINGLE PROJECT AND DISPLAY INFO JOINED WITH ALL ITS CORRESPONDING ACTIONS
router.get('/:id', (req, res) => {
  db('projects')
    .where({ id: req.params.id})
    .then(project => {
      if(project.length) {
      //   console.log("PROJECT", project[0]);
        
        db('actions')
        
        // .where({project_id: req.params.id})
        // console.log("ACTIONS", actions);
        .where({project_id: req.params.id})
        // .select('projects.id', 'projects.name', 'projects.description', 'projects.complete', 'actions.*')
        // .join('actions', 'actions.project_id', 'projects.id')
        .then(action => {
          convertedAction = action.map(action => action = {id: action.id, description: action.description, notes: action.notes, complete: !!(action.complete)})
          
          res.status(200).json({id: project[0].id, name: project[0].name, description: project[0].description, completed: !!(project[0].complete), actions: convertedAction })

        })
        .catch(err => res.status(404).json({ message: "no actions found for that project"}))
      } else { res.status(404).json({ message: "no project found by that id"})}
    }
    )
    .catch(err => res.status(500).json({ message: "there was an error retrieving data"}))
})

module.exports = router;