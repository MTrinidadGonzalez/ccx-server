import { userServices} from '../services/services.js'
import usersControllers from '../controllers/users.controllers.js'
import RouterPadre from '../routers/router.js'
import {documentsUploader} from '../middlewares/multer.middleware.js'
import {imgProfileUploader} from '../middlewares/multer.middleware.js'
import sessionControllers from '../controllers/session.controllers.js'
import {passportCall} from '../utils.js'

export default class UserRouter extends RouterPadre{
    init(){
        this.get('/', ["PUBLIC"],usersControllers.getAllUsers)
        this.get('/profile', ["PUBLIC"],usersControllers.getUserProfile)
        this.get('/authToken', ['PUBLIC'], usersControllers.getAuthToken)
        this.post('/user', ["PUBLIC"], usersControllers.getUser)
       
        this.post('/register',["PUBLIC"],passportCall('register',{strategyType:'locals'}),sessionControllers.registerUser)
        this.post('/login',["PUBLIC","NO_AUTH", "ADMIN"],passportCall('login',{strategyType:'locals'}),sessionControllers.loginUser)
        this.get('/cerrarsession', ["ADMIN", "USER","PREMIUM"],sessionControllers.cerrarsession)
    
        this.put('/updateUser', ["USER","PREMIUM","ADMIN"], usersControllers.putUser)
        this.delete('/:uid',["USER","PREMIUM","ADMIN"],usersControllers.deleteUser )

        this.post('/emailToSendNewPsw', ["PUBLIC"], sessionControllers.emailToSendNewPsw)
        this.post('/newPassword',["PUBLIC"], sessionControllers.newPassword )

        this.get('/convertToPremium', ["USER","PREMIUM"], sessionControllers.convertToPremium)
        this.post('/postPremiumDocuments', ["USER","ADMIN","PREMIUM"],documentsUploader,usersControllers.postPremiumDocuments)
        this.get('/revertPremium', ["USER","PREMIUM"], sessionControllers.revertPremium)

      
        this.post('/postImgProfile', ["USER","ADMIN","PREMIUM"],imgProfileUploader,usersControllers.postImgProfile)
      
        this.post('/deleteInactiveUser', ["PUBLIC"], usersControllers.deleteInactiveUser)
    }//cierre del init
}//cierre de la clase