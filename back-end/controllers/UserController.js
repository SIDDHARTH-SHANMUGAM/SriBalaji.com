const User = require('../models/UserModel');
const Counter = require('../models/CounterModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login= async(req, res)=>{
  const{mobile, password}= req.body;
  try{
    const user = await User.findOne({mobile: mobile})
    if(user)
    {
      bcrypt.compare(password, user.password)
        .then(isCorrect=>{
            if(!isCorrect) 
              res.json({message: "Password is Wrong"});
            else
            {
              const token = jwt.sign({
                  userId: user.userId,
                  isAdmin: user.isAdmin,
              }, process.env.JWT_SECRET,{expiresIn: "24h"});
              res.json({message : "Exist" ,token: token });
            }
           })
    }
    else
      res.json({message: "Mobile Not Exist" });
    
  }
  catch(e){
    res.json({message : "Network Error" });
  }
}

const signIn = async(req, res)=> {
  const {firstName, lastName, mobile, address, password}= req.body;
  try{
    let check = await User.findOne({mobile: mobile})
    if(check)
    {
      res.json({message: "mobile is already Exist"});
    }
    else
    {
      let seqId;
      const cd = await Counter.findOneAndUpdate(
        { id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true }
      ).exec();
      if (cd == null) {
          const newVal = new Counter({ id: 'userId', seq: 201600011 });
          await newVal.save();
          seqId = 201600011;
      }
      else {
          seqId = cd.seq;
      }
      bcrypt.hash(password, 10)
      .then((hp) =>{
        const user =new User({
          userId : seqId,
          firstName : firstName,
          lastName : lastName,
          mobile : mobile,
          address: address,
          password: hp,
          isAdmin: 'false'
        })
        user.save().then(()=>{
            const token = jwt.sign({
                userId: user.userId,
                isAdmin: user.isAdmin,
            }, process.env.JWT_SECRET,{expiresIn: "24h"});

            res.json({message: "signedIn", token: token});
        }).catch((e)=>{
            res.json({message: 'error', error: e});
        })
      })
      .catch((e)=>{
        res.json({message: 'error', error: e});
      })
    }
  }
  catch(e){
    console.log(e);
  }
}

const getUser = async(req, res) =>{
    const userId = req.userId;
  try{
    const user = await User.findOne({userId});
    if(user){
      const userObject = user.toObject();
      delete userObject.password;
      res.json({message:'got', user: userObject})
    }
    else
      res.json({message:'usernotfound'})
  }
  catch(e)
  {
    console.log(e)
  }
}

const getUserBy = async(req, res) =>{
    const {value, by} = req.body;
  try{
    if(by ==='userId')
    {
      const user = await User.findOne({userId: value});
      if(user){
        const userObject = user.toObject();
        delete userObject.password;
        res.json({message:'got', user: userObject})
      }
      else
        res.json({message:'usernotfound'})
    }
    else
    {
      const user = await User.findOne({mobile: value});
      if(user){
        const userObject = user.toObject();
        delete userObject.password;
        res.json({message:'got', user: userObject})
      }
      else
        res.json({message:'usernotfound'})

    }
  }
  catch(e)
  {
    console.log(e)
  }
}

const updateProfile = async (req, res) =>{
    try {
      const { firstName, lastName, address, mobile} = req.body ;
      const userId = req.userId;

      console.log(userId, firstName, lastName, address, mobile )
      if (!userId) {
        return res.json({ error: 'User ID is required' });
      }

      await User.findOneAndUpdate(
        { userId: userId },
        { 
          firstName: firstName, 
          lastName: lastName , 
          address: address , 
          mobile: mobile 
        },
        { new: true }
      );
      res.json({ message: 'updated' });
    } catch (error) {
      console.log('Error:', error); 
      res.json({ message: 'Server error' });
    }
}

const isAdmin = async (req, res)=>{
  const userId = req.userId;
  try{
    const user = await User.findOne({userId});
    if(user){
      res.json({message: user.isAdmin})
    }
    else
      res.json({message:'usernotfound'})
  }
  catch(e)
  {
    console.log(e)
  }
}


module.exports= {login, signIn, getUser, updateProfile, isAdmin, getUserBy};