import {get } from '../utils/apiHelper';


export async function getDashboard(filter,startDate,endDate){
    
    let params = new URLSearchParams();

    if(startDate && endDate){
        params.append('startDate',startDate)
        params.append('endDate',endDate)
    }
    const queryString = params.toString()

    const url = !queryString && !startDate && !endDate && filter ? `/dashboard?filter=${filter}`: 
                `/dashboard?filter=${filter}?${queryString}`
    
       const response = await get(url)

       if(response.status == true){
        return response
       }
    
    return {
        message: 'error'
    }
}

