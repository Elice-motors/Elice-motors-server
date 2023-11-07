import mongoose from 'mongoose';
// import carTypeSchema from './carTypeSchema.js';

const { Schema } = mongoose;

const categorySchema = new Schema({
    carId:{
        type: Number,
        required: true
    },
    carType: {
        type: String,
        default: "SUV/RV"
    } // variation "SUV/RV", "Sedan" , "Electric"
});

const Category = mongoose.model('Category', categorySchema);

export default Category;