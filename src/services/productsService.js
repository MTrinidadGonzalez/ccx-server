import ProductsManager from '../dao/managers/productsManager.js'

export default class ProductsServices{
    constructor(dao){
        this.dao= dao
    }

    getProducts= ()=>{
        return this.dao.getProducts()
    }

    getListProductsToId=(productsIds)=>{
        return this.dao.getListProductsToId(productsIds)
    }


    getProductById=(pid)=>{
        return this.dao.getProductById(pid)
    }

    getProductsByOwnerEmail=(email)=>{
        return this.dao.getProductsByOwnerEmail(email)
    }


    getProductsTo= (param1,param2)=>{
        return this.dao.getProductsTo(param1,param2)
    }

    getProductBy=(param1,param2)=>{
        return this.dao.getProductBy(param1,param2)
    }

    createProduct=(product)=>{
        return this.dao.createProduct(product)
    }

    createProducts=(products)=>{
        return this.dao.createProducts(products)
    }

    updateProduct=(pid, product)=>{
        return this.dao.updateProduct(pid,product)
    }

    deleteProduct=(pid)=>{
        return this.dao.deleteProduct(pid)
    }

    updateProductImage = (productId, newImgPath) => {
        return this.dao.updateProductImage(productId,newImgPath)
      }

      deleteLisProductsToIds = (productIds) => {
        return this.dao.deleteLisProductsToIds(productIds);
      }

      updateStatusOfProducts = (productIds, newStatus) => {
        return this.dao.updateStatusOfProducts(productIds,newStatus)
      };

      updateStatusProduct = (productId, newStatus) => {
        return this.dao.updateStatusProduct(productId,newStatus)
    };
}