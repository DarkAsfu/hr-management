import { useEffect, useState } from "react";

const DashboardHome = () => {
    const [statistics, setStatistics] = useState({})

    useEffect(() => {
        fetch('http://localhost:5000/statistics')
            .then(res => res.json())
            .then(data => setStatistics(data))
    }, [])

    return (
        <div className="w-10/12 mx-auto border p-10 grid md:grid-cols-3 gap-4">
            <div className="bg-white text-center p-10">
                <h4 className="text-2xl">Total Employee</h4>
                <h1 className="text-5xl font-bold">{statistics.employee_count}</h1>
            </div>
            <div className="bg-white text-center p-10">
                <h4 className="text-2xl">Total Departments</h4>
                <h1 className="text-5xl font-bold">{statistics.department_count}</h1>
            </div>
            <div className="bg-white text-center p-10">
                <h4 className="text-2xl">Job Position</h4>
                <h1 className="text-5xl font-bold">{statistics.job_count}</h1>
            </div>
            {
                statistics.department_wise_employee_count && statistics.department_wise_employee_count.map((a, idx) => (
                    <div className="bg-white text-center p-10" key={idx}>
                        <h4 className="text-2xl">{a.department_name}</h4>
                        <h1 className="text-5xl font-bold">{a.employee_count}</h1>
                    </div>
                ))
            }
        </div>
    );
};

export default DashboardHome;
