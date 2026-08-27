import {useQuery} from '@tanstack/react-query';
import {getProducts} from '../api/productApi'


export function useProducts(categoryId,stockStatus) {

    return useQuery({
        queryKey:['product',{categoryId,stockStatus}],
        queryFn:()=>getProducts(categoryId,stockStatus),
         enabled: !!localStorage.getItem('token'),
    staleTime: 60000,
    });

}