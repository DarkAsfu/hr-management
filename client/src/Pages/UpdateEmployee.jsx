import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useSingleEmployeeData from '../hooks/useSingleEmployeeData';

const UpdateEmployee = () => {
    const params = useParams();
    const [singleEmployee, loading] = useSingleEmployeeData(params.id);
    console.log(singleEmployee);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        hire_date: '',
        job_id: '',
        salary: '',
        department_id: ''
    });

    useEffect(() => {
        if (singleEmployee) {
            setFormData({
                first_name: singleEmployee[0]?.first_name || '',
                last_name: singleEmployee[0]?.last_name || '',
                email: singleEmployee[0]?.email || '',
                phone_number: singleEmployee[0]?.phone_number || '',
                hire_date: singleEmployee[0]?.hire_date ? new Date(singleEmployee[0]?.hire_date).toISOString().substr(0, 10) : '', // Format date for input type=date
                job_id: singleEmployee[0]?.job_id || '',
                salary: singleEmployee[0]?.salary || '',
                department_id: singleEmployee[0]?.department_id || ''
            });
        }
    }, [singleEmployee]);
    console.log(formData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log(formData);
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/employees/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                title: "Good job!",
                text: "Successfully updated employee information",
                icon: "success"
            });
        })
        .catch(error => {
            console.error('Error updating employee:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update employee information",
                icon: "error"
            });
        });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="md:w-7/12 mx-auto mt-10 px-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Employee Information</h2>
                <div className="grid md:grid-cols-2 gap-5">
                    {['first_name', 'last_name', 'email', 'phone_number', 'hire_date', 'salary'].map((field) => (
                        <div key={field}>
                            <input
                                type={field === 'hire_date' ? 'date' : 'text'}
                                id={field}
                                name={field}
                                value={formData[field]} // Controlled component
                                placeholder={field.replace('_', ' ').toLowerCase()}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    ))}
                    <div className="mb-4">
                        <select
                            id="department_id"
                            name="department_id"
                            value={formData.department_id}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select Department</option>
                            <option value="2">Engineering</option>
                            <option value="1">Human Resources</option>
                            <option value="3">IT Department</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <select
                            id="job_id"
                            name="job_id"
                            value={formData.job_id}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select Job Title</option>
                            <option value="1">HR Manager</option>
                            <option value="2">Software Developer</option>
                            <option value="3">Developer</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="btn-md w-36 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployee;
