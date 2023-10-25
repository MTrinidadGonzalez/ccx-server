import {chatsService,productsService,userServices} from '../services/services.js'

const requestProduct=async(req,res)=>{
  try{
    const {pid}=req.params
    const productDb=await productsService.getProductById(pid)
    const content=`
    ${req.user.name} dice:\n
    Hola, me interesa el producto:\n
    Descripción: ${productDb.description},\n
    Precio: ${productDb.price},\n
    Categoría: ${productDb.category},\n
    Color: ${productDb.color},\n
    Talle: ${productDb.talle}\n
    Quedo atentx a tu respuesta, gracias!
  `;
    const ownerProductEmail= productDb.owner
    const ownerProduct= await userServices.getUser('email',ownerProductEmail)
    const userID= req.user.id 
    
    const oenwersIds= [userID,ownerProduct._id]
    const existChat= await chatsService.getChatByOwnersId(userID,ownerProduct._id)

    if(!existChat){
      const createChat= await chatsService.createChatAndSendFirstMessage(oenwersIds,content, userID)
      const chatID = createChat._id
      console.log('chatID si no axitia antes el chat:', chatID)
      return res.send({status:'success',chatID:chatID})
    }
    else{
      const chatID= existChat._id
      console.log('chatID si ya existe el chat:', chatID)
      const sendMsj= await chatsService.addMessageToChatById(existChat._id,userID,content)
     return res.send({status:'success', chatID:chatID })
    }
 
 
  }
  catch(error){
    console.log(error)
  }
}



const getUserChats = async (req, res) => {
  try {
    const userId=req.user.id
    const chats = await chatsService.getUserChats(userId); 
    const infoChats = [];

    chats.forEach((chat) => {
      let opositOwnerInfo = null; 
      chat.owners.forEach((owner) => {
        if (owner.email !== req.user.email) {
          opositOwnerInfo = {
            first_name: owner.first_name,
            last_name: owner.last_name,
            imgProfile: owner.imgProfile,
          };
        }
      });
      if (opositOwnerInfo) {
        const chatInfo = {
          id: chat.id,
          opositOwner: opositOwnerInfo,
        };
        infoChats.push(chatInfo); 
      }
    });
    req.io.emit('getRealTimeUserChats',infoChats)
    res.send({ status: 'success' });
 
  } catch (error) {
    console.log(error);
  }
}

const getChat = async (req, res) => {
  try {
    const actualUserId= req.user.id
    const { chatID } = req.params;
    const chat = await chatsService.getChatById(chatID);

    const opositOwnerInfo = chat.owners.find((owner) => owner.email !== req.user.email);
 
    const chatInfo = {
      actualUserId:actualUserId,
      id: chat.id,
      opositOwner: opositOwnerInfo
        ? { email:opositOwnerInfo.email,
            first_name: opositOwnerInfo.first_name,
            last_name: opositOwnerInfo.last_name,
            imgProfile: opositOwnerInfo.imgProfile,
          }
        : null,
      messages: chat.messages, 
    };

    req.io.emit('getRealTimeChat', chatInfo);
    res.send({ status: 'success' });

  } catch (error) {
    console.log(error);
  }
}

const addMessageTochat=async(req,res)=>{
 try{
  const userEmail= req.user.email
  const actualUserId=req.user.id
 const{message,chatId}=req.body
 const content=`
 ${req.user.name} dice:\n
 ${message}
`;
const msjAdd= await chatsService.findChatByIdandSendMessage(chatId,actualUserId,content)
const chat= await chatsService.getChatById(chatId)
const opositOwnerInfo = chat.owners.find((owner) => owner.email !== req.user.email);

const chatInfo = {
  actualUserId:actualUserId,
  id: chat.id,
  opositOwner: opositOwnerInfo
    ? { email:opositOwnerInfo.email,
        first_name: opositOwnerInfo.first_name,
        last_name: opositOwnerInfo.last_name,
        imgProfile: opositOwnerInfo.imgProfile,
      }
    : null,
  messages: chat.messages, 
};

req.io.emit('getRealTimeChat', chatInfo);
res.send({ status: 'success' });
}
catch(error){
  console.log(error)
}
}


const deleteMessage=async(req,res)=>{
try{
  const actualUserId= req.user.id
  const {messageId, chatID}=req.body
  const deleteMessage= await chatsService.deleteChatMessage(chatID,messageId)
  const chat= await chatsService.getChatById(chatID)
  const opositOwnerInfo = chat.owners.find((owner) => owner.email !== req.user.email);

const chatInfo = {
  actualUserId:actualUserId,
  id: chat.id,
  opositOwner: opositOwnerInfo
    ? { email:opositOwnerInfo.email,
        first_name: opositOwnerInfo.first_name,
        last_name: opositOwnerInfo.last_name,
        imgProfile: opositOwnerInfo.imgProfile,
      }
    : null,
  messages: chat.messages, 
};

req.io.emit('getRealTimeChat', chatInfo);
  res.send({status:'success'})
}
catch(error){
  console.log(error)
}
}

export default{
    requestProduct,
    getUserChats,
    addMessageTochat,
    getChat,
    deleteMessage
}