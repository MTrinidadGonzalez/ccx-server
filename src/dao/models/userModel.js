import mongoose from "mongoose";

const collection= 'Users'
const schema= new mongoose.Schema({
   
    imgProfile:{
        type:String,
        default:'https://i.pinimg.com/564x/3b/94/6e/3b946eb954f03a7eb2bbe6bfa02a22be.jpg'
    },
    first_name: String, 
    last_name: String,
    alias:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require: true,
        unique:true
    },   
    role:{
        type:String,
        enum:['ADMIN', 'USER', 'PREMIUM'],
        default: 'USER'
    },
    documents:[
        {
            name:String,
            reference: String
        }
    ],
    zona:{
        type:String,
        default:'Patio Olmos',
        enum: ['Paseo Rivera Shopping', 'Shopping Nuevo Centro', 'Cordoba Shopping', 'Dinosaurio Mall Ruta20','Patio Olmos']
    },
    last_conection:Date,
    expiration: Date,
   
})
      
const userModel= mongoose.model(collection, schema)
export default userModel