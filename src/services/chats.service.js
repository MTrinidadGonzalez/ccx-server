
export default class ChatsServices{
    constructor(dao){
        this.dao= dao
    }

    getChatById=(chatId)=>{
      return this.dao.getChatById(chatId)
    }

    getChatByOwners = (email1, email2) => {
        return this.dao.getChatByOwners(email1,email2)
    }

    getChatByOwnersId = (ownerId1, ownerId2) => {
      return this.dao.getChatByOwnersId(ownerId1, ownerId2)
    }

    createChatAndSendFirstMessage = async (ownerIds, content, messageOwnerId) => {
      return this.dao.createChatAndSendFirstMessage(ownerIds, content, messageOwnerId)
    }

    getUserChats = (ownerId) => {
        return this.dao.getUserChats(ownerId);
      }

      addMessageToChat=(chat, owner, messageContent)=>{
        return this.dao.addMessageToChat(chat, owner, messageContent)
      }

      addMessageToChatById= (chatId, owner, messageContent) =>{
        return this.dao.addMessageToChatById(chatId, owner, messageContent)
      }

      addMessageToChatByOwners=(userEmail, userProductEmail, owner, messageContent)=>{
        return this.dao.addMessageToChatByOwners(userEmail, userProductEmail, owner, messageContent)
      }

      deleteChatMessage=(chatId,messageID)=>{
       return this.dao.deleteChatMessage(chatId,messageID)
       } 

       findChatByIdandSendMessage=(chatId,ownerMssg,content)=>{
        return this.dao.findChatByIdandSendMessage(chatId,ownerMssg,content)
       }
}