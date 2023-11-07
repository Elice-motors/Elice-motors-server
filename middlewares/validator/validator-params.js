
async function validator_params (req, res, next) {

    if( !req.params ) {
        res.status(401).json({ message: "파라미터가 없습니다." });
        return;
    }

    next();
}

export { validator_params };