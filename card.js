#!/usr/bin/env node

'use strict';

const boxen = require('boxen');
const chalk = require('chalk');
const inquirer = require('inquirer');
const clear = require('clear');
const open = require('open');
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What you want to do?',
        choices: [
            {
                name: `Send me an ${chalk.green.bold('email')}?`,
                value: () => {
                    open('mailto:dishenmakwana.dm@gmail.com');
                    console.log('\nDone, see you soon at inbox.\n');
                },
            },
            {
                name: `Download my ${chalk.magentaBright.bold('Resume')}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request(
                        'https://drive.google.com/file/d/1aMbn7fvYVubsihHL98WtwJfARkM92O5J/view?usp=sharing'
                    ).pipe(fs.createWriteStream('./dishen-resume.html'));
                    pipe.on('finish', function () {
                        let downloadPath = path.join(
                            process.cwd(),
                            'dishen-resume.html'
                        );
                        console.log(
                            `\nResume Downloaded at ${downloadPath} \n`
                        );
                        open(downloadPath);
                        loader.stop();
                    });
                },
            },
            {
                name: 'Just quit.',
                value: () => {
                    console.log('Hasta la vista.\n');
                },
            },
        ],
    },
];

const data = {
    name: chalk.bold.green('             DISHEN MAKWANA'),
    github: chalk.gray('https://github.com/') + chalk.green('DishenMakwana'),
    linkedin:
        chalk.gray('https://linkedin.com/in/') + chalk.blue('dishen-makwana'),
    twitter: chalk.gray('https://twitter.com/') + chalk.cyan('DishenM'),
    web: chalk.cyan('dishenmakwana.github.io'),
    npx: chalk.red('npx') + ' ' + chalk.white('dishen'),

    labelGitHub: chalk.white.bold('     GitHub:'),
    labelLinkedIn: chalk.white.bold('   LinkedIn:'),
    labelTwitter: chalk.white.bold('    Twitter:'),
    labelWeb: chalk.white.bold('        Web:'),
    labelCard: chalk.white.bold('       Card:'),
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic('I am currently looking for new opportunities,')}`,
        `${chalk.italic('my inbox is always open. Whether you have a')}`,
        `${chalk.italic('question or just want to say hi, I will try ')}`,
        `${chalk.italic('my best to get back to you!')}`,
    ].join('\n'),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: 'single',
        borderColor: 'green',
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold('cmd/ctrl + click')} on the links above`,
    '',
].join('\n');
console.log(tip);

prompt(questions).then((answer) => answer.action());
