const validateOrder = (req, res, next) => {
  // 주문에 관한 미들웨어 로직을 구현
  if (!req.body.productInfo || !req.body.amountInfo || !req.body.userId) {
    return res.status(400).json({error: "Missing required order fields"});
  }
  next();
};

export default validateOrder;
