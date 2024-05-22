import { Link } from 'react-router-dom';
import useAllEmployees from '../hooks/useAllEmployees';

const AllEmployee = () => {
    const [allemployees, loading, refetch] = useAllEmployees();
    console.log(allemployees);
    return (
        <div>
            <div className="overflow-x-auto px-3 pb-10">
                <table className="table table-md md:table-lg w-10/12 mx-auto bg-white dark:bg-[#080808] dark:text-white">
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-[16px] dark:text-white text-black'>Name</th>
                            <th className='text-[16px] dark:text-white text-black'>Email</th>
                            <th className='text-[16px] dark:text-white text-black'>Phone</th>
                            <th className='text-[16px] dark:text-white text-black'>Hire Date</th>
                            <th className='text-[16px] dark:text-white text-black'>Salary</th>
                            <th className='text-[16px] dark:text-white text-black'>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allemployees.map(e => (
                                <tr key={e.employee_id}>
                                    <th>{e.employee_id}</th>
                                    <td>{e.first_name} {e.last_name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.phone_number}</td>
                                    <td>{e.hire_date}</td>
                                    <td>{e.salary}</td>
                                    <td><Link to={`/employee/${e.employee_id}`} className='text-blue-500 bg-blue-100 p-2 rounded-lg'>Details</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEmployee;