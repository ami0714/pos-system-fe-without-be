import { useMutation, useQueryClient } from '@tanstack/react-query';
import {addOrder} from '../api/cartApi';

export function useLogin() {
  const queryClient = useQueryClient();



  return useMutation({
    mutationFn: async (cartItems,inputCash) => {
      const response = await addOrder({ cartItems, inputCash });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      navigate('/pos');
    },
    onError: (err) => {
      console.error('error mutasi cart:', err?.message || err);
    },
  });
}