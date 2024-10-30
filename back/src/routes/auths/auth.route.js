const authRouter=require('express').Router();
const {login,logout}=require('./auth.controller');

authRouter.post('/login',login);
authRouter.get('/logout',logout);

module.exports=authRouter;