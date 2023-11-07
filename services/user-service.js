import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { User } from '../db/models/users/user-model.js';

export default class UserService {

    async Signup({userName, email, password, role = "USER"}) {
        const user = {userName, email, password, role};

        try {
            const existUser = await User.findOne( {email: user.email} );
            if(existUser!==null) {
                return { message : "DUPLICATED"};
            } 
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            const newUser = await User.create(user);
            return { message : "SUCCESS", user: newUser};
        } catch(err) {
            return err;
        }
    }

    async Signin (user) {

        try {
            const existUser = await User.findOne( {email: user.email} );

            if(!existUser) {
                return { message : "NOT_EXIST_USER"};
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            const isPasswordValid = await bcrypt.compare(user.password, existUser.password);

            if(isPasswordValid) {
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
                    },
                    token: token,
                }
            } else {
                throw { message : "NOT_MATCHED" };
            }
            
        } catch(err) {
            return err;
        }
    }

    async Signout (userToken) {
        // 만료 시킨 토큰을 반환
        try {
            const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
            const jwtDecoded = jwt.verify(userToken, secretKey);
            const newExp = Math.floor(Date.now() / 1000) - 1;
            // return jwtDecoded;
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
            
        } catch(err) {
            return err;
        }
    }

    async getUserInfo (shortId) {

        try {
            const matchedUser = await User.findOne( 
                { shortId: shortId }, 
                { userName: 1, email: 1 ,age:1, phone: 1, address:1, } );
            // return matchedUser;
            if(matchedUser) {
                return { message: "SUCCESS", user: matchedUser};
            } else {
                throw { message: "NO_MATCHES", };
            }
            
        } catch(err) {
            return err;
        }
    }

    async updateUserInfo (shortId, data) {

        try {
            const matchedUser = await User.findOneAndUpdate( 
                { shortId: shortId }, 
                { userName: data.userName, age: data.age, phone: data.phone, address:data.address, },
                { new: true } );
            if(matchedUser) {
                return { message: "SUCCESS", user: matchedUser};
            } else {
                throw { message: "NO_MATCHES", };
            }
        } catch(err) {
            return err;
        }
    }

    async deleteUserInfo (shortId) {

        try {
            const deletedUser = await User.findOneAndDelete( 
                { shortId: shortId });
            //return deletedUser //조건에 맞지 않으면 null을 반환
            if(deletedUser) {
                return { message: "SUCCESS", };
            } else {
                throw { message: "NO_MATCHES", };
            }
        } catch(err) {
            return err;
        }
    }

    async getAllUsersInfo () {
        try {
            const allUsers = await User.find({}, 
                { userName: 1, email: 1 ,age:1, phone: 1, address:1, role:1, orderList:1, });
            if(allUsers) {
                return { message: "SUCCESS", users:allUsers };
            } else {
                throw { message: "NO_USERS", };
            }
        } catch(err) {
            return err;
        }
    }
}