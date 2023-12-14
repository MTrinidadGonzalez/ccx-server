import multer from 'multer'
import __dirname from '../../utils.js'
import path from 'path'


function createUploader(destinationFolder) {
    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            console.log('en create oploader _dirname:', __dirname)
            const destinationPath = path.join(`${__dirname}/public/files/${destinationFolder}`)
            callback(null, destinationPath);
        },
        filename: function (req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`)
        }
    });

    return multer({ storage })
}

export default createUploader