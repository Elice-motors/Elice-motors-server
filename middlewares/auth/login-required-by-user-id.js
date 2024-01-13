import jwt from "jsonwebtoken";
import { User } from '../../db/models/users/user-model.js';


async function login_required_by_user_id (req, res, next) {
   const { userId } = req.params || {};

   const userToken = req.headers["authorization"]?.split(" ")[1];

   if (!userToken) {
      res.status(400).json({ message: "토큰이 없습니다."});
      return;
   }

   try {
      const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
      const jwtDecoded = jwt.verify(userToken, secretKey);
      const currentUser = await User.findOne(
         {_id: userId},
         { _id: 1}
      );

      // ADMIN이 아니고 토큰의 id를 가진 사용자의 _id와 일치하지 않는 경우 
      // (role=USER이고, 본인 토큰이 아닌 경우)
      // 에러를 반환
      if ( jwtDecoded.role !== "ADMIN" && currentUser._id != jwtDecoded.user_id ) {
         res.status(400).json({ message : "권한이 없습니다."});
         return;
      }
      
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
  
  
export { login_required_by_user_id };