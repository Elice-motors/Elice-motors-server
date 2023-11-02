import mongoose from 'mongoose';
const carTypeSchema = require('./carTypeSchema');

const { Schema } = mongoose;

const categorySchema = new Schema({
    carId:{
        type: Number,
        required: true
    },
    carType: [carTypeSchema],
});

const Category = mongoose.model('Category', categorySchema);

export default Category;