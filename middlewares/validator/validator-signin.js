
async function validator_signin (req, res, next) {

    const { email, password } = req.body;

    if( !email || !password ) {
        res.status(401).json({ message: "이메일, 비밀번호는 필수 요청 값입니다." });
        return;
    }

    next();
}

export { validator_signin };