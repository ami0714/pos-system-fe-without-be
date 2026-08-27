import {get } from '../utils/apiHelper';


export async function getCategory(){

    const response = await get('/categories')

    if(response.status == true){
        return response.data;
    }
    return {
        message: 'error'
    }
}