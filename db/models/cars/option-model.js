import mongoose from 'mongoose';
const colorSchema = require('./schemas/colorSchema');
const optionTypeSchema = require('./schemas/optionTypeSchema');
const additionPriceSchema = require('./schemas/addtionPriceSchema');

const { Schema } = mongoose;

const optionSchema = new Schema({
    color:[colorSchema],
    optionType:[optionTypeSchema],
    additionPrice: [additionPriceSchema]
});

const Option = mongoose.model('Option', optionSchema);

export default Option;
