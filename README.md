# HR Management System

## Overview
This project is a comprehensive HR Management System built with modern web technologies including React, Tailwind CSS, Node.js, Express, and MySQL. It integrates Firebase Authentication for secure email/password and Google sign-in.

## Features
- **Dashboard**: Displays total number of employees, departments, and department-wise employee counts.
- **Employee Management**: View all employees in a table with options to view details, update, and delete records.
- **Add Employee**: Create new employee profiles.
- **Employee Attendance**: Manage and track employee attendance.
- **Department-wise Employee Info**: View detailed information of employees categorized by departments.

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: Firebase Authentication (Email/Password and Google Sign-In)

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- MySQL
- Firebase project (for authentication)

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/DarkAsfu/hr-management.git
   cd hr-management
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Setup MySQL Database**
   - Create a new MySQL database.
   - Import the SQL schema provided in the `db/schema.sql` file.

5. **Configure environment variables**
   - Create a `.env` file in the `server` directory and add the following:
     ```env
     DB_HOST=your_db_host
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=your_db_name
     FIREBASE_API_KEY=your_firebase_api_key
     FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     FIREBASE_PROJECT_ID=your_firebase_project_id
     FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     FIREBASE_APP_ID=your_firebase_app_id
     ```

6. **Run the development server**
   - Start the backend server:
     ```bash
     cd server
     npm run dev
     ```
   - Start the frontend development server:
     ```bash
     cd ../client
     npm start
     ```

### Usage
- **Dashboard**: Provides an overview of the total number of employees and departments.
- **All Employees**: View and manage all employee records.
- **Add Employee**: Create a new employee profile.
- **Employee Attendance**: Track employee attendance.
- **Department Info**: View department-wise employee details.

## Screenshots
Include relevant screenshots of your application here.

## Contributing
If you wish to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or feedback, please contact [ashraful.islam0871@gmail.com](mailto:ashraful.islam0871@gmail.com).
![image](https://github.com/DarkAsfu/hr-management/assets/121676628/ef0edd4d-f8d3-42b8-bb8d-cf91d39d2741)
![image](https://github.com/DarkAsfu/hr-management/assets/121676628/fce8af24-730e-4e5d-bf74-93aa33b6bb3d)
![image](https://github.com/DarkAsfu/hr-management/assets/121676628/b3cde43a-b2e6-4067-97d3-1e793045c9ee)
![image](https://github.com/DarkAsfu/hr-management/assets/121676628/b54f3b81-d231-4313-b9fe-672a2be42fac)
![image](https://github.com/DarkAsfu/hr-management/assets/121676628/5848c292-e499-4eb2-a68d-bf1ab101e697)
![image](https://github.com/DarkAsfu/hr-management/assets/121676628/3760e03b-0250-4cbb-b7c8-36ce42018dce)
![image](https://github.com/DarkAsfu/hr-management/assets/121676628/910d96d3-e508-49af-a0ae-818b1d8f0981)
![image](https://github.com/DarkAsfu/hr-management/assets/121676628/0f86bd36-0630-409b-b5b5-041eb296853e)
![image](https://github.com/DarkAsfu/hr-management/assets/121676628/3d60304f-9b25-4575-a15a-f61bfebc6401)


---

Thank you for checking out my project! If you like it, please give it a star ⭐ on GitHub!

---

