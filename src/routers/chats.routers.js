import RouterPadre from './router.js'
import chatsControllers from '../controllers/chats.controllers.js'
export default class ChatsRoute extends RouterPadre{
    init(){
     
        this.get('/requesPrduct/:pid',["PUBLIC"],chatsControllers.requestProduct)
      
        this.get('/userChats',['PUBLIC'],chatsControllers.getUserChats)

        this.get('/getChat/:chatID', ['PUBLIC'],chatsControllers.getChat)
        this.post('/addMssChat',["PUBLIC","ADMIN","PREMIUM","USER"],chatsControllers.addMessageTochat)
        this.post('/deleteMessage', ['PUBLIC'],chatsControllers.deleteMessage )
   
    }//cierre del init

}