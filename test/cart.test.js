import mongoose from 'mongoose'
import { expect } from 'chai'
import config from '../src/config.js'
import {cartsService} from '../src/services/services.js'
import {productsService} from '../src/services/services.js'
mongoose.connect(config.mongo.URL_TEST)



describe('Test de DAO y manejo de crud cart',function (){
    
    this.timeout(9000)
   
    before(function(){      
        this.cartDAO= cartsService
        this.productsDAO= productsService
    })
   /* beforeEach(function(){     
      mongoose.connection.collections.users.drop()
    })*/

/* 
    it('Debe crear un carrito',async function(){
       const result= await cartDAO.createCart()
       expect(result).to.have.property('_id')      
    })

   it('Debe buscar un carrito por su propiedad Id',async function(){
    const result= await this.cartDAO.createCart()
    const cid= result._id
    const resutl= await this.cartDAO.getCartById(cid)
    expect(result._id).to.be.equal(cid)
  
    })
    

   it('Debe agregar un producto al carrito',async function(){
    const cart= await this.cartDAO.createCart()
    const cid= cart._id
    const product={
        pid:'64f0dfb9aa4e47d268e791f7',
        productQuantity:1
    } 
    const action= await this.cartDAO.addProductToCart(cid,product)
    const result= await this.cartDAO.getCartById(cid)
   // console.log('producto agregado',result.products[0])
    expect(result.products[0]._id.toString()).to.be.equal(product.pid)
    })
*/
    it('Debe eliminar un producto al carrito', async function() {
    const cid = '64f0f0232623a1fa7b913572' //  Id del carrito anterior
    const pid = '64f0dfb9aa4e47d268e791f7' // pid  del ítem anterior
    const result = await this.cartDAO.subtractProduct(cid, pid)
    const cart = await this.cartDAO.getCartById(cid)
    const isProductInCart = cart.products.find(product => product._id.toString() === pid)
    expect(isProductInCart).to.not.exist
    })

    it('Debe eliminar todos los productos que se encuentren en la db', async function() {
        const cid = '64f0f0232623a1fa7b913572' //  Id del carrito anterior
        const clear= await this.cartDAO.clearCart(cid)
        const cart= await this.cartDAO.getCartById(cid)
        const result= cart.products
        expect(result).to.be.an('array').that.is.empty
        })

    it('Debe eliminar al carrito de la db', async function() {
        const cid = '64f0f0232623a1fa7b913572' //  Id del carrito anterior
        const restul= await this.cartDAO.deleteCart(cid)
        })
        
})//cierre de todos los describes