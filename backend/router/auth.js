const express    = require("express");
const checkAuth  = require('../middleware/check-auth') ;
const authCtrl   = require('../controllers/auth');
const authRouter = express.Router();

authRouter.post("", checkAuth, authCtrl.saveAuth);

authRouter.get('/checkEmail/:email', authCtrl.checkEmail)

authRouter.get('/getAuthors', authCtrl.getAuthors)

authRouter.get('/getSocialAuth', authCtrl.getSocialAuth)

authRouter.get('/getAuthInfo/:authId', authCtrl.getAuthInfo)

authRouter.post("/login", authCtrl.login);

authRouter.post("/SocialLogin", authCtrl.onSocialLogin);



module.exports = authRouter; 