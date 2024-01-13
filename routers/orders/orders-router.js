import express from "express";
import Order from "../../db/models/orders/order-model.js";
import {getAllOrders, updateOrder} from "../../services/order-services.js";
import {validator_getUserOrders, validator_getAllOrders, validator_deleteOrder } from "../../middlewares/validator/validator-order.js";
import {validator_admin} from "../../middlewares/validator/validator-admin.js";
import {login_required_by_user_id} from "../../middlewares/auth/login-required-by-user-id.js";

const router = express.Router();

// 주문 전체 조회 라우터
router.get("/", validator_admin, validator_getAllOrders, async (req, res) => {
  try {
    const allOrders = await getAllOrders();
    res.status(200).json({status: "200", message: "전체 주문 내역 조회에 성공하였습니다.", allOrders});
  } catch (error) {
    res.status(error.status || 400).json({message: error.message});
  }
});

// 특정 유저의 주문 내역 가져오기
router.get("/:userId", login_required_by_user_id, validator_getUserOrders, async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(404).json({status: "404", message: "주문자 정보를 찾을 수 없습니다."});
  }

  try {
    const orders = await Order.find({userId});
    // const orders = await Order.find({userId}).populate({
    //   path: "products.productInfo",
    //   model: Car,
    //   select: "carName carPrice option color img",
    // })
    if (orders.length > 0) {
      res.status(200).json({status: "200", message: "주문 내역을 가져오는데 성공했습니다.", orders});
    } else {
      res.status(404).json({status: "404", message: "구매 내역을 찾을 수 없습니다."});
    }
  } catch (error) {
    res.status(400).json({status: "400", message: "서버 오류"});
  }
});

// 특정 유저의 주문 상태 변경
router.put("/:userId", login_required_by_user_id, validator_deleteOrder, async (req, res, next) => {
  const orderNumber = req.query.orderNumber;

  try {
    const result = await updateOrder(orderNumber, req.body);
    if (result) {
      res.status(200).json({status: "200", message: "주문이 성공적으로 변경되었습니다.", orderNumber:result.orderNumber});
    } else {
      res.status(400).json({status: "400", message: "서버 오류입니다."});
    }
  } catch(error) {
    res.status(error.status)
       .json({message: error.message, });
  }
});

export default router;
