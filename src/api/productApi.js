import {get } from '../utils/apiHelper';


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

