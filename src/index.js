import "./style.css";
import {Project, TodoItem} from  "./obj-module";
import { initialiseMenu, generateProjectPage, generateTodoPage } from "./dom-module";

const fns = require('date-fns');

Project.loadFromLocalStorage();
console.log(Project.getAllProjects());

if (Project.getAllProjects().length == 0) {
  const testProj = new Project("Default Project", "Basic project used as an example.");
  const testProj2 = new Project("Default Project 2", "A second basic project to start with");

  console.log(Project.getAllProjects())

  const testTodo = new TodoItem("Test the todolist", "Simply test the display of a Todo within a Project", 
    "2024-12-03",
    "Pending", 
    "High", 
    ["Should be interesting", "Will provide insight."]
  )

  const testTodo2 = new TodoItem("Test the todolist again", "Simply test the display of a Todo within a Project", 
    "2024-12-05", 
    "In Progress", 
    "Complete",
    ["Couldn't be less interesting", "Will reduce insight.", "Here's another note because why not."]
  )

  testProj.addTodo(testTodo);
  testProj.addTodo(testTodo2);
}


initialiseMenu();
generateProjectPage();
// generateTodoPage(testProj);
