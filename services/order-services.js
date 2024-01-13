import { createTransport } from 'nodemailer';
import fs from 'fs/promises';
import {config} from "dotenv";
config(); // dotenv 설정 호출
const MAILER_NAME = process.env.MAILER_NAME;
const MAILER_PASSWORD = process.env.MAILER_PASSWORD;
import { User } from '../db/models/users/user-model.js';
import Order from "../db/models/orders/order-model.js";

//주문 정보 찾는 함수
async function findByUserId(userId) {
  try {
    return await Order.findOne({userId});
  } catch (error) {
    throw {status: 404, message: "주문을 찾을 수 없습니다."};
  }
}

// 주문 정보 변경 함수
async function updateOrder(orderNumber, data) {
  const result = await Order.findOneAndUpdate(
    {orderNumber:orderNumber},
    {status:data.status},
    { new: true });
  if(!result) {
    throw {status: 404, message: "orderNumber 불일치"};
  }
  return result;
}

// 주문 삭제 함수
async function deleteOrder(orderNumber) {
  if (!orderNumber) {
    throw {status: 404, message: "orderNumber 불일치"};
  }

  try {
    const order = await Order.findOne({orderNumber});

    if (!order) {
      return {status: 404, message: "해당 유저의 주문 내역이 없습니다."};
    }

    const deleteResult = await Order.deleteOne({orderNumber});

    if (deleteResult.deletedCount === 0) {
      return {status: 404, message: "삭제 가능한 주문이 없습니다."};
    }

    return {status: 200, message: "주문이 정상적으로 삭제되었습니다."};
  } catch (error) {
    throw {status: 400, message: "주문을 삭제하는 동안 오류가 발생했습니다: " + error.message};
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

// 총 금액 계산 함수
function calculateTotalPrice(products) {
  const totalPrice = products.reduce((total, product) => {
    return total + parseInt(product.carPrice, 10);
  }, 0);

  return totalPrice;
}

//주문 내역 생성 및 저장
async function createOrdered(products, userId, address) {
  const orderNumber = orderNumbers();

  const productItems = products.map((product) => {
    return {
      productInfo: {
        carId: product.carId,
        carName: product.carName,
        img: product.img,
        carPrice: product.carPrice,
        option: product.option,
        color: product.color,
      },
    };
  });

  const totalPrice = await calculateTotalPrice(products);

  const newOrderData = {
    orderNumber,
    products: productItems,
    userId: userId,
    address,
    totalAmount: totalPrice,
  };

  try {
    const order = new Order(newOrderData);
    await order.save();
    console.log("Order Saved Successfully:", order);
    sendMailer(userId, orderNumber);
    return orderNumber;
  } catch (error) {
    throw {status: 404, message: "정보 누락으로 주문 저장에 실패하였습니다."};
  }
}

//제품 정보 누락 확인
function productMissing(product) {
  const {carId, carName, img, carPrice, option, color} = product;
  return !carId || !carName || !img || !carPrice || !option || !color;
}

// 주문 번호 생성 (중복 값이 생성될 확률은 0.0000000031% from 헬피)
function orderNumbers() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let orderNumber = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters.charAt(randomIndex);
  }
  return orderNumber;
}

// 주문 완료 이메일 발송 함수
async function sendMailer(userId, orderNumber) {
  // nodemailer transporter 생성
  const transporter = createTransport({
    service: 'Gmail',
    auth: {
      user: MAILER_NAME,
      pass: MAILER_PASSWORD,
    }
  });

  const user = await User.findById(userId);
  if(user) {
    // 메일 옵션 설정
    const mailOptions = {
      from: MAILER_NAME,
      to: user.email,
      subject: '[EliceMotors] 주문이 완료되었습니다.',
      html:`<html><body><h3>주문 번호 : ${orderNumber}<h3>
            <p>주문 정보는 주문 내역 페이지에서 확인하실 수 있습니다.</body></html>`
    };

    // 메일 전송
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('메일이 성공적으로 전송되었습니다.');
      }
    });
  }
}


export {deleteOrder, findByUserId, getAllOrders, updateOrder, createOrdered, calculateTotalPrice};
export {productMissing, orderNumbers};
