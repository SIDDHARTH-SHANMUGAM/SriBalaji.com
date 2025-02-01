import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './MakeBill.css'
import { IoAlertOutline } from "react-icons/io5";

function Receive({billNo}) {
    
    
    const token = JSON.parse(sessionStorage.getItem('token'));
    const [loanType, setLoanType] = useState('monthly');
    const [mobile, setMobile] = useState('');
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [address, setaddress] = useState('');
    const [guarantorName, setGuarantorUserName] = useState('');
    const [guarantor, setGuarantor] = useState('');
    const [guarantorMobile, setGuarantorMobile] = useState('');
    const [guarantorId, setGuarantorUserId] = useState('');
    const [guarantorAddress, setGuarantorAddress] = useState('');
    const [amount, setAmount ] =useState('');
    const [error, setError ] = useState('');
    const [bill, setBill ] = useState('');
    const [loanNo, setLoanNo] = useState('');
    const [isSubmit , setIsSubmit]=useState(false);
    
  let menumask
  let ensureSubmit

    useEffect( ()=>
        {
            async function get(){
                await axios.post('http://localhost:3001/counter/getCounter',{reqId:'loanNo'})
                .then(res =>{
                    setLoanNo(res.data+1);
                })
                .catch(error=>{
                    setError(error);
                })
            }
            get();
        })

    const handleSubmit = async (e) => {
        e.preventDefault();  

        try {
            await axios.post('http://localhost:3001/monthlyLoan/addLoan', {
            token, billNo, loanNo, userId, guarantorId, amount
            }).then(
                async (res)=>{
                    if(res.data.message==='loanAdded')
                    {
                        await axios.post('http://localhost:3001/counter/increament', { reqId: 'loanNo' })
                        .then( async()=>{
                            console.log("loan added");
                            const isPayment =false;
                            const receivedAmount= amount;
                            const paidAmount=0;
                            const paidDues='5Dues';
                            await axios.post('http://localhost:3001/bill/addBill', {
                                token, billNo, loanType, userId, loanNo, isPayment, receivedAmount, paidAmount, paidDues
                            }).then(async (res)=>{
                                console.log("bill added");
                                if(res.data.message==='billAdded')
                                {
                                    await axios.post('http://localhost:3001/counter/increament', { reqId: 'billNo' })
                                    setBill(res.data.bill);
                                    await axios.post('http://localhost:3001/msg/addMessage', {userId: userId, message:'Alert You have been Received Amount from Sri balaji as a borrower to return in 5 moths due as LoanlNo is '+billNo})
                                    await axios.post('http://localhost:3001/msg/addMessage', {userId: guarantorId, message:'Alert You have been Received Amount from Sri balaji as a guarantor to return in 5 moths due as LoanNo is '+billNo})

                                }
                            }).catch(error=>{
                                setError("bill adding error"+error);
                            })
                        }).catch(error =>{
                            setError("loan adding error"+error);
                        })
                    }
                }
            );
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handUserId = async(e)=>{
        setUserId(e.target.value);
        setUser('')
        setError('')
        setMobile('')
        setUserName('')
        setaddress('')
        const x =e.target.value;
        if(x.toString().length===9)
        {
            await axios.post('http://localhost:3001/user/getUserBy', { token, by: 'userId', value: e.target.value})
            .then(res=>{
                if(res.data.message==='got')
                {
                    const user = res.data.user;
                    setUser(user);
                    setMobile(user.mobile)
                    setUserName(user.firstName+' '+user.lastName);
                    setaddress(user.address)
                }
                else if(res.data.message==='usernotfound'){
                    setError('user Not found');
                }
            })
        }
        else if(x.toString().length>9)
        {
            setError('Id is Only 9 digit');
        }
    }
    const handGuarantorId = async(e)=>{
        setGuarantorUserId(e.target.value);
        setGuarantor('')
        setError('')
        setGuarantorMobile('')
        setGuarantorUserName('')
        setGuarantorAddress('')
        const x =e.target.value;
        if(x.toString().length===9)
        {
            await axios.post('http://localhost:3001/user/getUserBy', { token,  by: 'userId', value: e.target.value})
            .then(res=>{
                if(res.data.message==='got')
                {
                    const user = res.data.user;
                    setGuarantor(user);
                    setGuarantorMobile(user.mobile)
                    setGuarantorUserName(user.firstName+' '+user.lastName);
                    setGuarantorAddress(user.address)
                }
                else if(res.data.message==='usernotfound'){
                    setError('Guarator Not found');
                }
            })
        }
        else if(x.toString().length>9)
        {
            setError('Id is Only 9 digit');
        }
    }
    const handUserMobile = async(e)=>{
        setMobile(e.target.value)
        setUser('')
        setError('');
        setUserId('');
        setUserName('');
        setaddress('');
        const x =e.target.value;
        if(x.toString().length===10)
        {
            await axios.post('http://localhost:3001/user/getUserBy', { token,  by: 'mobile', value: e.target.value})
            .then(res=>{
                if(res.data.message==='got')
                {
                    const user= res.data.user;
                    setUser(user)
                    setUserId(user.userId)
                    setUserName(user.firstName+' '+user.lastName);
                    setaddress(user.address)
                }
                else if(res.data.message==='usernotfound'){
                    setError('user Not found');
                }
            })
        }else if(x.toString().length>10)
        {
            setError('Mobile number is Only 10 digit');
        }

    }
    const handGuarantorMobile = async(e)=>{
        setGuarantorMobile(e.target.value)
        setError('');
        setGuarantor('')
        setGuarantorAddress('');
        setGuarantorUserName('');
        setGuarantorUserId('');
        const x =e.target.value;
        if(x.toString().length===10)
        {
            await axios.post('http://localhost:3001/user/getUserBy', { token, by: 'mobile', value: e.target.value})
            .then(res=>{
                if(res.data.message==='got')
                {
                    const user= res.data.user;
                    setGuarantor(user)
                    setGuarantorUserId(user.userId)
                    setGuarantorUserName(user.firstName+' '+user.lastName);
                    setGuarantorAddress(user.address)
                }
                else if(res.data.message==='usernotfound'){
                    setError('user Not found');
                }
            })
        }else if(x.toString().length>10)
        {
            setError('Mobile number is Only 10 digit');
        }

    }


    if(isSubmit)
      {
        ensureSubmit =<div className='logout'>
          <div className='logoutContainer drop-down'>
            <div className='message'>
              <IoAlertOutline size='100px'/>
              <h2>Confirm Transaction</h2>
            </div>
            <div className='button-container'>
              <button onClick={handleSubmit}>Confirm</button>
              <button onClick={()=> {setIsSubmit(false)}}>Cancel</button>
            </div>
          </div>
        </div>
      }


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
                required
            >
                <option value="monthly" defaultValue={''}>Monthly Loan</option>
                <option value="yearly">Yearly Loan</option>
                <option value="emergency">Emergency Loan</option>
                <option value="int">INT</option>
            </select>
        </div>
        <div className='profileContainer'>
            <div className='profileCard'>
                <div className='imgContainer'>
                    {user.imageUrl&&<img src={user.imageUrl} alt='sorry' />}
                </div>
                <div className='input-box'>
                    <input
                        type="text"
                        value={userId}
                        onChange={handUserId}
                        required
                    />
                    <span>User Id</span>
                </div>
                <div className='input-box'>
                    <input
                        type="text"
                        value={mobile}
                        onChange={handUserMobile}
                        required
                    />
                    <span>User Mobile</span>
                </div>
                {userName&&<>
                <div className='input-box'>
                    <input
                        type="text"
                        value={userName}
                        required
                    />
                    <span>User Name</span>
                </div>
                <div className='input-box'>
                    <input
                        type="text"
                        value={address}
                        required
                    />
                    <span>User Address</span>
                </div>
                </>
                }
            </div>
            <div className='profileCard'>
                <div className='imgContainer'>
                    {guarantor.imageUrl&&<img src={guarantor.imageUrl} alt='sorry' />}

                </div>
                <div className='input-box'>
                    <input
                        type="text"
                        value={guarantorId}
                        onChange={handGuarantorId}
                        required
                    />
                    <span>Guarantor Id</span>
                </div>
                <div className='input-box'>
                    <input
                        type="text"
                        value={guarantorMobile}
                        onChange={handGuarantorMobile}
                        required
                    />
                    <span>Guarantor Mobile</span>
                </div>
                {guarantorName&&<>
                    <div className='input-box'>
                        <input
                            type="text"
                            value={guarantorName}
                            required
                        />
                        <span>Guarantor Name</span>
                    </div>
                    <div className='input-box'>
                        <input
                            type="text"
                            value={guarantorAddress}
                            required
                        />
                        <span>Guarantor Address</span>
                    </div>

                </>}
            </div>
        </div>
            <div className='input-box'>
                <input
                    type="text"
                    value={loanNo}
                    required
                />
                <span>Laon No</span>
            </div>
            <div className='input-box'>
                <input
                    type="text"
                    value={amount}
                    onChange={(e)=>{setAmount(e.target.value)}}
                    required
                />
                <span>Amount</span>
            </div>
            <div className='input-box'>
                <input
                    type="text"
                    value={'3.6'}
                    required
                    
                />
                <span>Intrest rate</span>
            </div>
        <div className='button-container'>
            <button onClick={()=>{setIsSubmit(true)}}>Submit</button>
        </div>
        {ensureSubmit}
        {menumask}
        {
            error&&
            <div className='error-container drop-right'>
            <img src='/illustrations/char.svg' alt=''/>
            {error}
            </div>
        }
        </div>
  )
}

export default Receive