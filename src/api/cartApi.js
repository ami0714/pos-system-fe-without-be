import {post} from '../utils/apiHelper';


export async function addOrder(payload){

    const response = await post('/sales/checkout', payload)

    if(response.status == true){
        return response.data;
    }
    return {
        message: 'error'
    }
}