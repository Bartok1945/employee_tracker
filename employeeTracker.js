const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const util = require("util");


//validate inputs
const validateInput = (input) =>
    !input ? "You must provide a response" : true;

const letterValidation = (input) =>
    !/^[A-Za-z_ ]+$/gi.test(input)
        ? "Names must only contain letters, who do you think you are Elon Musk?" : true;

//set up mysql connection

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "S1lent0ldMtn$",
    database: "employees_db",



});

dbConnection.connect(function (err) {
    if (err) throw err;
    selectMenu();
},
    console.log("MySQL Connection Successful!"));


    const queryAsync = util.promisify(dbConnection.query).bind(dbConnection);

// Function receives query string/prompt responses and gets data from database
const getResults = async (query, values = []) => {
  try {
    const results = await queryAsync(query, values);
    return results;
  } catch {
    console.log("ERROR CAN NOT COMPUTE!");
    dbConnection.end();
  }
};
// Get list of employee names and IDs
const getEmployeeNames = async () => {
  let query = "SELECT id, first_name, last_name FROM employee;";
  const allEmployees = await queryAsync(query);
  return allEmployees.map((employee) => ({
    value: employee.id,
    name: `${employee.first_name} ${employee.last_name}`,
  }));
};

// Get list of roles and IDs
const getRoles = async () => {
  let query = "SELECT id, title FROM role";
  const roles = await queryAsync(query);
  return roles.map((role) => ({ value: role.id, name: role.title }));
};

// Get list of department names and IDs
const getDepartments = async () => {
  let query = "SELECT id, name FROM department";
  const depts = await queryAsync(query);
  return depts.map((dept) => ({ value: dept.id, name: dept.name }));
};

// Get list of manager names and IDs
const getManagers = async () => {
  let query = "SELECT * FROM employee WHERE manager_id IS NULL";
  const managers = await queryAsync(query);
  return managers.map((manager) => ({
    value: manager.id,
    name: `${manager.first_name} ${manager.last_name}`,
  }));
};

 

//inquirer prompts

//Menu

const selectMenu = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "Please make a selection",
                choices: [
                    "Add department",
                    "Add role",
                    "Add employee",
                    "View department",
                    "View Roles",
                    "View employees",
                    "Update employees",
                    "Exit"
                ],
            },
        ])
        .then(function(response) {
            switch (response.choice){
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "View department":
                    viewDepartment();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View employees":
                    viewEmployees();   
                    break;                 
                case "Update employees":
                    updateEmployees();
                    break;
                case "Exit":
                    dbConnection.end();
                  default:
                    console.log("Good Bye Human.");
            }
        });
        
        
};

//Add department

const addDepartment = () => {
    inquirer
        .prompt({
            type: "input",
            name: "deptName",
            message: "Name of new department: ",
            validate: validateInput,
        })
        .then((response) => {
          let query = "INSERT INTO department (name) VALUES (?)";
          getResults(query, [response.deptName]);
          console.log(`${response.deptName} has been added to Departments`);
          console.log("\n");
          selectMenu();
        });
    };

//Add Role

const addRole = async () => {
  const depts = await getDepartments();
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Title for new role: ",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Salary for new role: ",
      },
      {
        type: "list",
        name: "roleDept",
        message: "Which department does this new role belong in: ",
        choices: [...depts],
      },
    ])
    .then((response) => {
      let query =
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      getResults(query, [
        response.roleTitle,
        response.roleSalary,
        response.roleDept,
      ]);
      console.log(`${response.roleTitle} has been added to Roles`);
      selectMenu();
    });
};

//Add Employee
const addEmployee = async () => {
  const roles = await getRoles();
  const managers = await getManagers();
  inquirer
    .prompt([
      {
        type: "name",
        name: "empFirstName",
        message: "New Employee's First Name: ",
        validate: letterValidation,
      },
      {
        type: "name",
        name: "empLastName",
        message: "New Employee's Last Name: ",
        validate: letterValidation,
      },
      {
        type: "list",
        name: "empRole",
        message: "New Employee's Role: ",
        choices: [...roles],
      },
      {
        type: "list",
        name: "empManager",
        message: "New Employee's Manager: ",
        choices: [...managers],
      },
    ])
    .then((response) => {
      let query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      getResults(query, [
        response.empFirstName,
        response.empLastName,
        response.empRole,
        response.empManager,
      ]);
      console.log(
        `${response.empFirstName} ${response.empLastName} has been added to Employees!`
      );
      console.log("\n");
      selectMenu();
    });
};


//View department
const viewDepartment = async () => {
  const depts = await getDepartments();
  inquirer
    .prompt({
      type: "list",
      name: "deptID",
      message: "Select A Department to View Employees: ",
      choices: [...depts],
    })
    .then(async (response) => {
      let query = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department
        FROM employee e
        INNER JOIN role ON e.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        WHERE department.id = ?
        ORDER BY ID ASC;`;
        const employeesByDept = await getResults(query, [response.deptID])
        console.log("\n");
        console.table(employeesByDept);
        selectMenu();
      });
};

//View roles



const viewRoles = async () => {
  const roles = await getRoles();
  inquirer
    .prompt({
      type: "list",
      name: "roleID",
      message: "Select A Role to View Employees: ",
      choices: [...roles],
    })
    .then(async (response) => {
      let query = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title
      FROM employee e
      INNER JOIN role ON e.role_id = role.id
      WHERE role.id = ?
      ORDER BY ID ASC;`;
      const employeesByRole = await getResults(query, [response.roleID])
        console.log("\n");
        console.table(employeesByRole);
        selectMenu();
      });
};

//View employees
const viewEmployees = async () => {
  let query = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name',
  role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager
  FROM employee e
  LEFT JOIN employee m
  ON e.manager_id = m.id
  INNER JOIN role
  ON e.role_id = role.id
  INNER JOIN department ON role.department_id = department.id
  ORDER BY ID ASC;`;
  const allEmployees = await getResults(query);
  console.log("\n");
  console.table(allEmployees);
  selectMenu();
};
 
  
  const updateEmployees = async () => {
    const employeeNames = await getEmployeeNames();
    const roles = await getRoles();
    inquirer
      .prompt([
        {
          type: "list",
          name: "empID",
          message: "Select an Employee to Update Role: ",
          choices: [...employeeNames],
        },
        {
          type: "list",
          name: "roleID",
          message: "Select Their New Role:",
          choices: [...roles],
        },
      ])
      .then(async (response) => {
        console.log("\n");
        let query = "UPDATE employee SET role_id=? WHERE employee.id=?";
        getResults(query, [response.roleID, response.empID]);
        console.log(`Employee's Role has been updated!`);
        console.log("\n");
        selectMenu();
      });
  };
  
  
  
