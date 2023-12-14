import { productsService} from '../services/services.js'
import ErrorsService from '../services/ErrorServices/error.services.js'
import {productsErrorIncompleteValues, productsExistYet} from '../constants/productsErrors.js'
import {DictionaryEErrorProducts} from '../constants/EErors.js'
import MailingService from '../mailService/mail.service.js'
import Dtemplates from '../constants/Dtemplates.js'
import config from '../config.js'

const urlDocs= config.multerDocsUrl.multerDocsUrl

const getProducts=async(req,res)=>{
    try{
        const products= await productsService.getProducts()
        req.io.emit('getRealTimeProducts',products)
        res.send({status: "success", payload:products})
    }
    catch(error){
        console.log('Error catch get products:', error)
    }
}


const getProduct= async(req,res)=>{
    try{
        const {pid}=req.params
        const product= await productsService.getProductById(pid)
        res.send({status:'success', payload: product})
    }
    catch(error){
        console.log('Error catch get product:', error)
    }
}

const postProduct= async(req,res)=>{
    try{

        const useremail= req.user.email 
        const{title,description,price,category,talle,color}=req.body
         if(!title || !description || !price || !category ){
            ErrorsService.createError({
                name:"Error al crear producto",
                cause: productsErrorIncompleteValues({title,description,price}),
                code: DictionaryEErrorProducts.INCOMPLETE_VALUES,
                status:400
            })
        } 
        const urlDeploy= 'https://ccx-server.onrender.com'
       const imgFileName=req.file.filename
        const product= {
            title,
            description,
            price,
            category,
            img: `${urlDeploy}/api/documents/${imgFileName}?folder=products`,
            talle,
            color,
            owner:useremail
        }
       const ceateProduct= await productsService.createProduct(product)
       const products= await productsService.getProducts()
       req.io.emit('getRealTimeProducts',products)

        res.send({status:'success', payload:ceateProduct })        
      
    }
    catch(error){
       console.log('Error catch createProduct:', error)
    }
}

const deleteProduct=async(req,res)=>{
 
    const {pid}= req.params
   // const product= await productsService.getProductById(pid)
    //const email= product.owner
   // const productDescription = product.description
   // const mailingService= new MailingService()
   // const result= await mailingService.sendMail([email,req.user.email,'mtgprimaria@gmail.com'], Dtemplates.DELETE_PRODUCT,productDescription)
    const deleteProduct= await productsService.deleteProduct(pid)
    const products= await productsService.getProducts()
    req.io.emit('getRealTimeProducts',products)
    res.send({status:'success', message: 'Producto eliminado'})
}

const putProduct=async(req,res)=>{
    try{
    
      const pid= req.body.productId
      const productDb=await productsService.getProductById(pid)
      const updatedProduct = {
        title: req.body.title || productDb.title,
        description: req.body.description || productDb.description,
        price: req.body.price || productDb.price,
        category: req.body.category || productDb.category,
        code: req.body.code || productDb.code,
        talle: req.body.talle || productDb.talle,
        color: req.body.color || productDb.color,
        stock: req.body.stock || productDb.stock,
        img:productDb.img 
    }
 
      const updateProduct= await productsService.updateProduct(pid,updatedProduct)
      res.send({status:'success', message:'Producto modificado', payload:updateProduct})
    }
    catch(error) {
        req.logger.error('Error catch updateProduct:', error)
    }
}

const updateProductImg=async (req,res)=>{
  try{
   const {productId}=req.body
   const imgFileName= req.file.filename
   const newImgPath= `${urlDocs}/${imgFileName}?folder=products`
   const update= await productsService.updateProductImage(productId,newImgPath)
    res.send({status:'success'})
  }
  catch(error){
    console.log(error)
  }
}

export default{
    getProducts,
    getProduct,
    postProduct,
    putProduct, 
    deleteProduct,
    updateProductImg
   
}