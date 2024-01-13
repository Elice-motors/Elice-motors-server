import { Router } from 'express';
import CarService from '../../services/car-service.js';
import { validator_admin } from "../../middlewares/validator/validator-admin.js";
const carService = new CarService;
const router = Router();
//에러처리는 일단 router, service 다 수정해보고 next(err)로 바꿔보기..

//상품 전체 조회 & 최근 상품 조회
router.get('/', async(req,res,next)=>{
    const {register} =  req.query;

    try{
        let result = {};

        if(register === "latest") {
            result = await carService.getRecentCarInfo();
        } else {
            result = await carService.getAllCarsInfo();
        }
        
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 전체 조회 성공",car: result.car});
            return;
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});


//상품 상세 조회
router.get('/:carId', async (req, res, next) => {
    const {carId} = req.params;
    try{
        const result = await carService.getCarInfo(parseInt(carId));
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 정보 조회에 성공했습니다", car: result.car});
            return;
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});

// 상품 정보 변경
router.put('/:carId', validator_admin, async (req, res, next) => {
    const {carId} = req.params;
    const {carName, carPrice, img,speed,mileage,fuel,option,category, color} = req.body;
    try{
        const result = await carService.updateCarInfo(parseInt(carId), {carName, carPrice, img,speed,mileage,fuel,option,category, color});
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 수정에 성공했습니다", car: result.car});
            return;
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});

// 상품 정보 삭제
router.delete('/:carId', validator_admin, async (req, res, next) => {
    const {carId} =req.params;
    try {
        const result = await carService.deleteCarInfo(parseInt(carId));
        if(result.message === "SUCCESS"){
            res.status(204).json({message: "상품 정보 삭제에 성공했습니다", car: result.car});
            return;
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});


export default router;
