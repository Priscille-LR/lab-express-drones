const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model')

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then(dronesFromDB => {
      console.log(dronesFromDB)
      res.render('drones/list', { drones: dronesFromDB })
    })
    .catch((err) => console.log('Error while getting the drones from the DB', err))

});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form')

});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body

  Drone.create({ name, propellers, maxSpeed })
    .then(() => res.redirect('/drones'))
    .catch((err) => console.log('Error while creating a new drone', err))

});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params
  Drone.findById(id)
    .then((droneToEdit) => {
      // console.log(droneToEdit)
      res.render('drones/update-form', { drone: droneToEdit })
    })
    .catch((err) => console.log('Error while getting the drone to edit', err))

});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params
  const { name, propellers, maxSpeed } = req.body
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed }, { new: true })
    .then((updatedDrone) => {
      // console.log(updatedDrone)
      res.redirect('/drones')
    })
    .catch((err) => console.log('Error while updating the drone', err))
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params
  Drone.findByIdAndDelete(id)
    .then(() => res.redirect('/drones'))
    .catch((err) => console.log('Error while deleting the drone', err))
});

module.exports = router;
