import {get } from '../utils/apiHelper';


export async function getTransaction(){

    const response = await get('/sales/history')

    if(response.status == true){
        return response.sales;
    }
    return {
        message: 'error'
    }


}

export async function getTransactionInvoice(saleId) {
    const response = await get(`/sales/receipt/${saleId}`)

    if(response.status == true){
        return response.receipt;
    }
    return {
        message: 'error'
    }
}