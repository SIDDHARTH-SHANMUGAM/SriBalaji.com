import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import './History.css'

function History() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    const [loans, setHistory] = useState('');
    useEffect( ()=>
    {
        async function fetchData()
        {
            await axios.post('http://localhost:3001/monthlyLoan/getHistory', { token: token }).then(res=>{
                if(res.data.message==='got')
                {
                    setHistory(res.data.loans);
                }
            })
        }
        fetchData();
    },[token])


  return (
    <div className='HistoryContainer'>
        <Navbar/>

        <div className='map'>
        {
            loans && loans.map((loan) => (
                <HistoryCard key={loan._id} loan={loan} />
        ))
        }
        </div>
    </div>
  )
}

function HistoryCard({loan}){
    console.log(loan);
    return <div className='loanCardContainer'>
        <div>Loan No: {loan.loanNo}</div>
        <div>{loan.role}</div>
        <div>{loan.pendingAmount}</div>

    </div>
}

export default History
