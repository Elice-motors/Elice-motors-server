import { Router } from 'express';
import carOptions from '../../db/models/cars/car-option-model.js';
const router = Router();

//상품 옵션 조회
router.get('/', (req, res, next) => {
    res.json({options: carOptions});
});

export default router;