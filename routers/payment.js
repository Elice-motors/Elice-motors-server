//결제하기 버튼을 눌렀을 때의 응답
import {Router} from "express";
const router = Router();

router.post("/", (req, res) => {
  const {productInfo, amountInfo} = req.body;
  // 상품 정보, 금액 정보
  if (!productInfo || !amountInfo) {
    return res.status(400).json({error: "상품 정보 또는 금액 정보가 누락되었습니다."});
  }
  return res.status(200).json({message: "결제가 성공적으로 완료되었습니다."});
});

export default router;
