import {useQuery} from '@tanstack/react-query';
import {getTransaction,getTransactionInvoice} from '../api/transactionHistoryApi'




export function useGetHistory() {

    return useQuery({
        queryKey:['transaction-history'],
        queryFn:getTransaction,
        enabled: !!localStorage.getItem('token'),
        staleTime: 60000,
    });

}

export function useGetHistoryInvoice(saleId) {

    return useQuery({
        queryKey:['transaction-history-invoice',saleId],
        queryFn:()=>getTransactionInvoice(saleId),
        enabled: !!localStorage.getItem('token') && !!saleId,
        staleTime: 60000,
    });
}