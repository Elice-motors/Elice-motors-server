const { Schema } = require('mongoose');

const ColorSchema = new Schema({
  color:[
    {name: 'white'},
    {name: 'gray'},
    {name: 'red'},
    {name: 'black'},
  ],
});

module.exports = ColorSchema;