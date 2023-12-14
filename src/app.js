import express  from "express"; 
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import handlebars from 'express-handlebars'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from "swagger-ui-express";
import cors from 'cors'

import config from  './config.js'
import passportStrategies from './config/passport.config.js'
import UserRouter from "./routers/user.router.js";

import ProductRouter from './routers/products.router.js'

import moksRouter from '../src/moks/routermoks/moks.products.router.js'
import loggerRouter from './routers/loggerRouter/logger.router.js'
import EmailRouter from './routers/email.router.js'
//import DocumentsRouter from './routers/documents.router.js'
import documentsRouter from '../src/routers/documents.router.js'

import ChatsRoute from './routers/chats.routers.js'

import { Server } from 'socket.io'
import attachLogger from './middlewares/logger.middleware.js'
import errorHandler from './middlewares/errorMiddlewares.js'
import __dirname from './utils.js'

const app= express()

app.use(attachLogger)
const port =config.app.PORT


app.use(cors(
    {
        origin: true,
       // origin:'https://ccx-client.onrender.com',
        credentials: true,
        methods: ['GET', 'POST','PUT','DELETE']
    }
))

const connection= mongoose.connect(config.mongo.URL)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`${__dirname}/public`))

const server= app.listen(port, ()=> console.log(`listening on ${port} - ${config.mode.mode}`))
const io  = new Server(server,{
    cors:{
        origin: 'https://ccx-client.onrender.com',
        methods: ["GET", "POST","PUT","DELETE"]
    }
})
app.use((req,res,next)=>{
   
    req.io = io;
    next();
})
io.on('connection', socket =>{
  //  console.log("Nuevo cliente conectado");
   
})


//handlebars
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars')

passportStrategies()



//Estrategia para documentación con swagger:
const swaggerOptions={
    definition:{
        openapi: '3.0.1',
        info:{
            title: 'Tienda nube',
            description: 'Documentación de api ecommerce, MERN'
        }
    },
    apis: [ `${__dirname}/./docs/**/*.yaml`]
}

const specifications= swaggerJSDoc(swaggerOptions)
app.use('/docs' , swaggerUiExpress.serve, swaggerUiExpress.setup(specifications))



//rutas
//const documentsRouter= new DocumentsRouter()
//app.use('/api/documents', documentsRouter.getRouter())
app.use('/api/documents', documentsRouter)
app.use('/', loggerRouter)
const userRouter= new UserRouter()
app.use('/api/users', userRouter.getRouter())
const chatsRouter= new ChatsRoute()
app.use('/api/chats', chatsRouter.getRouter())
const productsRouter= new ProductRouter()
app.use('/api/products', productsRouter.getRouter())

const emailRouter= new EmailRouter()
app.use('/api/email', emailRouter.getRouter())



app.use(errorHandler)








