// array of questions for users, to create messages for the prompts later
const questions = ["What is your project name?", //message of title
    "Provide a short description of your project:", //message of description
    "What is the installation process to use your app?", //message of installation
    "Describe how users interact with your project:", //message of usage
    "Choose a type of licence for your project:", //message of licence list
    "Decribe how developer can contribute to your project", //message of contributing
    "Provide a link to test your deployed app:", //message of tests
    "Provide your github user name:", //1 contact of questions
    "Provide your email address" //2 contact of questions
];

//importing file systems module to append the generated readme file
const fs = require('fs');

//importing inquirer to get user's input
const inquirer = require('inquirer');

//importing axios to get responses from github api and grab license info
const axios = require('axios');

//importing util to promisify the prompst from inquirer
const util = require('util');


//String template literal of a good readme file

// function to write README file
function writeToFile(fileName, data) {}

// function to initialize program
function init() {

}

// function call to initialize program
init();