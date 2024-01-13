import mongoose from 'mongoose';
const { Schema } = mongoose;
// import Option from './option-model.js';
// import Category from '../category/category-model.js';

const carSchema = new Schema(
	{
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
	},{
		timestamps: true, 
		// 게시글 정보가 새로 컬랙션에 추가될 때 createdAt과 updatedAt값을 추가
		// 이후 해당 document가 수정되면 updatedAt을 갱신
	}
);

const Car = mongoose.model('Cars', carSchema);
export { Car };
