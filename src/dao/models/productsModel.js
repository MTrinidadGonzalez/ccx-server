import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection= 'Products'
const schema= new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    category:{
        type:String,
        enum:["remeras","pantalones", "abrigos","accesorios","articulos de belleza","articulos para el hogar","gimnasia","tecnologia"]
    } ,
    stock:{
        type:Number,
        default: 1
    },
    img: String,
    status:{
        type: String,
        enum:['disponible','vendido'],
        default:'disponible'
    },
    quantity:{
        type: Number,
        default: 1
    },
    owner: {
        type: String,
        default: 'admin2@correo'
    },
    talle:{
        type:String,
        default:"m",
        enum:["xs","s", "m","l","xl","neutro"]

    },
    color:{
        type:String,
        default:'blanco',
        enum:["blanco","negro", "marron","rojo","azul","amarillo", "verde","rosa","celeste","violeta","naranja","gris","crema","jean","estampado",
        'dorado','plateado',"ninguno"]
    },
    transactionType:{
        type:String,
        enum:['byAdmin', 'byUser']
    }

}, {timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}}
)
schema.plugin(mongoosePaginate)
const productsModel= mongoose.model(collection, schema)
export default productsModel;