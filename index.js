// array of questions for users, to create messages for the prompts later
const questions = ["What is your project name?", //message of title
    "Provide a short description of your project:", //message of description
    "What is the installation process to use your app?", //message of installation
    "Describe how users interact with your project:", //message of usage
    "Choose a type of licence for your project:", //message of licence list
    "Decribe how developer can contribute to your project", //message of contributing
    "Provide a link to see the source code and test your app:", //message of tests
    "Provide your github user name:", //githubuser
    "Provide your email address" //email
];

//importing file systems module to append the generated readme file
const fs = require('fs');

//importing inquirer to get user's input
const inquirer = require('inquirer');

//importing axios to get responses from github api and grab license info
const axios = require('axios');
//Licenses choices array
const licenses = [];
//filling array with licenses
axios
    .get("https://api.github.com/licenses")
    .then(function(res) {
        res.data.forEach(element => {
            licenses.push(element.key);
        });
    });

//importing function modules from utils directory
const objMarkdown = require('./utils/generateMarkdown');


// function to write README file
function writeToFile(fileName, data) {

    //String template literal of a good readme file
    const goodReadmeTemplate = `${objMarkdown.generateMarkdownH1(data)}
        ${objMarkdown.generateMarkdownH2('Contents')}
        ${objMarkdown.generateMarkdownContentLink('Description')}
        ${objMarkdown.generateMarkdownContentLink('Installation')}
        ${objMarkdown.generateMarkdownContentLink('Usage')}
        ${objMarkdown.generateMarkdownContentLink('License')}
        ${objMarkdown.generateMarkdownContentLink('Contributing')}
        ${objMarkdown.generateMarkdownContentLink('Test')}
        ${objMarkdown.generateMarkdownContentLink('Questions')}
        
        ${objMarkdown.generateMarkdownH2('Description')}
        ${data.description}  
        
        ${objMarkdown.generateMarkdownH2('Installation')}
        ${data.installation}
        
        ${objMarkdown.generateMarkdownH2('Usage')}
        ${data.usage}

        ${objMarkdown.generateMarkdownH2('License')}
        ${data.license}

        
        ${objMarkdown.generateMarkdownH2('Test')}
        ${data.test}

        ${objMarkdown.generateMarkdownH2('Contributing')}
        ${data.contributing}

        ${objMarkdown.generateMarkdownH2('Questions')}
        contact: <${data.email}>
        Reach out @ [Github](https://github.com/${data.github})`;

    //Write the readme.md file to the system
    fs.writeFile(`${fileName}.md`, goodReadmeTemplate, 'utf8', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Successfully wrote a proffessional readme file for your project on the root directory of this app");
        }
    });
}

// function to initialize program
function init() {
    //Do prompts to collect user input
    inquirer.prompt([{
            type: "input",
            message: questions[0],
            name: "title"
        },
        {
            type: "input",
            message: questions[1],
            name: "description"
        },
        {
            type: "input",
            message: questions[2],
            name: "installation"
        },
        {
            type: "input",
            message: questions[3],
            name: "usage"
        },
        {
            type: "checkbox",
            message: questions[4],
            name: "license",
            choices: licenses

        },
        {
            type: "input",
            message: questions[5],
            name: "contributing"
        },
        {
            type: "input",
            message: questions[6],
            name: "test"
        },
        {
            type: "input",
            message: questions[7],
            name: "github"
        },
        {
            type: "input",
            message: questions[8],
            name: "email"
        }
    ]);

    //Call function to write readme from prompts
    writeToFile(inquirer.title, inquirer);
}

// function call to initialize program
init();