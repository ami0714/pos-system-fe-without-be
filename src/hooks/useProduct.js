import {useQuery} from '@tanstack/react-query';
import {getProducts,getProductsByBarcode} from '../api/productApi'


export function useProducts(categoryId,stockStatus) {

    return useQuery({
        queryKey:['product',{categoryId,stockStatus}],
        queryFn:()=>getProducts(categoryId,stockStatus),
         enabled: !!localStorage.getItem('token'),
    staleTime: 60000,
    });

}

export function useProductsByBarcode(barcode) {

    return useQuery({
        queryKey:['product','stock',barcode],
        queryFn:()=>getProductsByBarcode(barcode),
         enabled: !!localStorage.getItem('token') && !!barcode,
    staleTime: 60000,
    });

}