import productsModel from '../models/productsModel.js';

export default class ProductsManager{
    getProducts= ()=>{
        return productsModel.find().lean()
    }
    getListProductsToId=(productsIds)=>{
        return productsModel.find({ _id: { $in: productsIds } })
    }
    getProductById=(pid)=>{
        return productsModel.findById(pid)
    }
    getProductsTo= (param1,param2)=>{
        return productsModel.find({[param1]:param2}).lean()
    }
    getProductBy=(param1,param2)=>{
        return productsModel.findOne({[param1]:param2}).lean()
    }

    createProduct=(product)=>{
        return productsModel.create(product)
    }

    createProducts=(products)=>{
        return productsModel.insertMany(products)
    }

    updateProduct=(pid, product)=>{
        return productsModel.findByIdAndUpdate(pid, {$set: product})
    }
     updateProductImage = (productId, newImgPath) => {
      return productsModel.findByIdAndUpdate(
        productId,
        { $set: { img: newImgPath } },
        { new: true } 
      )
    }

    getProductsByOwnerEmail(email) {          
        return productsModel.find({ owner: email });   
    }
    
    deleteProduct=(pid)=>{
        return productsModel.findByIdAndDelete(pid)
    }
    deleteLisProductsToIds = (productIds) => {
        return productsModel.deleteMany({ _id: { $in: productIds } });
      }

      updateStatusOfProducts = (productIds, newStatus) => {
        console.log('enprductsManager udateStatusProducts pids:', productIds)
        return productsModel.updateMany(
          { _id: { $in: productIds } },
          { $set: { status: newStatus } } 
        );
      };

       updateStatusProduct = (productId, newStatus) => {
        console.log('enprductsManager udateStatusProduct pid:', productId)
        return productsModel.updateOne(
            { _id: productId },
            { $set: { status: newStatus } }
        );
    };

}