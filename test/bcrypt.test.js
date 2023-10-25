import mongoose from 'mongoose'
import { expect } from 'chai'
import config from '../src/config.js'
import {createHash, validatePassword} from '.././src/utils.js'

mongoose.connect(config.mongo.URL_TEST)

describe('Test de encriptación de contraseña-bcrypt',function(){
    this.timeout(8000)

  /*  it('Debe encriptar un string pasado utilizando bcrypt',async function(){
        const password='12345'
        const hash= await createHash(password)
     //   expect(```/^[$]2[abxy]?[$](?:0[4-9]|[12][0-9]|3[01])[$][./0-9a-zA-Z]{53}$/```.test(hash))
        expect(/(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/.test(hash))
    })*/

    it('Test de comparación de contraseña que ingresa y contraseña encriptada',async function(){
        const password='12345'
        const hash= await createHash(password)
        const isValidPsw= await validatePassword(password,hash)
        expect(isValidPsw).to.be.ok.and.to.be.equal(true)
       
    })

})//final de todas


