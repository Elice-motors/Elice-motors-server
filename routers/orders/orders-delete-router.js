import express from "express";
import {deleteOrder} from "../../services/order-services.js";
// import validateOrder from "../middlewares/validator/validator-order.js";
const router = express.Router();

// 주문 취소(삭제) 라우터
router.delete("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const result = await deleteOrder(orderId);
    if (result.status === 200) {
      res.status(200).json({status: "200", message: "주문이 성공적으로 취소되었습니다."});
    } else {
      res.status(400).json({status: "400", message: "주문을 삭제하는 중에 오류가 발생하였습니다."});
    }
  } catch (error) {
    res.status(500).json({status: "500", error: error.message});
  }
});

export default router;
