import {userServices,productsService} from '../services/services.js'
import MailingService from '../mailService/mail.service.js'
import Dtemplates from '../constants/Dtemplates.js'
import config from '../config.js'

const urlDocs= config.multerDocsUrl.multerDocsUrl

const getAllUsers= async (req,res)=>{
    try{
       
        const users= await userServices.getUsers()
        req.io.emit('getAllUsers',users)
        res.send({status:'success', payload:users})
     }
     catch(error){
         console.log(error)
    }
}

const getUser= async(req,res)=>{
    try{
        const {alias}=req.body
        const user = await userServices.getUserById('alias', alias)
        res.send({status:'success', payload: user})
  
 }
 catch(error){
    console.log(error)
}
 }

const getAuthToken = async(req,res)=>{
    if(req.user){
      return  console.log(req.user)
    }
    else{
        console.log('no hay req.user')
    }
    res.send({status:'success'})
}

 const getUserProfile= async(req,res)=>{
    try{
        if(!req.user){
            res.send({status:'error', error:'No hay token de usuario aún'})
        }
       else{
        const uid= req.user.id
        const user = await userServices.getUserById(uid)
        req.io.emit('getRealTimeUserProfile',user)
        res.send({status:'success', payload: user})
    
       }
    }
    catch(error){
        console.log(error)
    }
}

const putUser = async (req, res) => {
    try {
        const uid= req.user.id
     
        const userDb= await userServices.getUserById(uid)
        const newDataUser = {
            first_name: req.body.first_name || userDb.first_name,
            last_name: req.body.last_name || userDb.last_name,
            alias: req.body.alias || userDb.alias,
            email: req.body.email || userDb.email,
           
        }
        const result = await userServices.updateUser(uid,newDataUser)
        const user = await userServices.getUserById(uid)
        req.io.emit('getRealTimeUserProfile',user)
        const users= await userServices.getUsers()
        req.io.emit('getAllUsers',users)
        res.send({ status: "success" })
    } catch (error) {
        console.log(error)
    }
};

const deleteUser=async(req,res)=>{
    try{
        const uid= req.user.id
        const cid= req.user.cart[0]._id

       const userProducts= await productsService.getProductsByOwnerEmail(req.user.email)
       const productsIds=[]
       const filterPIds= userProducts.map((p)=>{
        productsIds.push(p._id)
       })
      const deleteProducts= await productsService.deleteLisProductsToIds(productsIds)
       const username= `${user.first_name} ${user.last_name}`
       const userEmail= user.email
        const mailingService= new MailingService()
        const sendEmail= await mailingService.sendMail(userEmail, Dtemplates.DELETE_USER,username)

        const result= await userServices.deleteUser(uid)
        const users= await userServices.getUsers()
        req.io.emit('getAllUsers',users)
        res.send({status:'success'})
        }
        catch(error){
            console.log(error)
        }
}
/*
Para poner en mongo cuando tenga ngrok
exports = async function() {
 const today= new Date()
 const collection= context.services.get('ClusterTrinidad').db('ecommerce').collection('users')
 const result = await collection.find({expiration:{'$lte': today} }).toArray()
 //console.log(JSON.stringify(result))
const reponse = context.http.post({
    url: url de ngrok o la del hosteo /api/users/deleteInactiveUser,
    body: JSON.stringify(result),
    headers:{
        'Content-Type': ['application/json']
    }
})
 return response
};

 */
const deleteInactiveUser= async(req,res)=>{
    const user= req.body
    console.log(user)
    const mailingService= new MailingService()
    const sendEmail= await mailingService.sendMail(user.email, Dtemplates.CIERRE_CUENTA_INACTIVA)
    const result= await userServices.deleteUser(user._id)
    res.send({status:'success', message:'Cuenta eliminada'})
}




 const postPremiumDocuments = async (req, res) => {
    const indentificacion=  req.files['identificacion'][0].filename
    const comprobanteDomicilio= req.files['comprobanteDomicilio'][0].filename
    const comprobanteCuenta= req.files['comprobanteEstadoCuenta'][0].filename
    const documnments=[
        {
            name: 'Identificación',
            reference: `${urlDocs}/${indentificacion}?folder=documents`
        },
        {
            name: 'Comprobante de domicilio',
            reference: `${urlDocs}/${comprobanteDomicilio}?folder=documents`
        },
        {
            name: 'Comprobante de Estado de cuenta',
            reference: `${urlDocs}/${comprobanteCuenta}?folder=documents`
        }
    ]
    const response= await userServices.updateUserBy('email',req.user.email,{'documents': [...documnments]})
    res.send({ status: 'success' });
  };

  const postImgProfile = async (req, res) => {
    try{const uid= req.user.id
        const urlDeploy= 'https://ccx-server.onrender.com'
       const filename= req.file.filename
       const imgProfile= `${urlDeploy}/api/documents/${req.file.filename}?folder=profile`
       const response= await userServices.updateUserBy('email',req.user.email,{'imgProfile':imgProfile})
       const users= await userServices.getUsers()
        req.io.emit('getAllUsers',users)
        const user = await userServices.getUserById(uid)
        req.io.emit('getRealTimeUserProfile',user)
       res.send({ status: 'success' })
    }
    catch(error){
    console.log(error)
    }
  }


export default{
    getAllUsers,
    putUser,
    deleteUser,
    getUser,
    postPremiumDocuments,
    postImgProfile,
    deleteInactiveUser,
    getUserProfile,
    getAuthToken
}