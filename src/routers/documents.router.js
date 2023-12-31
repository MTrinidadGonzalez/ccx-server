import RouterPadre from '../routers/router.js'
import path from 'path'
import __dirname from '../utils.js'
import fs from 'fs'
import { Router } from "express";


const router= Router()
router.get('/:filename', async (req, res)=> {
    try {
        // urlCompleta: http://localhost:8081/api/documents/1694297444243-59799a2e8ccd217019f2cc9d87f42af7.jpg?folder=products
        console.log('file router llega la peticion')
        const { filename } = req.params;
        const { folder } = req.query || 'img';
        console.log('document router _dirname',__dirname)
        const pathIMG = `/opt/render/project/src/src/public/files/${folder}/${filename}`;
        console.log('document router file pathIMG',pathIMG)
        const exist = fs.existsSync(pathIMG);
        console.log('file router exist',exist)

        if (exist) {
            console.log('file router existe el archivo y fue encontrado')
            res.sendFile(pathIMG);
        } else {
            console.log('file router  no existe el archivo y no fue encontrado')
            res.send({ status: 'error', error: 'Documento no encontrado en el servidor' });
        }
    } catch (error) {
        console.log(error);
    }
});

export default router



/*import RouterPadre from '../routers/router.js'
import path from 'path'
import __dirname from '../utils.js'
import fs from 'fs'

export default class DocumentsRouter extends RouterPadre{
    init(){

        this.get('/:filename',["PUBLIC"],async (req,res)=>{
           try{
            //urlCompleta: http://localhost:8080/api/documents/1694297444243-59799a2e8ccd217019f2cc9d87f42af7.jpg?folder=products
           
             const {filename}= req.params
             const { folder } = req.query || 'img'
             console.log('en document router, dirname;', __dirname)
             const pathIMG= path.resolve(`${__dirname}/public/files/${folder}/${filename}`)
             const exist=  fs.existsSync(pathIMG)
             if(exist){
                console.log('en router documentes, si existe:', exist)
                 res.sendFile(pathIMG)
             }
             else{
                console.log('en router documentes,no encontro el documento')
                 res.send({status:'error', error: 'Documento no encontrado en el servidor'})
             }
           }
           catch(error){
            console.log(error)
           }
        })


    }//cierre del init
}*/