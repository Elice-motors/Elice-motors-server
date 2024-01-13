async function validator_carup (req, res, next) {
    const {carName, carPrice, speed, mileage, fuel, option, category, img} = req.body;
    //const img = req.file.filename;
    if(! carName || !carPrice || !speed || !mileage || !fuel || !option || !category || !img ) {
        res.status(401).json({message: "상품 이름, 가격, 이미지, 최대속력, 주행거리, 연비, 옵션, 카테고리는 필수 요청 값입니다"});
        return;
    }
    next();
}
export{validator_carup};