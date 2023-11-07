import express from "express";
import {getUserOrders, getAllOrders} from "../../services/order-services.js";

const router = express.Router();

// 특정 유저의 주문 내역 가져오기
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(404).json({status: "404", message: "주문자 정보를 찾을 수 없습니다."});
  }
  try {
    const orders = await getUserOrders(userId);

    if (orders.length > 0) {
      res.status(200).json({status: "200", message: "주문 내역을 가져오는데 성공했습니다.", orders});
    } else {
      res.status(400).json({status: "400", message: "구매 내역을 찾을 수 없습니다."});
    }
  } catch (error) {
    res.status(500).json({status: "500", message: "서버 오류"});
  }
});

// 주문 전체 조회 라우터
router.get("/", async (req, res) => {
  try {
    const allOrders = await getAllOrders();
    res.status(200).json({status: "200", message: "전체 주문 내역 조회에 성공하였습니다.", allOrders});
  } catch (error) {
    res.status(error.status || 500).json({message: error.message});
  }
});

export default router;
