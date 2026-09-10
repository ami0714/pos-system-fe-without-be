import {get,post,put } from '../utils/apiHelper';


export async function getProducts(catId,stockStatus){


    
    const response = await get(`/products/${catId}?stock=${stockStatus}`)

    if(response.status == true){
        return response.data;
    }
    return {
        message: 'error'
    }
}

export async function getProductsByBarcode(barcode){


    
    const response = await get(`/products?barcode=${barcode}`)
  

    if(response.status == true){
        
        return response.data;
    }
    throw new Error(response.message || 'Product not found')
}

export async function addProduct(payload){
    const response = await post('/products/add',payload)

    if(response.status == true){
        return response.message
    }
    throw new Error("err add product");
    
}

export async function editProduct(payload,productId){
    const response = await put(`/products/edit/${productId}`,payload)

    if(response.status == true){
        return response.message
    }
    throw new Error("err update product");
    
}


