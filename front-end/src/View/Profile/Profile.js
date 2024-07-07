import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
import axios from 'axios'
import '../Login/Login.css'

function Profile() {
  const token = JSON.parse(sessionStorage.getItem('token'));
  const [user, setUser] = useState('');
  const [firstName, setFirstName] = useState(user.firstName);
  const [address, setAddress]= useState(user.address);
  const [lastName, setLastName] = useState(user.lastName);
  const [mobile, setMobile] = useState(user.mobile);
  const [photo, setImage] = useState('')
  const [editProfile, setEditProfile] = useState(false);
  const [changePhoto , setChangePhoto] = useState(false);

  useEffect(() => {
      fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.post('http://localhost:3001/user/getUser', {
        token: token
      });
      if(res.data.message==='got')
      {
        setUser(res.data.user);
        setFirstName(res.data.user.firstName);
        setLastName(res.data.user.lastName);
        setMobile(res.data.user.mobile);
        setAddress(res.data.user.address);
        setImage(res.data.user.imageUrl)
      }
      
    } catch (error) {
      console.error('Error fetching Count data:', error);
    } 
  }

  function handleImage(e)
  {
    setImage(e.target.files[0])
  }
  async function submit(e){
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('userId', user.userId);

      await axios.post("http://localhost:3001/uploadImage", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
      .then((res) => {
        if (res.data.message === 'done') {
          window.location.reload();
        }
      })

    }
    catch(e)
    {
      console.log(e);
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await axios.put('http://localhost:3001/user/updateProfile', { token, firstName, lastName, address, mobile}).then((res)=>{
      if(res.data.message==='updated')
      {
        window.location.reload();
      }
    })
    .catch((er)=>{
      console.log(er);
    })
  }
  function formatDate (inputDate){
        
        const dateObject = new Date(inputDate);
    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const year = dateObject.getUTCFullYear();
    return `${day}-${month}-${year}`;
    };

    let boxinEdit;
    let box;

    if(editProfile)
    {
      boxinEdit=
        
      <Container  style={{height: '450px'}}>
        <ImgContainer>
          <img src={user.imageUrl} alt='sorry' />
          {!changePhoto&&<button onClick={()=>setChangePhoto(true)}>Change photo</button>}
          
          {changePhoto&&
          <div className='img'>
            <input  
                type='file' 
                accept='image/*' 
                onChange={handleImage}
              />
            <button type='submit' onClick={ submit }>confirm</button>
          </div>
            }
        </ImgContainer>
        <Content>
          {!changePhoto&&<Answers>
            <form onSubmit={handleSubmit} >
              <div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <span>First Name</span>
              </div>
              <div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <span>Last Name</span>
              </div>
              <div>
                <input
                  type="text"
                  inputMode='none'
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
                <span>Mobile</span>
              </div>
              <div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <span>Address</span>
              </div>
              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </Answers>}
        </Content>
      </Container>

    }
    if(!editProfile)
    {
      box=
      <Container className='drop-up'>
        <ImgContainer>
          <img src={user.imageUrl} alt='sorry' />
          <button onClick={()=>setEditProfile(true)}>Edit profile</button>
        </ImgContainer>
        <Content>
          <Label>
            <p>User Id</p>
            <p>Name</p>
            <p>Mobile</p>
            <p>Address</p>
            <p>profile created</p>
          </Label>
          <Answers>
            <p>{user.userId}</p>
            <p>{user.firstName+" "+user.lastName}</p>
            <p>{user.mobile}</p>
            <p>{user.address}</p>
            <p>{formatDate(user.createdAt)}</p>
          </Answers>
        </Content>
      </Container>
    }

  return (
      <ProfileContaier>
      <Navbar/>
        <div className='content'>
          {boxinEdit}
          {box}

        </div>
      </ProfileContaier>
  )
}

const ProfileContaier = styled.div`
  position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
  .content{
    display: flex;
    justify-content: center;
  }
`;

const Container = styled.div`
  position: relative;
  top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 450px;
  background-color: white;
  box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
  border-radius: 10px;

`;

const ImgContainer = styled.div`
  position: relative;
  top: -10px;
  display: flex;
  align-items: center;
  img{
    position: relative;
    left: -20px;
    height: 100px;
    width: 100px;
    border: 2px solid #53e3a6;
    border-radius: 50%;
    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
  }
  .img{
    display: flex;
    flex-direction: column;
    width: 100px;
    input{
      position: relative;
      width: 150px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  position: relative;
  left: 0px;
  padding: 10px;
`;

const Answers = styled.div`
  position: relative;
  left: 20px;
  padding: 11px;

  div{
    padding: 5px;
  }

`;
export default Profile
