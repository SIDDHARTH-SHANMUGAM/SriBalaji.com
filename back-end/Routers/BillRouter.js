const express = require("express");
const {authAdmin} = require('../middleware/AuthUser');
const billRouter = express.Router();
const {addBill, getAllBill} = require('../controllers/BillController')

// get

// post
billRouter.route('/getAllBill').post(authAdmin,getAllBill);
billRouter.route('/addBill').post(authAdmin, addBill);

// put

module.exports = billRouter;