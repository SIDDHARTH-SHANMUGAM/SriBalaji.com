import axios from 'axios';
import React, { useState } from 'react'
import { Due } from '../components/LoanCard';
import './MakeBill.css'

function Payment({billNo}) {
    
  const token = JSON.parse(sessionStorage.getItem('token'));
    const [payLoanNo, setPayLoanNo] = useState();
    const [loanType, setLoanType] = useState('monthly');
    const [mobile, setMobile] = useState();
    const [userName, setUserName] = useState();
    const [userId, setUserId] = useState();
    const [address, setAddress] = useState();
    const [message, setMessage ] = useState();
    const [guarantor, setGuarantor] = useState('');
    const [guarantorName, setGuarantorUserName] = useState();
    const [guarantorMobile, setGuarantorMobile] = useState();
    const [guarantorId, setGuarantorUserId] = useState();
    const [guarantorAddress, setGuarantorAddress] = useState();
    const [loan, setLoan] = useState();
    const [user, setUser] = useState('');
    const [payDues, setPayDues] = useState([]);
    const [payDueString, setPayDueString] = useState('');
    const [paidAmount, setPaidAmount ] = useState(0);

    console.log(billNo);

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
                token, loanId : loan.loanNo , paidDues: payDues, billNo: billNo
            })
            .then(async(res)=>{
                if(res.data.message === "done")
                {
                    await axios.post('http://localhost:3001/bill/addBill',{
                        token, billNo : billNo, loanType:loanType, userId: userId, loanNo: loan.loanNo, 
                        isPayment:'true', receivedAmount: 0, paidAmount, paidDues: payDueString
                    }).then(async (res)=>{
                        if(res.data.message==='billAdded')
                        {
                            await axios.post('http://localhost:3001/counter/increament', { reqId: 'billNo' })
                            .then((res)=>{
                                console.log(res.data.message);

                            })
                        }
                    }).catch((e)=>{
                        alert(e);
                    });
                }

            })
            .catch((e)=>{

            })



        }
    }

    let billMask ;
    
  return (
        <div className='formItems'>
            <div className='input-box'>
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
                                onChange={()=>{}}
                                required
                            />
                            <span>User Id</span>
                        </div>
                        <div className='input-box'>
                            <input
                                type="text"
                                value={userName}
                                onChange={()=>{}}
                                required
                            />
                            <span>User Name</span>
                        </div>
                        <div className='input-box'>
                            <input
                                type="text"
                                value={mobile}
                                onChange={()=>{}}
                                required
                            />
                            <span>User Mobile</span>
                        </div>
                        <div className='input-box'>
                            <input
                                type="text"
                                value={address}
                                onChange={()=>{}}
                                required
                            />
                            <span>User Address</span>
                        </div>
                    </div>
                    <div className='profileCard'>
                        <div className='imgContainer'>
                            {guarantor.imageUrl&&<img src={guarantor.imageUrl} alt='sorry' />}
                        </div>
                    <div className='input-box'>
                        <input
                            type="text"
                            value={guarantorId}
                            onChange={()=>{}}
                            required
                        />
                        <span>Guarantor Id</span>
                    </div>
                    <div className='input-box'>
                        <input
                            type="text"
                            value={guarantorName}
                            onChange={()=>{}}
                            required
                        />
                        <span>Guarantor Name</span>
                    </div>
                    <div className='input-box'>
                        <input
                            type="text"
                            value={guarantorMobile}
                            onChange={()=>{}}
                            required
                        />
                        <span>Guarantor Mobile</span>
                    </div>
                    <div className='input-box'>
                        <input
                            type="text"
                            value={guarantorAddress}
                            onChange={()=>{}}
                            required
                        />
                        <span>Guarantor Address</span>
                    </div>
                </div>
            </>}
        </div>
        {userName&&
        <div className='loanCont'>
            <div className='loanNav'>
                <div className='cell'>Paid Status</div>
                <div className='cell'>Due Date </div>
                <div className='cell' >Pending </div>
                <div className='cell'>Bill No </div>
                <div className='cell'>Over Due </div>
                <div className='cell'>Paid On </div>
            </div>
            {loan.dues && Object.values(loan.dues).map((monthData) => (
                <Due key={monthData._id} monthData={monthData} getPaidDues= {paidDues}/>
            ))}
        </div>}
        {message&&message}

        {userName&&
        <div className='button-container'>
            <button onClick={handleBill}>Get Bill</button>
        </div>
        }
        {billMask}
    </div>
  )
}

export default Payment
