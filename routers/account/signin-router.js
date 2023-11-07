import UserService from '../../services/user-service.js';
import { validator_signin } from "../../middlewares/validator/validator-signin.js";
import { Router } from 'express';
const router = Router();

const userService = new UserService;



/*
 * 로그인 요청 (token 발급 로직 포함)
 */
router.post("/", 
    validator_signin,
    async (req, res, next) => {
    
        try {
            const result = await userService.Signin(req.body);

            if(result.message === "SUCCESS") {
                res.setHeader('Authorization', `Bearer ${result.token}`);
                res.status(200)
                .json({
                    message: "로그인에 성공했습니다.",
                    user: result.user,
                });
                return;        
            } else if(result.message === "NOT_EXIST_USER") {
                throw {status: 400, message: '이메일 또는 비밀번호를 확인해주세요.'};
            }  else if(result.message === "NOT_MATCHED") {
                throw {status: 400, message: '비밀번호가 일치하지 않습니다.'};
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