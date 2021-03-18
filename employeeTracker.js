const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//validate inputs
const validateInput = (input) => 
    !input ? "You must provide a response" : true;

const lettersOnly = (input) => 
!/^[A-Za-z_ ]+$/gi.test(input)
    ? "Names must only contain letters, who do you think you are Elon Musk?" : true;

//set up mysql connection

//inquirer prompts