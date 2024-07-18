const inquirer = require('inquirer');
const fs = require('fs');

function init() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'logo',
                message: 'What is your 3 letter logo',
                validate: function(input) {
                    if (input.length !== 3) {
                        return 'Logo must be exactly 3 characters long';
                    }
                    return true;
                }
            },
            {
                type: 'list',
                name: 'color',
                message: 'Choose a text color',
                choices: ['Red', 'Green', 'Blue'],
            },
            {
                type: 'list',
                name: 'shape',
                message: 'Choose a shape',
                choices: ['Triangle', 'Circle', 'Square'],
            },
        ])

        .then((answers) => {
            let shapeElement;

            switch (answers.shape) {
                case 'Triangle':
                    shapeElement = `<polygon points="150,20 100,180 200,180" fill="${answers.color}" />`;
                    break;
                case 'Circle':
                    shapeElement = `<circle cx="300" cy="200" r="200" fill="${answers.color}" />`;
                    break;
                case 'Square':
                    shapeElement = `<rect x="70" y="20" width="160" height="160" fill="${answers.color}" />`;
                    break;
                default:
                    shapeElement = `<circle cx="150" cy="100" r="80" fill="${answers.color}" />`; // Default to circle if shape is not recognized
            }

            const LogoPageContent = generateINDEX(answers, shapeElement);

            fs.writeFile('logo.svg', LogoPageContent, (err) =>
                err ? console.log(err) : console.log('Successfully created Logo')
            );
        });
}

const generateINDEX = ({ logo, color, shape }, shapeElement) => {
    let cx = 300; 
    let cy = 200; 
    let textY = 200; 

    switch (shape) {
        case 'Triangle':
            shapeElement = `<polygon points="300,50 100,350 500,350" fill="${color}" />`;
            textY = 250; 
            break;
        case 'Circle':
            shapeElement = `<circle cx="${cx}" cy="${cy}" r="200" fill="${color}" />`;
            break;
        case 'Square':
            shapeElement = `<rect x="200" y="100" width="200" height="200" fill="${color}" />`;
            textY = 225;
            break;
        default:
            shapeElement = `<circle cx="${cx}" cy="${cy}" r="200" fill="${color}" />`; // Default to circle if shape is not recognized
    }

    return `
            <svg version="1.1" width="600" height="400" xmlns="http://www.w3.org/2000/svg">
                ${shapeElement}
                <text x="${cx}" y="${textY}" font-size="120" text-anchor="middle" fill="white">${logo}</text>
            </svg>  
            `;
};

init();