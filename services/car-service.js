import { Car } from '../db/models/cars/cars-model.js';

export default class CarService {
    //상품 등록
    async CarUp({carName, carPrice, img,speed,mileage,fuel,carId,option,category, color}) {

        const car = {carName, carPrice, img,speed,mileage,fuel,carId,option,category, color};
        try{
            const existCar = await Car.findOne({carId: car.carId});
            if(existCar != null){
                return {message: "DUPLICATED"}; //carId중복
            }
            const newCar = await Car.create(car);
            return {message : "SUCCESS", car: newCar};
        }catch(err){
            return err;
        }
    }
    //전체 상품 조회
    async getAllCarsInfo() {
        try {
            const allCars = await Car.find({}, 
                { carName:1, carPrice:1, img:1, speed:1 ,mileage:1 ,fuel:1 ,carId:1 ,option:1, category:1, color:1});
            if(allCars) {
                return { message: "SUCCESS", car :allCars };
            } else {
                return { message: "NO_CARS", };
            }
        } catch(err) {
            return err;
        }
    }
    //상품 상세 조회
    async getCarInfo(carId){
        try{
            const matchCar = await Car.findOne(
                {carId:carId},
                {carName:1, carPrice:1, img:1, speed:1 ,mileage:1 ,fuel:1 ,carId:1 ,option:1, category:1, color:1});
            if(matchCar){
                return {message:"SUCCESS", car: matchCar};
            }else{ return {message: "NO_MATCHES"};}
        }catch(err){
            return err;
        }
    }
    //상품 수정
    async updateCarInfo(carId, data){
        try{
            const updateCar = await Car.findOneAndUpdate(
                {carId:carId},
                {carName: data.carName, carPrice:data.carPrice, img: data.img, speed: data.speed, mileage: data.mileage, fuel: data.fuel, option: data.option, category: data.category, color: data.color},
                {new: true});
            if(updateCar){
                return {message: "SUCCESS", car: updateCar};
            }else{
                return {message: "NO_MATCHES"};
            }
        }catch(err){
            return err;
        }
    }
    //상품 삭제
    async deleteCarInfo(carId){
        try{
            const deleteCar = await Car.findOneAndDelete({carId:carId});
            if(deleteCar){
                return {message: "SUCCESS"};
            }else{
                return {message: "NO_MATCHES"};
            }
        }catch(err){
            return err;
        }
    }
}
