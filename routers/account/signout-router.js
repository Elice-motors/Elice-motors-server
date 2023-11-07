import UserService from '../../services/user-service.js';
import { Router } from 'express';
const router = Router();

const userService = new UserService;

/*
 * 로그 아웃 라우터
 */
router.post("/", async (req, res, next) => {
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
    try {
        const result = await userService.Signout(userToken);
        if(result.message == "SUCCESS") {
            res.setHeader('Authorization', `Bearer ${result.token}`);
            res.status(204).send();
        } else {
            throw {status: 404, message: 'unknown error'};
        }
    } catch(err) {
        res.status(err.status)
            .json({
                    message: err.message, 
                });
    }
});

export default router;