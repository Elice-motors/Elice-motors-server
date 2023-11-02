import { Router } from 'express';
import { Car } from '../db/models/cars/cars-model';
import CarService from '../services/car-service';
const carService = new CarService;
const router = Router();

router.get('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    try {
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving car' });
    }
});

router.post('/', async (req, res, next) => {
    const { carName, carPrice, img, speed, mileage, option, category } = req.body;
    try {
        const result = await carService.addNewCar({ carName, carPrice, img, speed, mileage, option, category });
        res.status(201).json({message:'상품 등록 성공', result});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating car' });
    }
});


router.put('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    const { carName, carPrice, img, speed, mileage, option, category } = req.body;
    try {
        const carToUpdate = await Car.findOne({ _id: carId });
        if (!carToUpdate) {
            return res.status(404).json({ message: 'Car not found' });
        }
        carToUpdate.carName = carName;
        carToUpdate.carPrice = carPrice;
        carToUpdate.img = img;
        carToUpdate.speed = speed;
        carToUpdate.mileage = mileage;
        carToUpdate.option = option;
        carToUpdate.category = category;
        await carToUpdate.save();

        res.status(200).json({ message: 'Car updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating car' });
    }
});

router.delete('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    try {
        const car = await Car.findByIdAndDelete(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting car' });
    }
});


export default router;