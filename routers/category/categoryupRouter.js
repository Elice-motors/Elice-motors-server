import CategoryService from "../../services/category-service.js";
import { validator_admin } from "../../middlewares/validator/validator-admin.js";
import {validator_categoryup} from "../../middlewares/validator/validator-categoryup.js";
import {Router} from 'express';
const router = Router();

const categoryService = new CategoryService;

router.post('/', validator_admin, validator_categoryup,
    async (req,res,next) => {
        try {
            const result = await categoryService.CategoryUp(req.body);
            if(result.message = "SUCCESS"){
                res.status(201).json({message:'카테고리 등록 성공', car: result.car});
            }else if(result.message === "DUPLICATED"){
                throw {status:400, message: "이미 등록된 상품아이디 입니다"};
            }
        } catch (err) {
            res.status(err.status).json({message:err.message});
        }
    });
export default router;