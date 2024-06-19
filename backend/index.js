import express from 'express';
import mysql from 'mysql';
import cors from 'cors'
// const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "hr_management"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Home route
app.get("/", (req, res) => {
    res.send("Hello, this is the backend.");
});

// CRUD for Employees
app.get("/employees", (req, res) => {
    const q = "SELECT * FROM employees";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


// Route to get employee information by ID
app.get("/employees/:id", (req, res) => {
    const employeeId = req.params.id;

    const query = `
        SELECT 
            e.first_name,
            e.last_name,
            e.email,
            e.phone_number,
            e.hire_date,
            e.salary,
            e.department_id,
            e.job_id,
            j.job_title,
            d.department_name
        FROM 
            employees e
        LEFT JOIN 
            jobs j ON e.job_id = j.job_id
        LEFT JOIN 
            departments d ON e.department_id = d.department_id
        WHERE 
            e.employee_id = ?;
    `;

    db.query(query, [employeeId], (err, results) => {
        if (err) {
            console.error('Error fetching employee information:', err);
            return res.status(500).json({ error: "An error occurred while fetching employee information." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Employee not found." });
        }

        const employeeInfo = results;
        return res.json(employeeInfo);
    });
});

app.post("/employees", (req, res) => {
    console.log("Received POST request to /employees with body:", req.body); // Log the request body
    const q = "INSERT INTO employees SET ?";
    const values = req.body;
    db.query(q, values, (err, data) => {
        if (err) {
            console.error('Error adding employee:', err); // Log any errors
            return res.status(500).json(err); // Return the error response
        }
        return res.json({
            dataInserted: true,
            message: "Employee added successfully."
        });
    });
});
// todo
app.patch("/employees/:id", (req, res) => {
    const employeeId = req.params.id;
    const updatedData = req.body;

    if (!employeeId || !updatedData) {
        return res.status(400).json({ error: "Invalid request data" });
    }

    const q = "UPDATE employees SET ? WHERE employee_id = ?";
    const values = [updatedData, employeeId];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ error: "Failed to update employee" });
        }
        return res.json({ message: "Employee updated successfully" });
    });
});


// todo
app.delete("/employees/:id", (req, res) => {
    const { id } = req.params;
    const deleteAttendanceQuery = "DELETE FROM attendance WHERE employee_id = ?";
    db.query(deleteAttendanceQuery, [id], (err, attendanceData) => {
        if (err) {
            console.error('Error deleting attendance records:', err);
            return res.status(500).json(err);
        }
        const deleteEmployeeQuery = "DELETE FROM employees WHERE employee_id = ?";
        db.query(deleteEmployeeQuery, [id], (err, employeeData) => {
            if (err) {
                console.error('Error deleting employee:', err);
                return res.status(500).json(err);
            }
            return res.json({
                deletedCount: 1,
                message: "Employee deleted successfully."
            });
        });
    });
});

app.get("/departments/employees", (req, res) => {
    const query = `
        SELECT 
            d.department_name,
            e.employee_id,
            e.first_name,
            e.last_name,
            e.email,
            e.phone_number,
            e.hire_date,
            j.job_title
        FROM 
            departments d
        LEFT JOIN 
            employees e ON d.department_id = e.department_id
        LEFT JOIN 
            jobs j ON e.job_id = j.job_id
        ORDER BY 
            d.department_name, e.employee_id;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching department-wise employee information:', err);
            return res.status(500).json({ error: "An error occurred while fetching department-wise employee information." });
        }

        // Group employees by department
        const departmentWiseInfo = results.reduce((acc, row) => {
            if (!acc[row.department_name]) {
                acc[row.department_name] = [];
            }
            acc[row.department_name].push({
                employee_id: row.employee_id,
                first_name: row.first_name,
                last_name: row.last_name,
                email: row.email,
                phone_number: row.phone_number,
                hire_date: row.hire_date,
                job_title: row.job_title,
                salary: row.salary
            });
            return acc;
        }, {});

        return res.json([departmentWiseInfo]);
    });
});
// attendence
app.get("/attendance", (req, res) => {
    const q = "SELECT * FROM attendance";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/attendance/employees/:date", (req, res) => {
    const date = req.params.date;
    const q = `
        SELECT
            e.employee_id,
            j.job_title,
            CONCAT(e.first_name, ' ', e.last_name) AS name,
            IFNULL(a.status, 'not set') AS status
        FROM
            employees e
        LEFT JOIN 
            jobs j ON e.job_id = j.job_id
        LEFT JOIN 
            (SELECT a1.employee_id, a1.status
             FROM attendance a1
             INNER JOIN 
                 (SELECT employee_id, MAX(attendance_id) AS max_attendance_id
                  FROM attendance
                  WHERE date = ?
                  GROUP BY employee_id) a2
             ON a1.employee_id = a2.employee_id AND a1.attendance_id = a2.max_attendance_id
             WHERE a1.date = ?) a ON e.employee_id = a.employee_id
        ORDER BY 
            e.employee_id;
    `;

    db.query(q, [date, date], (err, data) => {
        if (err) {
            console.error('Error fetching attendance:', err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});


app.put("/attendance/employees/:date", (req, res) => {
    const { date } = req.params;
    const attendanceUpdates = req.body.attendance; // Expecting an array of { employee_id, status }
    const formattedDate = new Date(date).toISOString().split('T')[0];

    const query = `
        INSERT INTO attendance (employee_id, date, status)
        VALUES ?
        ON DUPLICATE KEY UPDATE status = VALUES(status);
    `;

    const values = attendanceUpdates.map(a => [a.employee_id, formattedDate, a.status]);

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error('Error updating employee attendance status:', err);
            return res.status(500).json({ error: "An error occurred while updating employee attendance status." });
        }

        return res.json({ message: "Attendance status updated successfully." });
    });
});

app.get("/users", (req, res) => {
    const q = "Select * from users";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})
app.post('/users', (req, res) => {
    const user = req.body;
    console.log(user.email);

    // Check if the user already exists
    db.query('SELECT * FROM users WHERE email = ?', [user.email], (err, results) => {
        if (err) {
            console.error('Error checking existing user:', err);
            return res.status(500).json(err);
        }

        if (results.length > 0) {
            console.log({ message: 'user already exists' });
            return res.send({ message: 'user already exists' });
        }

        // Insert the new user
        db.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) {
                console.error('Error adding user:', err);
                return res.status(500).json(err);
            }
            res.send({
                dataInserted: true,
                message: 'user added successfully.',
                result: result
            });
        });
    });
});
app.get("/statistics", (req, res) => {
    const employeeCountQuery = "SELECT COUNT(*) AS employee_count FROM employees";
    const departmentCountQuery = "SELECT COUNT(*) AS department_count FROM departments";
    const jobCountQuery = "SELECT COUNT(*) AS job_count FROM jobs";
    const departmentWiseEmployeeCountQuery = `
        SELECT d.department_name, COUNT(e.employee_id) AS employee_count
        FROM departments d
        LEFT JOIN employees e ON d.department_id = e.department_id
        GROUP BY d.department_name;
    `;

    db.query(employeeCountQuery, (err, employeeData) => {
        if (err) {
            console.error('Error fetching employee count:', err);
            return res.status(500).json(err);
        }

        db.query(departmentCountQuery, (err, departmentData) => {
            if (err) {
                console.error('Error fetching department count:', err);
                return res.status(500).json(err);
            }

            db.query(jobCountQuery, (err, jobData) => {
                if (err) {
                    console.error('Error fetching job count:', err);
                    return res.status(500).json(err);
                }

                db.query(departmentWiseEmployeeCountQuery, (err, departmentWiseData) => {
                    if (err) {
                        console.error('Error fetching department-wise employee count:', err);
                        return res.status(500).json(err);
                    }

                    const statistics = {
                        employee_count: employeeData[0].employee_count,
                        department_count: departmentData[0].department_count,
                        job_count: jobData[0].job_count,
                        department_wise_employee_count: departmentWiseData
                    };

                    return res.json(statistics);
                });
            });
        });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
