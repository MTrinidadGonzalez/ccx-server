import mongoose from 'mongoose'
import { expect } from 'chai'
import config from '../src/config.js'

import {userServices} from '../src/services/services.js'

mongoose.connect(config.mongo.URL_TEST)


describe('Test de DAO y manejo de crud y rol de usuarios',function (){
    
    this.timeout(8000)
   
    before( function(){      
        this.userDAO= userServices
    })
   /* beforeEach(function(){     
      mongoose.connection.collections.users.drop()
    })*/

    it('Debe crear y registrar un usuario en la base de datos',async function(){
        const newUser={
            first_name:"Usuario Nombre",
            last_name:"Usuario Apellido",
            email:"lala@correo",
            password:"12345",
        }
        const result= await this.userDAO.createUser(newUser)
        expect(result).to.have.property('_id')
     
    }) 

    it('Debe modificar un usuario buscado por cualquiera de sus propiedades en la db ',async function(){
        const newUser={
            first_name:"Nombre Modificado",
            last_name:"ApellidoModificado",
            email:"lala@correo",
            password:"12345",
        }
        const userUpdate= await this.userDAO.updateUserBy('email',"lala@correo",newUser )
        const result= await this.userDAO.getUser('email',"lala@correo")
        expect(result.last_name).to.be.equal('ApellidoModificado')
     
    })

    it('Debe modificar el rol del usuario en la db ',async function(){
        const user= await this.userDAO.getUser('email',"lala@correo")
        const result= await this.userDAO.uptateUserRole(user._id,"PREMIUM")
        expect(result.role).to.be.equal('PREMIUM')
     
    })

    it('Debe eliminar el usuario en la db ',async function(){
        const user= await this.userDAO.getUser('email',"lala@correo")
        const result= await this.userDAO.deleteUser(user._id)
        expect(result).to.be.ok
     
    })

})//cierre de todos los describes