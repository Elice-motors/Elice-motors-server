import CarService from "../../services/car-service.js";
import {validator_carup} from "../../middlewares/validator/validator-carup.js";
import {Router} from 'express';
const router = Router();

const carService = new CarService;

router.post('/',validator_carup,
    async (req,res,next) => {
        try {
            const result = await carService.CarUp(req.body);
            if(result.message = "SUCCESS"){
                res.status(201).json({message:'상품 등록 성공', car: result.car});
            }else if(result.message === "DUPLICATED"){
                throw {status:400, message: "이미 등록된 상품아이디 입니다"};
            }else{
                throw {status:404, message: "unknown error"};
            }
        } catch (err) {
            res.status(err.status).json({message:err.message});
        }
    });
export default router;