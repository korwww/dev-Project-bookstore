const {StatusCodes} = require('http-status-codes');
const AuthService = require('../services/UserService');

const join = async (req, res) => {
    try {
        const user = await AuthService.join(req.body.email, req.body.password);
        if(user) return res.status(StatusCodes.CREATED).json(user);
        return res.status(StatusCodes.BAD_REQUEST).end();
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
    }
}

const login = async (req, res) => {
    try {
        const token = await AuthService.login(req.body.email, req.body.password);
        if (token) {
            res.cookie("token", token, { httpOnly : true });
            return res.status(StatusCodes.OK).json({token});
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: `이메일 또는 비밀번호가 틀렸습니다.`
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
    }
};

const passwordResetRequest = async (req, res) => {
    try {
        const email = await AuthService.passwordResetRequest(req.body.email);
        if (email) {
            return res.status(StatusCodes.OK).json({email});
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
    }
};

const passwordReset = async (req, res) => {
    try {
        const user = await AuthService.passwordReset(req.body.email, req.body.password);
        if(user) return res.status(StatusCodes.OK).json(user);
        return res.status(StatusCodes.BAD_REQUEST).end();
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
    }
};

module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset
};
