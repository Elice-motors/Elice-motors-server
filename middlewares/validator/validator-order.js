import {productMissing} from "../../services/order-services.js";

// 결제 validator
async function validator_createOrder(req, res, next) {
  const {products, address, userId} = req.body;

  for (const product of products) {
    if (!product.carId || productMissing(product)) {
      res.status(404).json({status: "404", error: "제품 정보가 누락되었습니다."});
      return;
    }
  }

  if (!address || !userId) {
    res.status(404).json({status: "404", error: "주문자 정보가 누락되었습니다."});
    return;
  }
  next();
}

// 특정 유저의 주문 조회
async function validator_getUserOrders(req, res, next) {
  const {userId} = req.params;

  if (!userId) {
    res.status(404).json({status: "404", error: "유효하지 않은 userId로 주문을 불러올 수 없습니다."});
    return;
  }

  next();
}

// 전체 주문 조회
async function validator_getAllOrders(req, res, next) {
  next();
}

// 삭제 validator
async function validator_deleteOrder(req, res, next) {
  const orderNumber = req.query.orderNumber;
  if (!orderNumber) {
    res.status(400).json({status: "404", error: "유효하지 않은 주문 번호입니다."});
    return;
  }
  next();
}

export {validator_deleteOrder, validator_createOrder, validator_getUserOrders, validator_getAllOrders};
