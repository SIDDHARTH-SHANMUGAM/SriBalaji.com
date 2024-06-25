const express = require("express");
const {authUser} = require('../middleware/AuthUser');
const messageRouter = express.Router();
const {addMessage, getMessage, updateSeen, countUnseenMessages, getUnSeenMessage} = require('../controllers/MessageController');


// get
// post
messageRouter.route('/getMessage').post(authUser, getMessage);
messageRouter.route('/getUnSeenMessage').post(authUser, getUnSeenMessage);
messageRouter.route('/addMessage').post(addMessage);
messageRouter.route('/getCount').post(authUser, countUnseenMessages);

// put
messageRouter.route('/updateSeen').post(authUser, updateSeen);


module.exports = messageRouter;
