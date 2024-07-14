const inquirer = require('inquier');
const { join } =  require('path');
const { writeFile } = require('fs/promises');
const { createDocument } = require('./document');

class CLI {
    constructor() {
        this.logo = '';

        this.info = [];
    }
    run() {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'logo',
                    message: "Please enter a logo that is 3 characters",
                },
            ])
            .then(({ name }) => {
                this.logo = `${name}`;
                return this.addInfo();
            })
            .then(() => {
                return writeFile(
                    join(__dirname, '..', 'output', 'logos.svg'),
                    createDocument(this.logo, this.info)
                );
            })
            .then(() => console.log('Created Logo'))
            .catch((err) => {
                console.log(err);
                console.log('Something didnt work')
            });
    } 
}

addInfo() {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'color',
                message: 'chose a text color, Red, Green, Blue',
                choices: [R, G, B],
            },
            {
                type: 'list',
                name: 'shapes',
                message: 'chose a shape, Triangle, Circle, Square',
                choices: [Triangle, Cirlcle, Square],
            },
        ])
        .then(({ color, shapes }) => {
            this.info.push({ color, shapes});
        });
}

module.exports = CLI;