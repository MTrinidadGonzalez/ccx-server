import RouterPadre from '../routers/router.js'
import { productsService} from '../services/services.js'
import productsControllers from '../controllers/products.controllers.js'
import uploader from '../services/multerServices/uploader.js'
import {productsUploader} from  '../middlewares/multer.middleware.js'

export default class ProductRouter extends RouterPadre{
    init(){

        this.get('/',["PUBLIC"],productsControllers.getProducts)      
        this.get('/:pid', ["PUBLIC"],productsControllers.getProduct )

        this.post('/newproduct',["PUBLIC","ADMIN","PREMIUM","USER"],productsUploader,productsControllers.postProduct)
        this.put('/',["PUBLIC","ADMIN", "PREMIUM","USER"],productsControllers.putProduct )
        this.delete('/deleteProduct/:pid',["PUBLIC","USER","PREMIUM","ADMIN"],productsControllers.deleteProduct)
       
        this.put('/updateProduct',["PUBLIC","ADMIN","USER","PREMIUM"], productsControllers.putProduct)
        this.post('/updateProductImg', ["PUBLIC","ADMIN", "USER","PREMIUM"],productsUploader,productsControllers.updateProductImg)

       
    //esto es para cargarlos todos de una para mi
        this.post('/cargomuchos', ["PUBLIC"], async (req,res)=>{
        try{
        const products= req.body
        const result= await productsService.createProducts(products)
        res.send({status:"success", message:"productos agregados", payload: result})
        }
        catch(error){
        console.log(error)
       }
    })



    }//cierre del init
}