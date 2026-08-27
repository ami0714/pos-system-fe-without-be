import {useQuery} from '@tanstack/react-query';
import {getDashboard} from '../api/dashboardApi'


export function useDashboard(filter,startDate,endDate) {

    return useQuery({
        queryKey:['dashboard',{filter,startDate,endDate}],
        queryFn:()=>getDashboard(filter,startDate,endDate),
         enabled: !!localStorage.getItem('token'),
    staleTime: 60000,
    });

}