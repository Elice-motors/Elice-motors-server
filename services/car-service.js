import { Car } from '../db/models/cars/cars-model.js';

export default class CarService {
    //상품 등록
    async CarUp({carName, carPrice, speed,mileage,fuel,carId,option,category, color, img}) { //}, filename) {
        //const carCounts = await Car.find({});
        const result = await Car.find({}).sort({ carId: -1 }).limit(1);
        const lastCarId = result[0].carId;

        const car = {carName, carPrice, img, speed, mileage, fuel, carId:lastCarId+1, option, category, color};
        const existCar = await Car.findOne({carId: car.carId});
        if(existCar != null){
            // throw {message: "DUPLICATED"}; //carId중복
            throw {status: 400, message: "이미 등록된 상품아이디 입니다"};
        }
        const newCar = await Car.create(car);
            return {message : "SUCCESS", car: newCar};
    }
    //전체 상품 조회
    async getAllCarsInfo() {
            const allCars = await Car.find({}, 
                { carName:1, carPrice:1, img:1, speed:1 ,mileage:1 ,fuel:1 ,carId:1 ,option:1, category:1, color:1});
            if(allCars) {
                return { message: "SUCCESS", car :allCars };
            } else {
                //throw { message: "NO_CARS", };
                throw {status: 404, message: "상품이 존재하지 않습니다."};
            }
    }
    // 등록 상품 조회 (가장 최근 or 가장 이전)
    async getRecentCarInfo(option = "latest") {

        const order = (option === "latest") ? -1:1;
        const result = await Car.find({}).sort({ createdAt: order }).limit(1);
        const carItem = result[0];
        
        if(result.length > 0) {
            return { message: "SUCCESS", car :carItem };
        } else {
            //throw { message: "NO_CARS", };
            throw {status: 404, message: "상품이 존재하지 않습니다."};
        }
    }
    //상품 상세 조회
    async getCarInfo(carId){
        const matchCar = await Car.findOne(
            {carId:carId},
            {carName:1, carPrice:1, img:1, speed:1 ,mileage:1 ,fuel:1 ,carId:1 ,option:1, category:1, color:1});
        if(matchCar){
            return {message:"SUCCESS", car: matchCar};
        }else{ 
            // throw {message: "NO_MATCHES"};
            throw {status:404, message: "존재하지 않는 상품입니다"};
        }
    }
    //상품 수정
    async updateCarInfo(carId, data){
            const updateCar = await Car.findOneAndUpdate(
                {carId:carId},
                {carName: data.carName, carPrice:data.carPrice, img: data.img, speed: data.speed, mileage: data.mileage, fuel: data.fuel, option: data.option, category: data.category, color: data.color},
                {new: true});
            if(updateCar){
                return {message: "SUCCESS", car: updateCar};
            }else{
                //throw {message: "NO_MATCHES"};
                throw {status: 404, message: "존재하지 않는 상품입니다"};
            }
    }
    //상품 삭제
    async deleteCarInfo(carId){
        const deleteCar = await Car.findOneAndDelete({carId:carId});
        if(deleteCar){
            return {message: "SUCCESS"};
        }else{
            //throw {message: "NO_MATCHES"};
            throw {status: 404, message: "존재하지 않는 상품입니다"};
        }
    }
}
