const Bill = require('../models/BillModel');

const addBill = async(req, res)=>{
  try{
    const { billNo, loanType, userId, loanNo, isPayment, receivedAmount, paidAmount, paidDues}= req.body;
    console.log("billController addBill :"+paidDues);
    const str = new Date().getDate()+1;
    const str2 = new Date().getMonth()+1;
    const str3 = new Date().getFullYear();
    const today = new Date(`${str3}-${str2}-${str}`);
    const data =new Bill({
      date: today,
      billNo: billNo,
      userId: userId,
      loanType: loanType,
      loanNo: loanNo,
      isPayment: isPayment,
      receivedAmount: receivedAmount,
      paidAmount: paidAmount,
      paidDues: paidDues
    })
    data.save()
    .then(()=> {
      res.json({message:'billAdded', bill: data})
    })
    .catch((e)=> {
      console.log("billcontroller adding error"+e);
      res.json({message: 'errorOccuredInBillInserting'}); 
    })
  }
  catch(e)
  {
  
    res.json({message: 'Network error'})
  }
}

const getAllBill = async (req, res)=> {
    try{
      const bills =await Bill.find({}).limit(50);
      if(bills)
      {
        res.json({message:'got', bills: bills});
      }
    }
    catch(e)
    {
      res.json({message:'Network error'})
    }
}

module.exports = {addBill, getAllBill };