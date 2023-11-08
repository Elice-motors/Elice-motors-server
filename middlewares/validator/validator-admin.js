import { User } from '../../db/models/users/user-model.js';

async function validator_admin (req, res, next) {

   const userToken = req.headers["authorization"]?.split(" ")[1];

   if (!userToken) {
      res.status(400).json({ message: "토큰이 없습니다."});
      return;
   }
   try {
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);

        // 토큰의 id를 가진 사용자의 shortId와 
        // 일치하는 사용자의 역할이 ADMIN이 아닌 경우 에러를 반환
        // if( jwtDecoded.role !== "ADMIN") {
        //     res.status(401).json({ message : "관리자 계정이 아닙니다."});
        //     return;
        // }
        
        next();
         
   } catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(400).json({ message: "토큰이 만료되었습니다." });
        } else {
            res.status(400).json({ message: "정상적인 토큰이 아닙니다." });
        }
        return;
   }
}

export { validator_admin };