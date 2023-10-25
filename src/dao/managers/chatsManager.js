import chatsModel from '../models/chatsModel.js'
export default class CahtsManager{


    getChatByOwners = (email1, email2) => {
        return chatsModel.findOne({
            $and: [
                { 'owners.email': email1 },
                { 'owners.email': email2 }
            ]
        });
    }

    getChatByOwnersId = (ownerId1, ownerId2) => {
      return chatsModel.findOne({
        $and: [
          { 'owners': ownerId1 },
          { 'owners': ownerId2 }
        ]
      });
    }

    getUserChats = (ownerId) => {
      return chatsModel
        .find({ 'owners': ownerId })
        .populate('owners')
        .exec();
    }

      getChatById=(chatId)=>{
        return chatsModel.findById(chatId).populate('owners').exec();
      }


    createChatAndSendFirstMessage = async (ownerIds, content, messageOwnerId) => {
      try {
        console.log('enmanagerCreatechat parametros', ownerIds, content, messageOwnerId);
        const chat = new chatsModel({
          owners:ownerIds,
          messages: content
            ? [
                {
                  content,
                  fecha: new Date(),
                  owner: messageOwnerId,
                },
              ]
            : [],
        });
    
        return chat.save();
      } catch (error) {
        console.log(error);
      }
    };
   
 

      addMessageToChat = async (chat, owner, messageContent) => {
        try {
          const newMessage = {
            owner,
            content: messageContent,
            fecha: new Date()
          };
      
          chat.messages.push(newMessage);
          await chat.save();
        } catch (error) {
          console.error('Error al agregar el mensaje al chat:', error);
        }
      };

      findChatByIdandSendMessage=async(chatId,ownerMssg,content)=>{
      try{
        const chat=await chatsModel.findById(chatId)
        const newMessage = {
         owner:ownerMssg,
         content: content,
         fecha: new Date()
       };
       chat.messages.push(newMessage);
       await chat.save();

      }
      catch(error){
        console.log(error)
      }
      }
      

      addMessageToChatByOwners = async (userEmail, userProductEmail, owner, messageContent) => {
        try {
          const chatDb = await chatsModel.findOne({
            $and: [
              { 'owners.email': userEmail },
              { 'owners.email': userProductEmail }
            ]
          });
      
          if (!chatDb) {
            console.log('Chat no encontrado');
            return;
          }
          const newMessage = {
            owner,
            content: messageContent,
            fecha: new Date()
          };
      
          chatDb.messages.push(newMessage);
          await chatDb.save();

        } catch (error) {
          console.error('Error al agregar el mensaje al chat:', error);
        }
      };

      addMessageToChatById = async (chatId, owner, messageContent) => {
        try {
          const chatDb = await chatsModel.findById(chatId);
          if (!chatDb) {
            console.log('Chat no encontrado');
            return;
          }
          const newMessage = {
            owner,
            content: messageContent,
            fecha: new Date()
          };
          chatDb.messages.push(newMessage);
          await chatDb.save();
      
          console.log('Mensaje agregado con éxito al chat.');
        } catch (error) {
          console.error('Error al agregar el mensaje al chat:', error);
        }
      };

     
     deleteChatMessage=async(chatId,messageID)=>{
      const chatDb = await chatsModel.findById(chatId);
      const messages= chatDb.messages
      const messageIndex= messages.findIndex(message => message._id.equals(messageID))
      
      chatDb.messages.splice(messageIndex, 1)
      await chatDb.save()
     
     }      

    
      
   
}