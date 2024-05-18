import { useState } from 'react';

const AllEmployee = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage, setEmployeesPerPage] = useState(5);

    const employees = [
        {
            "employee_id": 1,
            "name": "John Smith",
            "phone_number": "555-123-4567",
            "age": 32,
            "company": "Acme Corporation"
        },
        {
            "employee_id": 2,
            "name": "Emily Johnson",
            "phone_number": "555-234-5678",
            "age": 28,
            "company": "Global Solutions Inc."
        },
        {
            "employee_id": 3,
            "name": "Michael Davis",
            "phone_number": "555-345-6789",
            "age": 40,
            "company": "Tech Innovations Ltd."
        },
        {
            "employee_id": 4,
            "name": "Sarah Brown",
            "phone_number": "555-456-7890",
            "age": 35,
            "company": "Visionary Enterprises"
        },
        {
            "employee_id": 5,
            "name": "David Wilson",
            "phone_number": "555-567-8901",
            "age": 45,
            "company": "Nexus Industries"
        },
        {
            "employee_id": 6,
            "name": "Jessica Lee",
            "phone_number": "555-678-9012",
            "age": 29,
            "company": "Apex Innovations"
        },
        {
            "employee_id": 7,
            "name": "Matthew Taylor",
            "phone_number": "555-789-0123",
            "age": 38,
            "company": "Quantum Dynamics"
        },
        {
            "employee_id": 8,
            "name": "Jennifer Martinez",
            "phone_number": "555-890-1234",
            "age": 33,
            "company": "Synergy Solutions"
        },
        {
            "employee_id": 9,
            "name": "Christopher Anderson",
            "phone_number": "555-901-2345",
            "age": 41,
            "company": "InnovateTech Inc."
        },
        {
            "employee_id": 10,
            "name": "Amanda Clark",
            "phone_number": "555-012-3456",
            "age": 27,
            "company": "Pinnacle Enterprises"
        },
        {
            "employee_id": 11,
            "name": "Kevin Wright",
            "phone_number": "555-123-4567",
            "age": 36,
            "company": "Dynamic Solutions"
        },
        {
            "employee_id": 12,
            "name": "Stephanie Hall",
            "phone_number": "555-234-5678",
            "age": 31,
            "company": "Endeavor Innovations"
        },
        {
            "employee_id": 13,
            "name": "Daniel Rodriguez",
            "phone_number": "555-345-6789",
            "age": 39,
            "company": "Synergy Solutions"
        },
        {
            "employee_id": 14,
            "name": "Melissa Baker",
            "phone_number": "555-456-7890",
            "age": 34,
            "company": "NexGen Technologies"
        },
        {
            "employee_id": 15,
            "name": "Ryan Murphy",
            "phone_number": "555-567-8901",
            "age": 30,
            "company": "TechWave Innovations"
        },
        {
            "employee_id": 16,
            "name": "Laura Garcia",
            "phone_number": "555-678-9012",
            "age": 37,
            "company": "InnovateTech Inc."
        },
        {
            "employee_id": 17,
            "name": "Mark Turner",
            "phone_number": "555-789-0123",
            "age": 42,
            "company": "Nexus Industries"
        },
        {
            "employee_id": 18,
            "name": "Karen White",
            "phone_number": "555-890-1234",
            "age": 26,
            "company": "Visionary Enterprises"
        },
        {
            "employee_id": 19,
            "name": "Justin Hall",
            "phone_number": "555-901-2345",
            "age": 43,
            "company": "Dynamic Solutions"
        },
        {
            "employee_id": 20,
            "name": "Linda Adams",
            "phone_number": "555-012-3456",
            "age": 25,
            "company": "Endeavor Innovations"
        }
    ]

    // Update filtered employees when search term or current page changes
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice((currentPage - 1) * employeesPerPage, currentPage * employeesPerPage);

    // Change page
    const paginate = pageNumber => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredEmployees.length / employeesPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

    // Generate page numbers array
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(employees.length / employeesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='w-11/12 mx-auto border bg-white px-10 py-10'>
            <div className='flex items-center gap-3'>
                <h1>Search: </h1>
                <input
                    className='border py-2 rounded-sm px-2'
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-bold text-[14px] text-[#4B4B5A]">Id</th>
                            <th className="text-bold text-[14px] text-[#4B4B5A]">Name</th>
                            <th className="text-bold text-[14px] text-[#4B4B5A]">Phone Number</th>
                            <th className="text-bold text-[14px] text-[#4B4B5A]">Age</th>
                            <th className="text-bold text-[14px] text-[#4B4B5A]">Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.employee_id}>
                                <td>{employee.employee_id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.phone_number}</td>
                                <td>{employee.age}</td>
                                <td>{employee.company}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='md:flex items-center justify-between mt-10'>
                <div className='md:flex items-center gap-10'>
                    <div className='flex'>
                        <h1 className='font-bold'>Display: </h1>
                        <select
                            value={employeesPerPage}
                            onChange={e => {
                                setEmployeesPerPage(parseInt(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                        </select>
                    </div>
                    {/* Go to specific page */}
                    <div className='flex items-center gap-2'>
                    <h1 className='font-bold'>Go to page: </h1>
                        <input
                            className='border p-1 rounded-md'
                            type="number"
                            min={1}
                            max={Math.ceil(filteredEmployees.length / employeesPerPage)}
                            value={currentPage}
                            onChange={e => setCurrentPage(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div>
                    {/* Previous Page Button */}
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>

                    {/* Page Numbers */}
                    {pageNumbers.map(pageNumber => (
                        <button key={pageNumber} onClick={() => paginate(pageNumber)}>{pageNumber}</button>
                    ))}

                    {/* Next Page Button */}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}>Next</button>
                </div>
            </div>

        </div>
    );
};

export default AllEmployee;
