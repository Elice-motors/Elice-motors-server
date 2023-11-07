
import { Router } from 'express';
import UserService from '../../services/user-service.js';
import { login_required } from "../../middlewares/auth/login-required.js";
import { validator_params } from '../../middlewares/validator/validator-params.js';


const userService = new UserService;
const router = Router();


/*
 * 모든 회원 정보 요청
 */
router.get("/",
    login_required, // 토큰 검증 미들웨어
    async (req, res, next) => {
        try {
            const result = await userService.getAllUsersInfo();
            if(result.message ==="SUCCESS") {
                res.status(200)
                   .json({
                        message: "전체 회원 정보 조회에 성공했습니다.",
                        users: result.users,
                    });
                return;
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



/*
 * 회원 정보 조회 요청 (token 검증 로직은 미들웨어로)
 */
router.get("/:shortId",
    validator_params, // 파라미터 밸리데이션 미들웨어
    login_required,  // 토큰 검증 미들웨어
    async (req, res, next) => {
        
        const { shortId } = req.params;

        try {
            const result = await userService.getUserInfo(shortId);
            if(result.message === "SUCCESS") {
                res.status(200)
                   .json({
                    message: "회원 정보 조회에 성공했습니다.",
                    user: result.user,
                })
                return;
            } else if (result.message ==="NO_MATCHES") {
                throw {status: 404, message: "존재하지 않는 계정입니다.",};
            } else {
                throw {status: 404, message: "unknown error",};
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


/*
 * 회원 정보 변경 요청 (token 검증 로직은 미들웨어로)
 */
router.put("/:shortId",
    validator_params, // 파라미터 밸리데이션 미들웨어
    login_required, // 토큰 검증 미들웨어
    async (req, res, next) => {
        
        const { shortId } = req.params;

        const {userName, age, phone, address} = req.body;

        try {
            const result = await userService.updateUserInfo(shortId,  {userName, age, phone, address} );
            if(result.message === "SUCCESS") {
                res.status(200)
                   .json({
                    message: "회원 정보 변경에 성공했습니다.",
                    user: result.user,
                })
                return;
            } else if (result.message ==="NO_MATCHES") {
                throw {status: 404, message: "존재하지 않는 계정입니다.",};
            } else {
                throw {status: 404, message: "unknown error",};
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


/*
 * 회원 정보 삭제 요청 (token 검증 로직은 미들웨어로)
 */
router.delete("/:shortId",
    validator_params, // 파라미터 밸리데이션 미들웨어
    login_required, // 토큰 검증 미들웨어
    async (req, res, next) => {
        const { shortId } = req.params;
        try {
            const result = await userService.deleteUserInfo(shortId);
            if(result.message === "SUCCESS") {
                res.status(204)
                   .json({
                    message: "회원 정보 삭제에 성공했습니다.",
                })
                return;
            } else if (result.message ==="NO_MATCHES") {
                throw {status: 404, message: "존재하지 않는 계정입니다.",};
            } else {
                throw {status: 404, message: "unknown error",};
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