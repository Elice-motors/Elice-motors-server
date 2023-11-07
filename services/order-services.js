import Order from "../db/models/orders/order-model.js";

// 특정 유저의 주문 내역을 불러오는 함수
async function getUserOrders(userId) {
  try {
    return await Order.find({user: userId});
  } catch (error) {
    throw {status: 404, message: "주문 내역을 불러오는 중 오류가 발생했습니다."};
  }
}

// 주문 내역 저장 함수
async function createOrder(orderData) {
  try {
    const createdOrder = await Order.create(orderData);
    return createdOrder;
  } catch (error) {
    throw {status: 404, message: "주문을 생성할 수 없습니다."};
  }
}

//주문 정보 찾는 함수
async function findByOrderId(orderId) {
  try {
    return await Order.findOne({_id: orderId});
  } catch (error) {
    throw {status: 404, message: "주문을 찾을 수 없습니다."};
  }
}

// 주문 삭제 함수
async function deleteOrder(orderId) {
  if (!orderId) {
    throw {status: 404, message: "주문ID 불일치"};
  }

  try {
    const order = await findByOrderId(orderId);

    if (!order) {
      return {status: 404, message: "해당 유저의 주문 내역이 없습니다."};
    }

    const deleteResult = await Order.deleteOne({_id: orderId});

    if (deleteResult.deletedCount === 0) {
      return {status: 404, message: "삭제 가능한 주문이 없습니다."};
    }

    return {status: 200, message: "주문이 정상적으로 삭제되었습니다."};
  } catch (error) {
    throw {status: 500, message: "주문을 삭제하는 동안 오류가 발생했습니다: " + error.message};
  }
}

// 주문 전체를 조회하는 함수
async function getAllOrders() {
  try {
    return await Order.find({});
  } catch (error) {
    throw {status: 404, message: "주문을 조회하는 중 오류가 발생했습니다."};
  }
}

export {createOrder, deleteOrder, getUserOrders, findByOrderId, getAllOrders};
