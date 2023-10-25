import chai from 'chai'
import { response } from 'express'
import supertest from 'supertest'


const expect= chai.expect
const requester= supertest('http://localhost:8080')


describe('Supertes de sesiones y usuarios CoderHose', async function(){

   describe('Test integral majeno de session', async function(){
      
    it('End point POST, registro de usuario', async function(){
        const user={
            first_name:"Sol",
            last_name:"Selei",
            email: "sol@gmail.com",
            password:"12345",                                        
            }
        const {status}= await requester.post('/api/session/register').send(user) 
        expect(status).to.be.equal(200)
        })//cierre register
     

    it('End point POST, login de usuario, debe devolver el token de login', async function(){
        const user={
            email: "sol@gmail.com",
            password:"12345",                                        
            }
        const response= await requester.post('/api/session/login').send(user)
        const cookieresult= response.headers['set-cookie'][0]
        const cookie={
                name: cookieresult.split("=")[0],
                value:cookieresult.split("=")[1],
            } 
        expect(cookie.name).to.be.ok.and.eql('authToken')
        expect(cookie.value).to.be.ok
        
        })//cierre login

    it('End point POST, debe convertir el rol del usuario a PREMIUM', async function(){
        const user={
            email: "sol@gmail.com",
            password:"12345",                                        
            }
        const login= await requester.post('/api/session/login').send(user).timeout(8000)
        const cookieresult= login.headers['set-cookie'][0]
        const cookie={
            name: cookieresult.split("=")[0],
            value:cookieresult.split("=")[1],
            }                      
        const userFound= await requester.post('/api/users/user').send({email:"sol@gmail.com"}).timeout(8000)
        const userId= userFound.body.payload._id
        console.log(userId)
        const response= await requester.post('/api/session/convertToPremium').set('Cookie',[`${cookie.name}=${cookie.value}`]).send({userId}).timeout(8000)
        expect(response.status).to.be.equal(200)  
        })//cierre convert to premium

    it('End point POST, debe convertir el rol del usuario a USER', async function(){
        const user={
            email: "sol@gmail.com",
            password:"12345",                                        
            }
        const login= await requester.post('/api/session/login').send(user).timeout(8000)
        const cookieresult= login.headers['set-cookie'][0]
        const cookie={
            name: cookieresult.split("=")[0],
            value:cookieresult.split("=")[1],
            }                      
        const userFound= await requester.post('/api/users/user').send({email:"sol@gmail.com"}).timeout(8000)
        const userId= userFound.body.payload._id
        console.log(userId)
        const response= await requester.post('/api/session/revertPremium').set('Cookie',[`${cookie.name}=${cookie.value}`]).send({userId}).timeout(8000)
        expect(response.status).to.be.equal(200)  
        })//cierre convert to user (revert premium)


        
    it('End point POST, debe enviar un correo para restaurar la contraseña', async function(){
        const email= 'mtgprimaria@gmail.com'
        const response= await requester.post('/api/session/restoreRequest').send({email}).timeout(8000)
        expect(response.status).to.be.equal(200)  
        })//cierre convert to user (revert premium)

   })//cierre api/sessions

    
describe('Test integral manejo de usuario', async function(){

   it('Endpoint PUT /api/users, modifica un usuario',async function(){
        const user={
            email: "sol@gmail.com",
            password:"12345",                                        
        }
        const login= await requester.post('/api/session/login').send(user).timeout(8000)
        const cookieresult= login.headers['set-cookie'][0]
        const cookie={
            name: cookieresult.split("=")[0],
            value:cookieresult.split("=")[1],
        }                      
        const newuser={
            first_name:"Sol cambio",
            last_name:"Seleil",
                                                 
        }
        const response= await requester.put('/api/users').set('Cookie',[`${cookie.name}=${cookie.value}`]).send(newuser).timeout(8000)
        expect(response.status).to.be.equal(200)  
    })//cierre de update user

    it('Endpoint DELETE /api/users, elimina un usuario',async function(){
        const user={
            email: "paloma@gmail.com",
            password:"12345",                                        
        }
        const login= await requester.post('/api/session/login').send(user).timeout(8000)
        const cookieresult= login.headers['set-cookie'][0]
        const cookie={
            name: cookieresult.split("=")[0],
            value:cookieresult.split("=")[1],
        }                      
        const response= await requester.delete('/api/users').set('Cookie',[`${cookie.name}=${cookie.value}`]).timeout(8000)     
         expect(response.status).to.be.equal(200)  
    })//cierre de update user


})//cierre api/users
       
     

})//cierre de todos los describe






