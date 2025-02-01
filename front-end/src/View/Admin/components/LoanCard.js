import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './LoanCard.css';

function LoanCard({ loan }) {
  const token = JSON.parse(sessionStorage.getItem('token'));
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');
  const [isToView, setIsToView] = useState(false);

  let veiwDetail;
  let mask;

  const formatDate = (date) => {
    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (loan) {
      async function fetchData() {
        try {
          const res = await axios.post('http://localhost:3001/user/getUserBy', {
            token,
            by: 'userId',
            value: loan.userId,
          });
          if (res.data.message === 'got') {
            setUser(res.data.user);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      if (loan.date) {
        const formattedDate = formatDate(loan.date);
        setDate(formattedDate);
      }

      fetchData();
    }
  }, [loan,token]);

  if (isToView) {
    veiwDetail = (
      <div className="single-loan-container">
          <div>
            
          </div>
            <div className='loanNav'>
                <div className='cell'>Paid Status</div>
                <div className='cell'>Due Date </div>
                <div className='cell' >Pending </div>
                <div className='cell'>Bill No </div>
                <div className='cell'>Over Due </div>
            </div>
        {Object.values(loan.dues).map((monthData) => (
          <DueWithoutPay key={monthData._id} monthData={monthData} />
        ))}
      </div>
    );

    mask = <div className="menu-mask" onClick={() => setIsToView(false)}></div>;
  }

  return (
    <div className="loan-card-container">
      <div>
        
      </div>
      {loan && user && (
        <div className="values" onClick={() => setIsToView(true)}>
          <div className='cell'>{date && date}</div>
          <div className='cell'>{loan.billNo}</div>
          <div className='cell'>{loan.loanNo}</div>
          <div className='cell'>{loan.userId}</div>
          <div className='cell'>{user.firstName + ' ' + user.lastName}</div>
          <div className='cell'>{user.address}</div>
          <div className='cell'>{user.mobile}</div>
          <div className='cell'>{loan.loanAmount}</div>
          <div className='cell'>{loan.pendingAmount}</div>
        </div>
      )}
      {veiwDetail}
      {mask}
    </div>
  );
}

function Due({ monthData, getPaidDues }) {
  const [isClicked, setIsClicked] = useState(true);
  const formatDate = (date) => {
    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);
    return `${day}/${month}/${year}`;
  };
  const[paidStatus, setPaidStatus] = useState();
  useEffect(()=>{
    if(monthData.isPaid)
      setPaidStatus('Paid')
    else if(monthData.isHasOverDue)
      setPaidStatus('Overdue')
    else
      setPaidStatus('Not paid')

  },[paidStatus,monthData])
  const handlePay = () => {
    setIsClicked(false);
    getPaidDues(monthData);
  };

  return (
    <div className={`due-container ${monthData.isPaid ? 'paid' : monthData.isHasOverDue ? 'over-due' : ''}`}>
        <div className='cell'>{paidStatus}</div>
        <div className='cell'>{formatDate(monthData.date)}</div>
        <div className='cell'>{monthData.amount}</div>
        <div className='cell'>{monthData.billNo}</div>
        <div className='cell'>{monthData.overDueAmount}</div>
        {!monthData.isPaid && isClicked && 
          <div className={`cell ${paidStatus==='Not paid'&&'not-paid'}`} >
            <button onClick={handlePay}>pay</button>
          </div>
        }
        {monthData.isPaid && <div className='cell'>{formatDate(monthData.paidDate)}</div>}
    </div>
  );
}

function DueWithoutPay({ monthData }) {
  const formatDate = (date) => {
    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);
    return `${day}/${month}/${year}`;
  };
  const [paidDate, setPaidDate] =useState();
  const[paidStatus, setPaidStatus] = useState();
  useEffect(()=>{
    if(monthData.isPaid)
      setPaidStatus('Paid')
    else if(monthData.isHasOverDue)
      setPaidStatus('Overdue')
    else
      setPaidStatus('Not paid')

    setPaidDate(formatDate(monthData.paidDate))
    
  },[paidStatus,monthData,paidDate])

  return (
    <div className={`due-container ${monthData.isPaid ? 'paid' : monthData.isHasOverDue ? 'over-due' : ''}`}>
        <div className='cell'>{paidStatus}</div>
        <div className='cell'>{formatDate(monthData.date)}</div>
        <div className='cell'>{monthData.amount}</div>
        <div className='cell'>{monthData.billNo}</div>
        <div className='cell'>{monthData.overDueAmount}</div>
    </div>
  );
}

export default LoanCard;
export { Due, DueWithoutPay };