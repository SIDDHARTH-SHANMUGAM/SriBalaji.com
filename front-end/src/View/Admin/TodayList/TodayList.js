import React, { useEffect, useState } from 'react'
import LoanCard from '../components/LoanCard'
import axios from 'axios';


function TodayList() {
  
  const token = JSON.parse(sessionStorage.getItem('token'));
  const [loans, setLoans] = useState('');
  useEffect( ()=>
  {
    async function fetchData()
    {
      await axios.post('http://localhost:3001/monthlyLoan/getTodayLoan',{ token }).then(res=>{
        if(res.data.message==='got')
        {
          setLoans(res.data.loans);
        }
      })
    }
    fetchData();
  },[])
  return (
    <div className='loans-container'>
    <div className='titles'>
          <div className='cell'>Date</div>
          <div className='cell'>Bill NO</div>
          <div className='cell'>Ml NO</div>
          <div className='cell'>User Id</div>
          <div className='cell'>Name</div>
          <div className='cell'>Address</div>
          <div className='cell'>mobile</div>
          <div className='cell'>Loan Amount</div>
          <div className='cell'>balance</div>
      </div>
    {
      loans && loans.map((loan) => (
        <LoanCard key={loan._id} loan={loan} />
      ))
    }
 </div>
  )
}

export default TodayList
