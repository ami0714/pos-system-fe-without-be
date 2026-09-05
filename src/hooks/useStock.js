import {useQuery} from '@tanstack/react-query';
import {getProdukLog} from '../api/stockApi'



export function useStock(type,start,end) {

    return useQuery({
        queryKey:['productLog',{type,start,end}],
        queryFn:()=>getProdukLog(type,start,end),
         enabled: !!localStorage.getItem('token'),
    staleTime: 60000,
    });

}

