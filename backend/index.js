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
            dataInserted : true,
            message: "Employee added successfully." 
        });
    });
});
// todo
app.put("/employees/:id", (req, res) => {
    const q = "UPDATE employees SET ? WHERE employee_id = ?";
    const values = [req.body, req.params.id];
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Employee updated successfully.");
    });
});
// todo
app.delete("/employees/:id", (req, res) => {
    const q = "DELETE FROM employees WHERE employee_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Employee deleted successfully.");
    });
});


// Endpoint to get department-wise employee information
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

// Endpoint to get all employees with their attendance status for a specific date
app.get("/attendance/employees/:date", (req, res) => {
    const { date } = req.params;
    const query = `
        SELECT 
            e.employee_id,
            CONCAT(e.first_name, ' ', e.last_name) AS name,
            IFNULL(a.status, 'not set') AS status
        FROM 
            employees e
        LEFT JOIN 
            attendance a ON e.employee_id = a.employee_id AND a.date = ?
        ORDER BY 
            e.employee_id;
    `;

    db.query(query, [date], (err, results) => {
        if (err) {
            console.error('Error fetching employee attendance information:', err);
            return res.status(500).json({ error: "An error occurred while fetching employee attendance information." });
        }

        return res.json(results);
    });
});

app.put("/attendance/employees/:id/:date", (req, res) => {
    const { id, date } = req.params;
    const { status } = req.body;
    const formattedDate = new Date(date).toISOString().split('T')[0];

    const query = `
        INSERT INTO attendance (employee_id, date, status)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE status = VALUES(status);
    `;

    db.query(query, [id, formattedDate, status], (err, result) => {
        if (err) {
            console.error('Error updating employee attendance status:', err);
            return res.status(500).json({ error: "An error occurred while updating employee attendance status." });
        }

        return res.json({ message: "Attendance status updated successfully." });
    });
});
app.get("/users", (req, res) =>{
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
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
