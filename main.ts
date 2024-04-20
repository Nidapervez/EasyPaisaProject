#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgMagenta("******WELCOME TO EASYPAISA APP****"));
let balance = 100000;
let MyPin = 1234;
let condition = true;
while (condition) {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: "Enter your PIN",
            type: "number"
        }
    ]);
    if (pinAnswer.pin === MyPin) {
        console.log("Correct PIN code");
        const answers = await inquirer.prompt([
            {
                message: "Select the option",
                type: "list",
                name: "options",
                choices: ["Send balance", "Check balance", "Load Mobile balance"]
            }
        ]);
        if (answers.options === "Send balance") {
            let amount = await inquirer.prompt([
                {
                    type: "number",
                    name: "amount1",
                    message: "Enter the Amount to send"
                }
            ]);
            if (balance > amount.amount1) {
                balance -= amount.amount1;
                console.log(chalk.yellow(`Your remaining amount is ${balance}`));
            }
        }
        else if (answers.options === "Check balance") {
            console.log(chalk.bgGreen(`Your balance is ${balance}`));
        }
        else if (answers.options === "Load Mobile balance") {
            let mobbalance = await inquirer.prompt([
                {
                    name: "mobilebalance",
                    type: "number",
                    message: "Enter the amount to load mobile balance"
                }
            ]);
            if (balance > mobbalance.mobilebalance) {
                balance -= mobbalance.mobilebalance;
                console.log(chalk.red(`Your MobileBalance has been recharged. Your recharged amount is ${mobbalance.mobilebalance}`));
            }
        }
    }
    else {
        console.log("Wrong Pin code");
    }
    const answer2 = await inquirer.prompt([
        {
            type: "confirm",
            name: "tryagain",
            message: "Do you want to continue. If yes, press 'Y', else 'n'",
            default: false
        }
    ]);
    condition = answer2.tryagain;
}
