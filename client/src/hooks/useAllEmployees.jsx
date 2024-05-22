import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const useAllEmployees = () => {
    const [loading, setLoading] = useState(true)
    const {data: allemployees = [], refetch} = useQuery({
        queryKey: ['allemployees'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/employees');
            setLoading(false)
            return res.json();
        }
    })
    return [allemployees, loading, refetch]
};

export default useAllEmployees;