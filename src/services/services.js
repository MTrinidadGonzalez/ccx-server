import UserManager from "../dao/managers/userManager.js";
import UserServices from "./userService.js";

export const userServices= new UserServices(new UserManager)

import ProductsManager from '../dao/managers/productsManager.js'
import ProductsServices from '../services/productsService.js'

export const productsService= new ProductsServices(new ProductsManager)





import ChatsServices from '../services/chats.service.js'
import CahtsManager from '../dao/managers/chatsManager.js'

export const chatsService= new ChatsServices(new CahtsManager)

