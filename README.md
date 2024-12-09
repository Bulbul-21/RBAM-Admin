# **Role-Based Access Management**

A **React.js-based Role-Based Access Management System** that allows you to manage users, their roles, and permissions effectively. The project includes user management functionalities such as adding, editing, deleting users, toggling active/inactive statuses, and managing user roles.

---

## **Table of Contents**

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Setup Instructions](#setup-instructions)  
4. [Execution Steps](#execution-steps)  
5. [Project Structure](#project-structure)  
6. [How It Works](#how-it-works)  

---

## **Features**

1. **Login Page**: A login page with credentials for initial access (Username: Admin, Password: admin@123).  
2. **User Management**: Add, Edit, and Delete users.  
3. **Role Management**: Assign specific roles to users (e.g., Admin, User, etc.).  
4. **Status Management**: Toggle between **Active** and **Inactive** status for users.  
5. **Search Functionality**: Search users based on their details like name, email, status, and role.  
6. **Local Storage**: User data and role management persist in the browser's local storage.  
7. **Access Control**: Disable actions (Edit/Delete) for users marked as **Inactive**.

---

## **Technologies Used**

- **Frontend**: React.js  
- **Routing**: React Router DOM  
- **Icons**: FontAwesome  
- **CSS**: Custom CSS for styling  
- **State Management**: React `useState` and `useEffect` hooks  
- **Data Persistence**: LocalStorage  

---

## **Setup Instructions**

To set up and run this project on your local machine, follow these steps:

### **Prerequisites**

- **Node.js** (v14 or later)  
- **npm** (Node Package Manager)  
- **Code Editor** (e.g., VSCode)

---

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/role-based-access-management.git
cd role-based-access-management
```

---
### **2. Install Dependencies**

After cloning the repository, navigate to the project directory:

```bash
cd repository-name
```
Then install the required dependencies:

```bash
npm install
```

---
### **3. Start the Development Server**

To start the development server and view the application locally, run:

```bash
npm start
```
This will open the app in your default browser. The application will be available at http://localhost:3000.

---

### **Login Details (Important)**

- **Username**: Admin
- **Password**: admin@123
  
Upon successful login, the Admin will have access to the user management interface.

---

### **Usage Instructions**

Add Users: Click on the + Add User button and fill in the user's details (name, email, role, status). Click "Add" to save.
Edit Users: Click on the Edit button next to a user's name to modify their details.
Delete Users: Click on the Delete button next to a user's name to remove them from the list.
Search Users: Use the search bar to find users by name, email, or role.
Toggle User Status: Admin can toggle user status between "Active" and "Inactive".

---
### **Conclusion**
This project demonstrates role-based access management and basic CRUD operations. You can extend this by adding more roles and permissions, integrating with a backend for persistent data storage, and adding more features as needed.

