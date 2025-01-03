import axios from 'axios';
import React, { useState } from 'react'
import { Due } from '../../components/LoanCard';
import './MakeBill.css'

function Payment({billNo}) {
    
  const token = JSON.parse(sessionStorage.getItem('token'));
    const [payLoanNo, setPayLoanNo] = useState('');
    const [loanType, setLoanType] = useState('monthly');
    const [mobile, setMobile] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage ] = useState('');
    const [guarantor, setGuarantor] = useState('');
    const [guarantorName, setGuarantorUserName] = useState('');
    const [guarantorMobile, setGuarantorMobile] = useState('');
    const [guarantorId, setGuarantorUserId] = useState('');
    const [guarantorAddress, setGuarantorAddress] = useState('');
    const [loan, setLoan] = useState('');
    const [user, setUser] = useState('');
    const [payDues, setPayDues] = useState([]);
    const [showBill, setShowBill] = useState(false);
    const [payDueString, setPayDueString] = useState('');

    const handleLoanNo = async(e)=>{
        setPayLoanNo(e.target.value)
        setMessage('')
        setUserId('')
        setMobile('')
        setUserName('')
        setAddress('')
        setGuarantorMobile('')
        setGuarantorUserName('');
        setGuarantorAddress('')
        setGuarantorUserId('')
        if(e.target.value)
        {
            await axios.post('http://localhost:3001/monthlyLoan/getLoan', {
                token, message:'monthly', loanNo: e.target.value
            }).then(async res=>{
                if(res.data.message==='got')
                {
                    const loan = res.data.loan;
                    setUserId(loan.userId);
                    setGuarantorUserId(loan.guarantorId)
                    if(loan)
                    {
                        setLoan(loan);
                        await axios.post('http://localhost:3001/user/getUserBy', {token, by: 'userId', value: loan.userId})
                        .then(res=>{
                            if(res.data.message==='got')
                            {
                                const user= res.data.user;
                                setUser(user);
                                setMobile(user.mobile)
                                setUserName(user.firstName+" "+user.lastName);
                                setAddress(user.address)
                            }
                            else if(res.data.message==='usernotfound'){
                                setMessage('user Not found');
                            }
                        })
                        await axios.post('http://localhost:3001/user/getUserBy', {token, by: 'userId', value: loan.guarantorId})
                        .then(res=>{
                            if(res.data.message==='got')
                            {
                                const user= res.data.user;
                                setGuarantor(user);
                                setGuarantorMobile(user.mobile)
                                setGuarantorUserName(user.firstName+" "+user.lastName);
                                setGuarantorAddress(user.address)
                            }
                            else if(res.data.message==='usernotfound'){
                                setMessage('Guarantor Not found');
                            }
                        })
                    }
                }
                else
                {
                    setMessage('Loan Not found');
                }
            }).catch(err =>{
                console.log(err);
            })
        }
    }
    
    const [paidAmount, setPaidAmount ] = useState(0);
    const paidDues =(monthData)=>{
        if (payDues.indexOf(monthData) === -1) {
            setPayDues([...payDues, monthData]);
            setPaidAmount(paidAmount+monthData.amount);
            setPayDueString(payDueString+" "+String(monthData.monthNo));
        }
    }
    const handleBill =async ()=>{
        if(payDues)
        {
            await axios.post('http://localhost:3001/monthlyLoan/payLoan',{
                token, loanId : loan.loanNo , paidDues: payDues
            })
            
            await axios.post('http://localhost:3001/bill/addBill',{
                token, billNo : billNo, loanType:loanType, userId: userId, loanNo: loan.loanNo, 
                isPayment:'true', receivedAmount: 0, paidAmount, paidDues: payDueString
            }).then((res)=>{
                setShowBill(res.data.bill);

            }).catch((e)=>{
                alert(e);
            });

            await axios.post('http://localhost:3001/counter/increament', { reqId: 'billId' });

        console.log(showBill);
        }
    }

    let billMask ;
    
  return (
        <div className='formItems'>
            <div>
                <label>Loan Type</label>
                <select
                    value={loanType}
                    onChange={(e)=>{
                        const state = e.target.value
                        setLoanType(state)
                    }}
                >
                    <option value="monthly" defaultValue={''}>Monthly Loan</option>
                    <option value="yearly">Yearly Loan</option>
                    <option value="emergency">Emergency Loan</option>
                    <option value="int">INT</option>
                </select>
            </div>
            <div className='input-box'>
                <input
                    type="text"
                    value={payLoanNo}
                    onChange={handleLoanNo}
                    required
                    />
                <span>Enter Loan No</span>
            </div>
            <div className='profileContainer'>
                    {userId&&<>
                    <div className='profileCard'> 
                        <div className='imgContainer'>
                            {user.imageUrl&&<img src={user.imageUrl} alt='sorry' />}
                        </div>
                        <div className='input-box'>
                            <input
                                type="text"
                                value={userId}
                                readOnly
                            />
                            <span>User Id</span>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={userName}
                                readOnly
                            />
                            <span>User Name</span>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={mobile}
                                readOnly
                            />
                            <span>User Mobile</span>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={address}
                                readOnly
                            />
                            <span>User Address</span>
                        </div>
                    </div>
                    <div className='profileCard'>
                        <div className='imgContainer'>
                            {guarantor.imageUrl&&<img src={guarantor.imageUrl} alt='sorry' />}
                        </div>
                    <div>
                        <input
                            type="text"
                            value={guarantorId}
                            readOnly
                        />
                        <span>Guarantor Id</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={guarantorName}
                            readOnly
                        />
                        <span>Guarantor Name</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={guarantorMobile}
                            readOnly
                        />
                        <span>Guarantor Mobile</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={guarantorAddress}
                            readOnly
                        />
                        <span>Guarantor Address</span>
                    </div>
                </div>
            </>}
        </div>
        {!showBill&&userName&&<div className='loanCont'>
            <div className='loanNav'>
                <p>Due Date </p>
                <p >Pending </p>
                <p>Bill No </p>
                <p>Over Due </p>
                <p>Paid On </p>
            </div>
            {loan.dues && Object.values(loan.dues).map((monthData) => (
                <Due key={monthData._id} monthData={monthData} getPaidDues= {paidDues}/>
            ))}
        </div>}
        {message&&message}

        {!showBill&&userName&&<button onClick={handleBill}>Get Bill</button>}
        {billMask}
    </div>
  )
}

export default Payment
