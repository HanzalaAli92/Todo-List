#! /usr/bin/env node

import inquirer from  'inquirer';
import chalk  from "chalk";

//Interface 
//Array     
//Function  
//Operator

interface TodoList {
     task: string;
     completed: boolean;
}

//array
let  todoList : TodoList [] = [];

//function

async function addMore() {
    let {action} = await inquirer.prompt(
        {
        name: "action",
        type: "list",
        message:chalk.greenBright('What do you want to do?'),
        choices:["Add Task","View List","Mark as Complete","Delete Task","Quit"]
        }
    );
    switch (action) {
        case "Add Task":
        await addTask();
            break;
        case "View List":
             viewList();
             break;
        case "Mark as Complete":
        await markComplete();
            break;
        case "Delete Task":
        await deleteTask();
            break;
        case "Quit":
        console.log(chalk.yellow("Goodbye!\nHave a nice day"));
            return;
    }
    addMore();
}  
let addTask = async () => {
        let {task} = await inquirer.prompt(
            {
            name:"task",
            type:"input",
            message:chalk.blueBright('Enter the task?'),
            }
        );
    todoList.push({task,completed:false});
    console.log (chalk.cyanBright("task added successfully:"));
};
let viewList = () => {
    console.log(chalk.blueBright("***Assalam-e-Walikum***\n**Here is your To Do List**\n"));
    todoList.forEach((item, index) => {
        console.log(chalk.green(`${index + 1}.[${item.completed ? 'x' : ''} ] ${item.task}`));
    });
    console.log(chalk.cyanBright("\nPress any key to continue..."));
}
let markComplete = async () => {
    let {which}=await inquirer.prompt(
        {   
        name: "which",
        type: "number",
        message:chalk.cyanBright('Which one do you want to complete?')
        },
   );
   if (which < 1 || which > todoList.length){
    console.log(chalk.yellow("Invalid Input.Please enter a valid number:"));
    return;
   }
   todoList [which - 1].completed=true;
   console.log(chalk.green("task marked completed:"));
}
let deleteTask = async () => {
    let {index} =await inquirer.prompt(
        {
        type:"number",
        name:"index",
        message:chalk.redBright('Delete Which Task?')
        },
    );
    if (index < 1 || index > todoList.length){
     console.log(chalk.red("Invalid task number Please try again:"))
     return ;
    }
     todoList.splice(index - 1 , 1);
     console.log(chalk.cyanBright("task deleted successfully:"));
}
addMore();
