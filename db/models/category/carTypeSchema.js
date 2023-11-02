const { Schema } = require('mongoose');

const carTypeSchema = new Schema({
  type:[
    {name: 'SUV/RV'},
    {name: 'Sedan'},
    {name: 'Electric'},
  ],
});

module.exports = carTypeSchema;