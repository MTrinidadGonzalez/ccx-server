import chai from 'chai'
import supertest from 'supertest'

const requester= supertest('http://localhost:8080')



//ver si puedo oner la cookie en el this

describe('Test de prueba', async function(){
    before(async function(){      
        this.userDAO= userServices
        const user={
            email: "paloma@gmail.com",
            password:"12345",                                        
        }
        const login= await requester.post('/api/session/login').send(user).timeout(8000)
        const cookieresult= login.headers['set-cookie'][0]
        this.cookie={
            name: cookieresult.split("=")[0],
            value:cookieresult.split("=")[1],
        }   
    })

    describe('pruebo cooki', async function(){
        console.log(this.cookie)
    })

})