import express from "express";
import {createOrdered} from "../../services/order-services.js";
import {validator_createOrder} from "../../middlewares/validator/validator-order.js";
import {login_required_by_user_id} from "../../middlewares/auth/login-required-by-user-id.js";

const router = express.Router();

// 결제 성공하면 주문 생성 or 결제 실패
router.post("/:userId", login_required_by_user_id, validator_createOrder, async (req, res) => {
  const {address, userId} = req.body;
  const products = req.body.products;

  try {
    const orderNumber = await createOrdered(products, userId, address);

    res.status(201).json({message: "결제가 성공적으로 완료되었습니다.", orderNumber});
  } catch (error) {
    res.status(400).json({status: "400", error: "결제 실패 및 주문 생성 실패: " + error.message});
  }
});

export default router;
