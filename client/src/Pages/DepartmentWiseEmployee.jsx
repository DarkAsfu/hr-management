import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const DepartmentWiseEmployee = () => {
    const [departmentWise, setDepartmentWise] = useState({
        "Engineering": [],
        "ItDepartment": [],
        "HumanResources": []
    });

    useEffect(() => {
        fetch('http://localhost:5000/departments/employees')
            .then(res => res.json())
            .then(data => {
                setDepartmentWise(data[0]); // Assuming the first object contains department data
            })
    }, []);

    return (
        <div className="w-10/12 mx-auto">
            <Tabs>
                <TabList className="text-center grid grid-cols-2 justify-center align-middle md:grid-cols-3 w-max mx-auto p-2 rounded-xl md:rounded-full border dark:bg-slate-100">
                    <Tab>Engineering</Tab>
                    <Tab>It Department</Tab>
                    <Tab>Human Resources</Tab>
                </TabList>

                <TabPanel>
                    {/* <h2 className="font-bold text-lg mb-4">Engineering</h2> */}
                    {departmentWise.Engineering.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                            {departmentWise.Engineering.map((employee, index) => (
                                <div key={index} className="mb-2">
                                    <div className="card bg-base-100 shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title">{employee.first_name} {employee.last_name}</h2>
                                            <p><span className="font-semibold">Job Title</span> {employee.job_title}</p>
                                            <p><span className="font-semibold">Email</span> {employee.email}</p>
                                            <p><span className="font-semibold">Phone no.</span> {employee.phone_number}</p>
                                            <p><span className="font-semibold">Join Date</span> {employee.hire_date.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No employees found.</p>
                    )}
                </TabPanel>

                <TabPanel>
                    {/* <h2 className="font-bold text-lg mb-4">It Department</h2> */}
                    {departmentWise.ItDepartment.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                            {departmentWise.ItDepartment.map((employee, index) => (
                                <div key={index} className="mb-2">
                                    <div className="card bg-base-100 shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title">{employee.first_name} {employee.last_name}</h2>
                                            <p><span className="font-semibold">Job Title</span> {employee.job_title}</p>
                                            <p><span className="font-semibold">Email</span> {employee.email}</p>
                                            <p><span className="font-semibold">Phone no.</span> {employee.phone_number}</p>
                                            <p><span className="font-semibold">Join Date</span> {employee.hire_date.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No employees found.</p>
                    )}
                </TabPanel>

                <TabPanel>
                    {/* <h2 className="font-bold text-lg mb-4">Human Resources</h2> */}
                    {departmentWise.HumanResources.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                            {departmentWise.HumanResources.map((employee, index) => (
                                <div key={index} className="mb-2">
                                    <div className="card bg-base-100 shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title">{employee.first_name} {employee.last_name}</h2>
                                            <p><span className="font-semibold">Job Title</span> {employee.job_title}</p>
                                            <p><span className="font-semibold">Email</span> {employee.email}</p>
                                            <p><span className="font-semibold">Phone no.</span> {employee.phone_number}</p>
                                            <p><span className="font-semibold">Join Date</span> {employee.hire_date.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No employees found.</p>
                    )}
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default DepartmentWiseEmployee;
