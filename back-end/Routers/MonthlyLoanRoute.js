const express = require("express");
const {authAdmin, authUser} = require('../middleware/AuthUser');
const loanRouter = express.Router();
const {addLoan, getAllLoans, getLoan, getThisWeekLoan, getTodayLoan, payLoan, getHistory} = require('../controllers/MonthlyLoanController')


// get
loanRouter.route('/getTodayLoan').post(authAdmin, getTodayLoan);
loanRouter.route('/getThisWeekLoan').post(authAdmin, getThisWeekLoan);

// post
loanRouter.route('/addLoan').post(authAdmin, addLoan);
loanRouter.route('/getAllLoans').post(authAdmin, getAllLoans);
loanRouter.route('/getLoan').post(authAdmin, getLoan);
loanRouter.route('/payLoan').post(authAdmin, payLoan);
loanRouter.route('/getHistory').post(authUser, getHistory);

// put

module.exports = loanRouter;