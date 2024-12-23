import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import React, { useEffect, useState , useRef} from 'react'
import Payment from './Payment';
import './MakeBill.css'
import Receive from './Receive';

// import { useReactToPrint } from 'react-to-print';

function MakeBill() {
    
    const [payOrReceive, setPayOrReceive] = useState('payment');
    const [billNo, setBillNo] = useState('');
    const [error, setError ] = useState('');
    const [date, setDate] = useState('');
   
    let pay;


    
    useEffect( ()=>
    {
        async function get(){
            await axios.post('http://localhost:3001/counter/getCounter',{reqId:'billNo'})
            .then(res =>{
                setBillNo(res.data+1);
            })
            .catch(error=>{
                setError(error);
            })
        }
        const formatDate = () => {
            const formattedDate = new Date();
            const day = String(formattedDate.getDate()).padStart(2, '0');
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
            const year = formattedDate.getFullYear();
    
            setDate( String(`${day}/${month}/${year}`));
        };
        formatDate();
        get();
    })
 
   

    if(payOrReceive==='payment')
    {
        pay=<Payment billNo={billNo}/>
    }
    if(payOrReceive==='receive')
    {        
        pay= <Receive billNo={billNo}/>
        
    }

    
  return (
    <div className='makeBill'>
        <div>
            <form >
                <div className='upperDiv'>
                    <div className='input-box'>
                        <input type='text' value={date} required />
                        <span>Today</span>
                    </div>
                    <div className='input-box'>
                        
                        <input type='text' value={billNo} required />
                        <span>Bill</span>
                    </div>
                    <div className='input-box'>
                        <label >Transaction Type</label>
                        <select
                            value={payOrReceive}
                            onChange={(e)=>{
                                const state = e.target.value
                                setPayOrReceive(state)
                            }}
                            required
                        >
                            <option value="payment" defaultValue={''}>Payment</option>
                            <option value="receive">Receive</option>
                        </select>
                    </div>
                </div>
                {pay}
            </form>
        </div>
        {error&&<p className='error-container'>{error}</p>}
    </div>
  )
}

export default MakeBill