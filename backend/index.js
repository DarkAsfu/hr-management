import express from 'express';
import mysql from 'mysql';

const app = express();
app.use(express.json());

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
    const q = "INSERT INTO employees SET ?";
    const values = req.body;
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Employee added successfully.");
    });
});

app.put("/employees/:id", (req, res) => {
    const q = "UPDATE employees SET ? WHERE employee_id = ?";
    const values = [req.body, req.params.id];
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Employee updated successfully.");
    });
});

app.delete("/employees/:id", (req, res) => {
    const q = "DELETE FROM employees WHERE employee_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Employee deleted successfully.");
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
