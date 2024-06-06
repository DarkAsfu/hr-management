import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Attendance = () => {
    const [date, setDate] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('')
    const fetchAttendance = async (selectedDate) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/attendance/employees/${selectedDate}`);
            const data = await response.json();
            setEmployees(data);
            setLoading(false);
            setSuccess('')
        } catch (error) {
            console.error('Error fetching attendance data:', error);
            setLoading(false);
        }
    };

    const updateAttendance = async () => {
        const attendanceUpdates = employees.map(employee => ({
            employee_id: employee.employee_id,
            status: employee.status
        }));

        try {
            const response = await fetch(`http://localhost:5000/attendance/employees/${date}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ attendance: attendanceUpdates }),
            });

            const result = await response.json();
            Swal.fire({
                title: "Good job!",
                text: "Attendance Saved",
                icon: "success"
              });
            //   navigate(from, { replace: true });
            setEmployees([])
            setSuccess('Successfully save the attendance')
            console.log('Attendance update result:', result);

        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleStatusChange = (employeeId, status) => {
        setEmployees(employees.map(employee => (
            employee.employee_id === employeeId ? { ...employee, status } : employee
        )));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAttendance();
    };

    useEffect(() => {
        if (date) {
            fetchAttendance(date);
        }
    }, [date]);

    return (
        <div className="attendance w-10/12 mx-auto bg-white dark:bg-[#222222] p-10">
            <div className='flex justify-between py-4'>
                <h1 className='text-[16px] font-semibold dark:text-white'>Employee Attendance</h1>
                <div className="date-picker text-[16px] dark:text-white">
                    <label>Select Date: </label>
                    <input className='dark:bg-[#444] px-2 py-1 rounded-lg' type="date" value={date} onChange={handleDateChange} />
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 ">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">EmployeeID</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Name</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Designation</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Status</div>
                                </th>
                            </tr>
                        </thead>
                        <p className='text-green-400 font-semibold'>{success}</p>
                        <tbody className="text-sm divide-y divide-gray-100 dark:divide-[#333333]">
                            {loading ? <img src="https://i.ibb.co/qJzzZWj/j-KEc-VPZFk-2.gif" alt="" /> :
                                employees.map(e => (
                                    <tr key={e.employee_id}>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left text-[16px] text-black dark:text-white">{e.employee_id}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left text-[16px] text-black dark:text-white">{e.name}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left text-[16px] text-black dark:text-white">{e.job_title}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap text-center flex justify-center dark:text-white">
                                            <label className='mr-2'>
                                                <input
                                                    type="radio"
                                                    name={`status-${e.employee_id}`}
                                                    value="present"
                                                    checked={e.status === 'present'}
                                                    onChange={() => handleStatusChange(e.employee_id, 'present')}
                                                />
                                                Present
                                            </label>
                                            <label className='mr-2'>
                                                <input
                                                    type="radio"
                                                    name={`status-${e.employee_id}`}
                                                    value="absent"
                                                    checked={e.status === 'absent'}
                                                    onChange={() => handleStatusChange(e.employee_id, 'absent')}
                                                />
                                                Absent
                                            </label>
                                            <label className='mr-2'>
                                                <input
                                                    type="radio"
                                                    name={`status-${e.employee_id}`}
                                                    value="not set"
                                                    checked={e.status === 'not set'}
                                                    onChange={() => handleStatusChange(e.employee_id, 'not set')}
                                                />
                                                Not Set
                                            </label>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className='flex justify-end mt-10'>
                        <button type="submit" className='bg-blue-400 btn text-white hover:bg-blue-100 hover:text-blue-500'>Save Attendance</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Attendance;
