import {get } from '../utils/apiHelper';


export async function getUnits(){

    const response = await get('/units')

    if(response.status == true){
        return response.data;
    }
    return {
        message: 'error'
    }
}