import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const useSingleEmployeeData = (id) => {
    const [loading, setLoading] = useState(true);
    const { data: singleEmployee = [], refetch } = useQuery({
        queryKey: ['singleEmployee'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/employees/${id}`)
            setLoading(false);
            return res.json();
        }
    })
    return [singleEmployee, loading, refetch]
};

export default useSingleEmployeeData;