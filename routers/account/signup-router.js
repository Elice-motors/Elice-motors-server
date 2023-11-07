import UserService from '../../services/user-service.js';
import { validator_signup } from "../../middlewares/validator/validator-signup.js";
import { Router } from 'express';
const router = Router();

const userService = new UserService;

/*
 * 회원가입 요청
 */
router.post("/",
    validator_signup,
    async (req, res, next) => {
        
        //const { userName, email, password, role } = ;
        
        try {
            const result = await userService.Signup(req.body);
            if(result.message === "SUCCESS") {
                res.status(201)
                .json(
                    {
                        message: "회원가입에 성공했습니다.",
                        user: result.user,
                    });
                return;
            } else if(result.message === "DUPLICATED") {
                throw {status: 400, message: '이미 가입한 이메일입니다.'};
            } else {
                throw {status: 404, message: 'unknown error'};
            }
            
        } catch(err) {
            res.status(err.status)
            .json(
                {
                    message: err.message, 
                }
            )
        }
    }
);



export default router;