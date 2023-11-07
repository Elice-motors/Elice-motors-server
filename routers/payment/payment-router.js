import express from "express";
import {createOrder} from "../../services/order-services.js";
import Order from "../../db/models/orders/order-model.js";

const router = express.Router();

//결제 성공하면 주문 생성 or 결제 실패
router.post("/", async (req, res) => {
  const {products, amountInfo, address, status, userId} = req.body;

  if (!products || !amountInfo || !address || !status || !userId) {
    return res.status(400).json({status: "400", error: "정보가 누락되었습니다."});
  }

  try {
    const productItems = products.map((product) => ({
      productInfo: product,
      quantity: 1,
    }));

    const newOrder = new Order({
      products: productItems,
      totalAmount: amountInfo,
      user: userId,
      address,
      status,
    });

    await createOrder(newOrder);
    res.status(200).json({status: "200", message: "결제가 성공적으로 완료되었습니다."});
  } catch (error) {
    res.status(500).json({status: "500", error: "결제 실패 및 주문 생성 실패: " + error.message});
  }
});

export default router;
