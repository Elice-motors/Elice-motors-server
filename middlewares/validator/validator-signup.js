
async function validator_signup (req, res, next) {

    const { userName, email, password } = req.body;

    if( !userName || !email || !password ) {
        res.status(401).json({ message: "이름, 이메일, 비밀번호는 필수 요청 값입니다." });
        return;
    }

    next();
}

export { validator_signup };