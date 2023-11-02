import { Router } from 'express';
import { Category } from '../db/models/category/category-model'
import CarService from '../services/car-service';
const carService = new CarService;
const router = Router();

router.get('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    try {
        const category = await Category.findById(carId);
        if (!category) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(err.status);
        res.json({ message: err.message });
    }
});
router.post('/', async (req, res, next) => {
    const { carId, carType } = req.body;
    try {
        const result = await carService.addNewCar({ carId, carType });
        res.status(201).json({message:'category creating success',result});
    } catch (error) {
        console.error(error);
        res.status(err.status);
        res.json({ message: err.message });
    }
});

router.put('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    const { carType } = req.body; //id는 수정안함
    try {
        const carToUpdate = await Category.findOne({ _id: carId });
        if (!carToUpdate) {
            return res.status(404).json({ message: 'Category not found' });
        }
        carToUpdate.carType = carType;
        await carToUpdate.save();

        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(err.status);
        res.json({ message: err.message });
    }
});

router.delete('/:carId', async (req, res, next) => {
    const carId = req.params.carId;
    try {
        const category = await Category.findByIdAndDelete(carId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(err.status);
        res.json({ message: err.message });
    }
});


export default router;