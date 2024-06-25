const Message = require('../models/MessageModel');

const addMessage = async(req, res)=>{
  try{
    const {userId, message }= req.body;
    const data =new Message({
        userId : userId,
        message: message,
        isSeen: false
    })
    data.save().then(()=> {res.json({message:'MessageAdded'})})
    .catch(()=> {res.json({message: 'errorOccuredInMessageInserting'})})
  }
  catch(e)
  {
    res.json({message: 'Network error'})
  }
}

const getMessage = async (req, res)=> {
  const userId = req.userId;
    try{
      const msgs = await Message.find({userId: userId}).limit(20);
      if(msgs)
      {
        res.json({message:'got', msgs : msgs})
      }
      else
        res.json({message: 'empty'})
    }
    catch(e)
    {
      console.log(e);
      res.json({message:'Network error'})
    }
}

const getUnSeenMessage = async (req, res)=> {
  const userId = req.userId;
    try{
      const msgs = await Message.find({userId: userId, isSeen: false});
      if(msgs)
      {
        res.json({message:'got', msgs : msgs})
      }
      else
        res.json({message: 'empty'})
    }
    catch(e)
    {
      console.log(e);
      res.json({message:'Network error'})
    }
}

const updateSeen = async (req, res) =>{
    const userId = req.userId;
    try{
      await Message.updateMany({ userId: userId }, { $set: { isSeen: true } });
    }
    catch(e)
    {
      console.log(e);
    }
    
}

async function countUnseenMessages(req, res) {
  const userId = req.userId;
  try {
    const count = await Message.countDocuments({userId: userId,  isSeen: false });
    res.json({message:'got', count: count});
  } catch (error) {
    console.error("Error counting unseen messages:", error);
  } 
}

module.exports = { addMessage, getMessage , updateSeen, countUnseenMessages, getUnSeenMessage};