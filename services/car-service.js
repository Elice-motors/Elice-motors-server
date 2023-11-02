import { Car } from '../db/models/cars/cars-model.js';

export default class CarService {
    async CarUp({carName, carPrice, img,speed,mileage,carId,option,category}) {
        const car = await Car.create({carName, carPrice, img,speed,mileage,carId,option,category});
        return car;
    }
}
