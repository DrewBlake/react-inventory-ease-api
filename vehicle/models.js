'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const VehicleSchema = mongoose.Schema({ 
  vehicleId: {type: String, default: ''},
  year: {type: Number, default: ''},
  make: {type: String, default: ''},
  model: {type: String, default: ''},
  mileage: {type: Number, default: ''},
  newVehicle: {type: Boolean, default: false},
  parkingSpace: {type: String, default: ''}    
});

VehicleSchema.methods.serialize = function() {
  return {
    id: this._id,
    vehicleId: this.vehicleId,
    year: this.year,
    make: this.make,
    model: this.model,
    mileage: this.mileage,
    isNew: this.isNew,
    parkingSpace: this.parkingSpace
  };
};

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = {Vehicle};