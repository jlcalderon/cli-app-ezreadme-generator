// array of questions for users, to create messages for the prompts later
const questions = ["What is your project name?", //message of title
    "Provide a short description of your project:", //message of description
    "What is the installation process to use your app?", //message of installation
    "Describe how users interact with your project:", //message of usage
    "Choose one type of licence for your project:", //message of licence list
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
let licenseResponse;
let lic;

axios
    .get("https://api.github.com/licenses")
    .then(function(res) {
        licenseResponse = res.data;
        res.data.forEach(element => {
            licenses.push(element.key);
        });
    });

//importing function modules from utils directory
const objMarkdown = require('./utils/generateMarkdown');


// function to write README file
function writeToFile(fileName, data) {
    let badge = '';
    const expr = data.license;
    switch (expr) {
        case 'agpl-3.0':
            badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
            break;
        case 'apache-2.0':
            badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            break;
        case 'bsd-2-clause':
            badge = '[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)';
            break;
        case 'bsd-3-clause':
            badge = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
            break;
        case 'bsl-1.0':
            badge = '[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
            break;
        case 'cc0-1.0':
            badge = '[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)';
            break;
        case 'epl-2.0':
            badge = '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)';
            break;
        case 'gpl-2.0':
            badge = '[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)';
            break;
        case 'gpl-3.0':
            badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
            break;
        case 'lgpl-2.1':
            badge = '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)';
            break;
        case 'mit':
            badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            break;
        case 'mpl-2.0':
            badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
            break;
        case 'unlicense':
            badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
            break;
        default:
            console.log(`Sorry we are running out of ${expr}`);
    }
    //String template literal of a good readme file
    const goodReadmeTemplate = `${objMarkdown.generateMarkdownH1(data)} ${badge}

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
[${lic.name}](${lic.url})



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
    ]).then((inquirer) => {
        //Call function to write readme from prompts
        lic = licenseResponse.filter((element) => element.key === inquirer.license);
        writeToFile(inquirer.title, inquirer);
    });

}

// function call to initialize program
init();