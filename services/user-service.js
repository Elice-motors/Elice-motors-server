import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { User } from '../db/models/users/user-model.js';

export default class UserService {

    async Signup({userName, email, password, role = "USER"}) {
        const user = {userName, email, password, role};

        const existUser = await User.findOne( {email: user.email} );
        if(existUser !== null) {
            // throw { message : "DUPLICATED"};
            throw {status: 400, message: '이미 가입한 이메일입니다.'};
        } 
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        
        user.password = hash;
        const newUser = await User.create(user);
        return { message : "SUCCESS", user: newUser};
    }

    async Signin (user) {

        const existUser = await User.findOne( {email: user.email} );

        if(!existUser) {
            // throw { message : "NOT_EXIST_USER"};
            throw {status: 400, message: '이메일 또는 비밀번호를 확인해주세요.'};
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        const isPasswordValid = await bcrypt.compare(user.password, existUser.password);

        if(!isPasswordValid) {
            //throw { message : "NOT_MATCHED" };
            throw {status: 400, message: '비밀번호가 일치하지 않습니다.'};
        }
        
        const expirationTime = Math.floor(Date.now() / 1000) + 60*60*24; // 현재시간 + @, e.g. 60*60 = 1시간 후 만료
        const payload = {
            user_id: existUser.id,
            role: existUser.role,
            exp: expirationTime,
        }
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const token = jwt.sign(payload, secretKey);
        // jwt.sign 시 첫번째 인자에 exp 키로 만료 시간을 설정할 수 있다.

        return { 
            message : "SUCCESS", 
            user: {
                email: existUser.email,
                shortId : existUser.shortId,
                userId : existUser._id,
                role: existUser.role,
            },
            token: token,
        }
    }

    async Signout (userToken) {
        // 만료 시킨 토큰을 반환
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const newExp = Math.floor(Date.now() / 1000) - 1;
        
        const payload = {
            user_id: jwtDecoded.user_id,
            role: jwtDecoded.role,
            exp: newExp,
        }

        const expiredToken = jwt.sign(payload, secretKey);

        return { 
            message : "SUCCESS", 
            token: expiredToken,
        }
    }

    async getUserInfo (shortId) {

        const matchedUser = await User.findOne( 
            { shortId: shortId }, 
            { userName: 1, email: 1 ,age:1, phone: 1, address:1, } );
        
        if(!matchedUser) {
            // throw { message: "NO_MATCHES", };
            throw {status: 404, message: "존재하지 않는 계정입니다.",};
        }
        
        return { message: "SUCCESS", user: matchedUser};
    }

    async updateUserInfo (shortId, data) {

        const matchedUser = await User.findOneAndUpdate( 
            { shortId: shortId }, 
            { userName: data.userName, age: data.age, phone: data.phone, address:data.address, },
            { new: true } );
        
        if(!matchedUser) {
            //throw { message: "NO_MATCHES", };
            throw {status: 404, message: "존재하지 않는 계정입니다.",};
        }
        
        return { message: "SUCCESS", user: matchedUser};
    }

    async deleteUserInfo (shortId) {

        const deletedUser = await User.findOneAndDelete( 
            { shortId: shortId });
        //return deletedUser //조건에 맞지 않으면 null을 반환
        
        if(!deletedUser) {
            // throw { message: "NO_MATCHES", };
            throw {status: 404, message: "존재하지 않는 계정입니다.",};
        }
        return { message: "SUCCESS", };
    }

    async getAllUsersInfo () {
        
        const allUsers = await User.find({}, 
            { userName: 1, email: 1 ,age:1, phone: 1, address:1, role:1, orderList:1, shortId:1 });
        
        return { message: "SUCCESS", users:allUsers };
    }
}