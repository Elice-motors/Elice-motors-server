import express from "express";
const mainRouter = express.Router();

import carRouter from "./cars/carRouter.js";
import optionRouter from "./cars/optionRouter.js";
import userRouter from "./account/user-router.js";
import signupRouter from "./account/signup-router.js";
import signinRouter from "./account/signin-router.js";
import signoutRouter from "./account/signout-router.js";
import carupRouter from "./cars/carup-router.js";
import categoryRouter from "./category/categoryRouter.js";
import categoryupRouter from "./category/categoryupRouter.js";

//결제 라우터
import paymentRouter from "./payment/payment-router.js";
//구매내역 라우터
import orderRouter from "./orders/orders-router.js";
//구매 취소 라우터
import orderDeleteRouter from "./orders/orders-delete-router.js";

/* user router */
mainRouter.use("/users", userRouter);

/* auth router */
mainRouter.use("/signup", signupRouter);
mainRouter.use("/signin", signinRouter);
mainRouter.use("/signout", signoutRouter);

//결제 응답 라우터
mainRouter.use("/payment", paymentRouter);
//주문 내역 조회 라우터
mainRouter.use("/orders", orderRouter);
//주문 취소 라우터
mainRouter.use("/orders/delete", orderDeleteRouter);

mainRouter.use("/cars", carRouter);

mainRouter.use("/category", categoryRouter);

mainRouter.use("/car-options", optionRouter);

//상품 등록 라우터
mainRouter.use("/carup", carupRouter);
//카테고리 등록 라우터
mainRouter.use("/categoryup", categoryupRouter);

export default mainRouter;
