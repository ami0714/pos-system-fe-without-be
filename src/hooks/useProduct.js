import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import {getProducts,getProductsByBarcode,addProduct,editProduct} from '../api/productApi'


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

export function useAddproduct(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({payload})=>{
                   const response = await addProduct(payload);
                   return response
        },
       onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addProduct'] });
        }
    })
}


export function useEditproduct(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({payload,productId})=>{
                   const response = await editProduct(payload,productId);
                   return response
        },
       onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editProduct'] });
        }
    })
}