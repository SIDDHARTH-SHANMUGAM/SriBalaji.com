const express = require("express");
const {authUser, authAdmin} = require('../middleware/AuthUser');
const userRouter = express.Router();
const {login, signIn, getUser, updateProfile, isAdmin, getUserBy} = require('../controllers/UserController')


// get

// post
userRouter.route('/login').post(login);
userRouter.route('/SignIn').post(signIn);
userRouter.route('/getUser').post(authUser, getUser);
userRouter.route('/isAdmin').post(isAdmin);
userRouter.route('/getUserBy').post(authAdmin, getUserBy);

// put
userRouter.route('/updateProfile').put(authUser, updateProfile);


module.exports = userRouter;