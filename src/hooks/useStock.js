import {useMutation, useQuery,useQueryClient} from '@tanstack/react-query';
import {getProdukLog,stockMovement} from '../api/stockApi'



export function useStock(type,start,end) {

    return useQuery({
        queryKey:['productLog',{type,start,end}],
        queryFn:()=>getProdukLog(type,start,end),
         enabled: !!localStorage.getItem('token'),
    staleTime: 60000,
    });

}


export function useStockMovement() { 
const queryClient = useQueryClient();

    return useMutation({
         mutationFn: async ({payload,type,productId}) => {
            const response = await stockMovement(payload,type,productId);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock-movement'] });
        }
    })
    
}



