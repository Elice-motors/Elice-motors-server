async function validator_categoryup (req, res, next) {
    const {carId, carType} = req.body;
    if(! carId || !carType ) {
        res.status(401).json({message: "상품아이디와 차타입은 필수 요청 값입니다"});
        return;
    }
    next();
}
export{validator_categoryup};