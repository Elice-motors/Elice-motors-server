import { Router } from 'express';
import CarService from '../../services/car-service.js';
const carService = new CarService;
const router = Router();
//에러처리는 일단 router, service 다 수정해보고 next(err)로 바꿔보기..

//상품 전체 조회
router.get('/', async(req,res,next)=>{
    try{
        const result = await carService.getAllCarsInfo();
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 전체 조회 성공",car: result.car});
            return;
        }else{
            throw {status: 404, message: 'unknown error'};
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
})
//상품 상세 조회
router.get('/:carId', async (req, res, next) => {
    const {carId} = req.params;
    try{
        const result = await carService.getCarInfo(parseInt(carId));
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 정보 조회에 성공했습니다", car: result.car});
            return;
        }else if(result.message === "NO_MATCHES"){
            throw {status:404, message: "존재하지 않는 상품입니다"};
        }else{
            throw {status:404, message: "unknown error"};
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});


router.put('/:carId', async (req, res, next) => {
    const {carId} = req.params;
    const {carName, carPrice, img,speed,mileage,fuel,option,category, color} = req.body;
    try{
        const result = await carService.updateCarInfo(parseInt(carId), {carName, carPrice, img,speed,mileage,fuel,option,category, color});
        if(result.message === "SUCCESS"){
            res.status(200).json({message:"상품 수정에 성공했습니다", car: result.car});
            return;
        }else if(result.message === "NO_MATCHES"){
            throw {status: 404, message: "존재하지 않는 상품입니다"};
        }else{
            throw {status: 404, message: "unknown error"};
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});

router.delete('/:carId', async (req, res, next) => {
    const {carId} =req.params;
    try {
        const result = await carService.deleteCarInfo(parseInt(carId));
        if(result.message === "SUCCESS"){
            res.status(200).json({message: "상품 정보 삭제에 성공했습니다", car: result.car});
            return;
        }else if(result.message === "NO_MATCHES"){
            throw {status: 404, message: "존재하지 않는 상품입니다"};
        }else{
            throw {status: 404, message: "unknown eror"}
        }
    }catch (err) {
        res.status(err.status).json({message:err.message});
    }
});


export default router;