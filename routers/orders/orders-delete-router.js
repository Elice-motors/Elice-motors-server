import {deleteOrder} from "../../services/order-services.js";
import {login_required_by_user_id} from "../../middlewares/auth/login-required-by-user-id.js";
import {validator_deleteOrder} from "../../middlewares/validator/validator-order.js";
import express from "express";
const router = express.Router();

// 주문 취소(삭제) 라우터
router.delete("/:userId", validator_deleteOrder, login_required_by_user_id, async (req, res, next) => {
  const orderNumber = req.query.orderNumber;
  try {
    const result = await deleteOrder(orderNumber);
    if (result.status === 200) {
      res.status(200).json({status: "200", message: "주문이 성공적으로 취소되었습니다."});
    } else {
      res.status(400).json({status: "400", message: "서버 오류입니다."});
    }
  } catch (error) {
    next(error);
  }
});

export default router;
