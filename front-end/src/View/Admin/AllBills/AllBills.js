import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AllBills() {

  const token = JSON.parse(sessionStorage.getItem('token'));
  const [bills, setBills] = useState('');

  useEffect( ()=>
  {
    async function fetchData()
    {
      await axios.post('http://localhost:3001/bill/getAllBill',{ token }).then((res)=>{
        if(res.data.message==='got')
        {
          setBills(res.data.bills); 
        }
      }).catch((e)=>{
        console.log(e);
      })
    }
    fetchData();
  },[token])
  return (
    <div className='loans-container'>
      <div className='titles'>
            <div className='cell'>Date</div>
            <div className='cell'>Bill NO</div>
            <div className='cell'>Loan Type</div>
            <div className='cell'>Loan No</div>
            <div className='cell'>Name</div>
            <div className='cell'>Transaction Type</div>
            <div className='cell'>Pay/Rec Amt</div>
            <div className='cell'>Dues</div>
        </div>
      {
        bills && bills.map((bill) => (
          <BillCard key={bill._id} bill={bill}  />
        ))
      }
   </div>
  )
}

 function BillCard({ bill }) {
  
  const token = JSON.parse(sessionStorage.getItem('token'));
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');

  const formatDate = (date) => {
    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);
    return `${day}/${month}/${year}`;
  };

  

  useEffect(() => {
    async function fetchData() {
    try {
      const res = await axios.post('http://localhost:3001/user/getUserBy', {
        token,
        by: 'userId',
        value: bill.userId,
      });
      if (res.data.message === 'got') {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
    if (bill.date) {
      const formattedDate = formatDate(bill.date);
      setDate(formattedDate);
    }
    fetchData();
  }, [bill, token]);

  return (
    <div className='loan-card-container' >
      {bill && user && (
        <div className='values'>
          <div className='cell'>{date && date}</div>
          <div className='cell'>{bill.billNo}</div>
          <div className='cell'>{bill.loanType}</div>
          <div className='cell'>{bill.loanNo}</div>
          <div className='cell'>{user.firstName + ' ' + user.lastName}</div>
          <div className='cell'>{bill.isPayment ? 'Payment' : 'Loan'}</div>
          <div className='cell'>{bill.isPayment ? bill.paidAmount:bill.receivedAmount}</div>
          <div className='cell'>{bill.paidDues}</div>
        </div>
      )}
    </div>
  );
}

export default AllBills
