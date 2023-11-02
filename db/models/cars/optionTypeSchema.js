const { Schema } = require('mongoose');

const optionTypeSchema = new Schema({
  color:[
    {name: 'light'},
    {name: 'sgniture'},
    {name: 'special'},
  ],
});

module.exports = optionTypeSchema;