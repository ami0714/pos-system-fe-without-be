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

