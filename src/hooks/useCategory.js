import {useQuery} from '@tanstack/react-query';
import {getCategory} from '../api/categoryApi'


export function useCategory() {

    return useQuery({
        queryKey:['category'],
        queryFn:getCategory,
         enabled: !!localStorage.getItem('token'),
    staleTime: 60000,
    });

}