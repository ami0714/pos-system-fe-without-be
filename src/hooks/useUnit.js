import {useQuery} from '@tanstack/react-query';
import {getUnits} from '../api/unitApi'


export function useUnits() {

    return useQuery({
        queryKey:['units'],
        queryFn:getUnits,
         enabled: !!localStorage.getItem('token'),
    staleTime: 60000,
    });

}