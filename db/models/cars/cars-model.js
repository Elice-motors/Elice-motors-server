import mongoose from 'mongoose';
const { Schema } = mongoose;
// import Option from './option-model.js';
// import Category from '../category/category-model.js';

const carSchema = new Schema({
	carName: { 
		type: String,
		required: true, 
	},
	carPrice: {
		type: Number,
		required: true,
	},
	img: { 
		type: String, // image link url을 담은 문자열
		required: true 
	},
	speed: {
		type: Number,
        required: true
	},
	mileage: {
		type: Number,
        required: true
	},
	fuel:{
		type: Number,
		required: true
	},
	carId: {
        type: Number,
        required: true
    },
    option: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
	color: {
		type: String,
		default: "white"
	}
});

const Car = mongoose.model('Cars', carSchema);
export { Car };
