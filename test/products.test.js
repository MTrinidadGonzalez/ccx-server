import mongoose from 'mongoose'
import { expect } from 'chai'
import config from '../src/config.js'
import {productsService} from '../src/services/services.js'

mongoose.connect(config.mongo.URL_TEST)



describe('Test de DAO y manejo de crud productos',function (){
    
    this.timeout(8000)
   
    before( function(){      
        this.productsDAO= productsService
    })
   /* beforeEach(function(){     
      mongoose.connection.collections.users.drop()
    })*/

   it('Debe crear y registrar un producto en la base de datos',async function(){
        const newProduct={
            title:"Title nuevo producto",
            description:"Descripción del producto",
            price:3000,
            category:"accesorios",
            code:"1lakskv",
            owner:"zara@correo"
        }
        const result= await this.productsDAO.createProduct(newProduct)
        expect(result).to.have.property('_id')
     
    }) 

    it('Debe traer un producto de la base de datos, buscado por su propiedad "owner"(dueño)',async function(){
        const email= "zara@correo"
        const result= await this.productsDAO.getProductsByOwnerEmail(email)
        expect(result[0].owner).to.be.equal('zara@correo')
       
    })

   it('Debe modificar el producto del owner(dueño) en la db ',async function(){
      const email= "zara@correo"
      const found= await this.productsDAO.getProductsByOwnerEmail(email)
      const pid= found[0]._id
      const newProduct={
        title:"Title nuevo producto",
        description:"Descripción del producto",
        price:3000,
        category:"accesorios",
        code:"1lakskv",
        owner:"zara@correo"
    }
    const result= await this.productsDAO.updateProduct(pid,newProduct)
    expect(result).to.be.ok   
    })
    

   it('Debe eliminar un producto en la db buscado por su id ',async function(){
    const email= "zara@correo"
    const found= await this.productsDAO.getProductsByOwnerEmail(email)
    const pid= found[0]._id
    const result= await this.productsDAO.deleteProduct(pid)
    expect(result).to.be.ok  
     
    })

})//cierre de todos los describes