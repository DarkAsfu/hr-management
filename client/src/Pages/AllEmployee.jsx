import useAllEmployees from '../hooks/useAllEmployees';
import { useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllEmployee = () => {
    const [allemployees, loading, refetch] = useAllEmployees();
    const [sEmployee, setSEmployee] = useState();
    const [searchQuery, setSearchQuery] = useState('');

    function employeeDetails(id) {
        document.getElementById('employee_details').showModal();
        fetch(`http://localhost:5000/employees/${id}`)
            .then(res => res.json())
            .then(data => setSEmployee(data))
    }

    const employeeDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/employees/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Employee has been deleted.',
                                'success'
                            )
                            refetch();
                        }
                    })
            }
        })
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const filteredEmployees = allemployees.filter(employee => 
        employee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="md:w-10/12 w-[95%] mx-auto bg-white dark:bg-[#080808] mb-6 shadow-lg rounded-md border border-gray-200 dark:border-[#222]">
                <div className="p-3">
                    <div className="flex justify-between mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search by name or email"
                            className="p-2 border border-gray-300 rounded-md w-full md:w-1/2"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Name</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Email</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Phone</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Hire Date</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Salary</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Details</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Action</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Delete</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 dark:divide-[#222]">
                                {loading ? <img src="https://i.ibb.co/qJzzZWj/j-KEc-VPZFk-2.gif" alt="Loading" /> :
                                    filteredEmployees.map(e => (
                                        <tr key={e.employee_id}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left text-[16px] text-black dark:text-white">{e.first_name} {e.last_name}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left text-[16px] text-black dark:text-white">{e.email}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="">
                                                    <div className="text-gray-800 dark:text-[#f8f8f8]">{e.phone_number}</div>
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left text-[16px] text-gray-800 dark:text-white">{e.hire_date.slice(0, 10)}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-center text-[16px] text-gray-800 dark:text-white">{e.salary}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap flex justify-center">
                                                <button className='text-blue-500 bg-blue-100 p-2 rounded-lg text-center' onClick={() => employeeDetails(e.employee_id)}>Details</button>
                                                <dialog id="employee_details" className="modal modal-bottom sm:modal-middle">
                                                    <div className="modal-box">
                                                        <div className="modal-action -mb-12 mr-4">
                                                            <form method="dialog">
                                                                <button className="text-[red] text-[16px]"><ImCross /></button>
                                                            </form>
                                                        </div>
                                                        <div className="bg-white shadow-md rounded-lg p-10">
                                                            <h2 className="text-xl font-semibold mb-4">{sEmployee?.[0]?.first_name} {sEmployee?.[0]?.last_name}</h2>
                                                            <p className="text-gray-600 mb-2"><span className='font-bold'>Email:</span> {sEmployee?.[0]?.email}</p>
                                                            <p className="text-gray-600 mb-2"><span className='font-bold'>Phone:</span> {sEmployee?.[0].phone_number}</p>
                                                            <p className="text-gray-600 mb-2"><span className='font-bold'>Hire Date:</span> {sEmployee?.[0]?.hire_date.slice(0, 10)}</p>
                                                            <p className="text-gray-600 mb-2"><span className='font-bold'>Salary:</span> ${sEmployee?.[0]?.salary}</p>
                                                            <p className="text-gray-600 mb-2"><span className='font-bold'>Job Title:</span> {sEmployee?.[0]?.job_title}</p>
                                                            <p className="text-gray-600 mb-2"><span className='font-bold'>Department:</span> {sEmployee?.[0]?.department_name}</p>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-center text-[14px] text-gray-800 dark:text-white">
                                                    <Link to={`/updateEmployee/${e.employee_id}`} className='text-blue-500 border border-blue-500 hover:bg-blue-100 hover:border-blue-100 transition-all p-2 rounded-lg text-center'>Update</Link>
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-center text-[14px] text-gray-800 dark:text-white">
                                                    <Link onClick={() => employeeDelete(e.employee_id)} className="flex justify-center text-xl text-blue-400"><FaRegTrashCan /></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllEmployee;
