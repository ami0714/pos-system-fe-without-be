import { useMutation, useQueryClient } from '@tanstack/react-query';
import {addOrder} from '../api/cartApi';

export function useAddOrder() {
  const queryClient = useQueryClient();



  return useMutation({
    mutationFn: async (payload) => {
      const response = await addOrder(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      console.error('error mutasi cart:', err?.message || err);
    },
  });
}