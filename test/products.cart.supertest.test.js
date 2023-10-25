import chai from 'chai'
import supertest from 'supertest'


const expect= chai.expect
const requester= supertest('http://localhost:8080')

describe('Supertest de productos y carrito', async function(){
    describe('Test integral productos',async function(){

        it('Endpoint /api/products GET debe traer los productos de la base de datos',async function(){
            const response= await requester.get('/api/products').timeout(8000)
            expect(response.status).to.be.equal(200) 
        })//cierre get all products

        it('Endpoint /api/products/:pid GET debe traer un producto de la base de datos',async function(){
            const pid= '64a9eae6485bb32648bf0b93'
            const response= await requester.get(`/api/products/${pid}`).timeout(8000)
            expect(response.status).to.be.equal(200) 
        })//cierre get product
       
        it('Endpoint /api/products/newproduct POST debe crear un producto y registrarlo la base de datos',async function(){
            //sol esta como premium
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
            const product= {
                title:"Choker",
                description:"Gargantilla negra con dijes",
                price:2700,
                category:"accesorios",
                stock:10,
                code:"choker123",
                img:'https://i.pinimg.com/564x/59/c0/6b/59c06b4b226fbcf4a7faefb76802225d.jpg'               
            }      
            const response= await requester.post('/api/products/newproduct').set('Cookie',[`${cookie.name}=${cookie.value}`]).send(product).timeout(8000)          
            expect(response.status).to.be.equal(200)  
        })//cierre create newproduct
        it('Endpoint /api/products PUT, modificar un producto', async function(){
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
            const pid='64f3ef769aab1fecdb4b8647'                    
            const product= {
                title:"Choker modificada",
                description:"Gargantilla negra con dijes",
                price:2700,
                category:"accesorios",
                stock:10,
                code:"choker123",
                img:'https://i.pinimg.com/564x/59/c0/6b/59c06b4b226fbcf4a7faefb76802225d.jpg'               
            }      
            const response= await requester.post(`/api/products/${pid}`).set('Cookie',[`${cookie.name}=${cookie.value}`]).send(product).timeout(8000)          
            expect(response.status).to.be.equal(200)  
        })//cierre modificar product

        it('Endpoint api/products/addProductTocart, agregar un producto al carrito',async function(){
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
            const data = {
                productId:'64a9eae6485bb32648bf0b86',
                spamQuantity: 2
                }    
           
            const response= await requester.post('/api/products/addProductTocart').set('Cookie',[`${cookie.name}=${cookie.value}`]).send(data).timeout(8000)          
            expect(response.status).to.be.equal(200)            
        })


    })//cierre describe products /api/products

    describe('Testing integral de carrito', async function(){
        it('Endpoint /api/cart/ GET, debe regresar el carrito del usuario', async function(){
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
            const response= await requester.get('/api/cart').set('Cookie',[`${cookie.name}=${cookie.value}`]).timeout(8000)          
            expect(response.status).to.be.equal(200)  
        })//cierre cget user cart

        it('Endpoin api/cart/deleteproductcart POST debe borrar un producto del carrito', async function(){
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
            const data = {
                pid:'64a9eae6485bb32648bf0b86'
                }    
           
            const response= await requester.post('/api/cart/deleteproductcart').set('Cookie',[`${cookie.name}=${cookie.value}`]).send(data).timeout(8000)          
            expect(response.status).to.be.equal(200)            
        })//cierre de deleteproduct cart

        it('Endpoint /api/cart/clearCart POST, debe vaciar el carrito', async function(){
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
            const data = {
                cid:'64f2386988945b3f37fd8c47'
                }    
           
            const response= await requester.post('/api/cart/clearCart').set('Cookie',[`${cookie.name}=${cookie.value}`]).send(data).timeout(8000)          
            expect(response.status).to.be.equal(200)
        })

    })//cierre decribe carrtio




})//cierre de todos los describes 