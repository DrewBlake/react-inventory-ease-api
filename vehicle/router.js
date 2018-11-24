'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Vehicle} = require('./models');
const passport = require('passport');
const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use(express.json());

// Create new vehicle
router.post('/', (req,vres) => {
	let {vehicleId, year, make, model, mileage, parkingSpace} = req.body;
	return Vehicle.create({
        vehicleId,
        year,
        make,
        model,
        mileage,
        parkingSpace
      })
	  .then(vehicle => {
      	return res.status(201).json(vehicle.serialize());
      })
      .catch(() => {
      	res.status(500).json({code: 500, message: 'Internal server error'});
      });
});

// Returns all vehicles in database
router.get('/', (req, res) => {
  return Vehicle.find()
    .then(vehicles => res.json(vehicles.map(vehicle => vehicle.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

// Find specific vehicle by id
router.get('/:id', (req, res) => {
  return Vehicle.findById(req.params.id)
    .then(vehicle => res.json(vehicle.serialize()))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

// Delete vehicle by id
router.delete('/:id', (req, res) => {
  return Vehicle.findByIdAndRemove(req.params.id)
  .then(() => {
      res.status(204).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});


module.exports = {router};