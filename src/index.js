import "./style.css";
import {Project, TodoItem} from  "./obj-module";
import { initialiseMenu, generateProjectPage, generateTodoPage } from "./dom-module";

const fns = require('date-fns');

const testProj = new Project("Test 1", "Project only to be used in testing");
const testProj2 = new Project("Test 2", "Project only to be used in testing");

console.log(Project.getAllProjects())

const curDate = new Date(0);
const curDate2 = fns.format(curDate, "yyyy-MM-dd' | 'HH:mm");

const testTodo = new TodoItem("Test the todolist", "Simply test the display of a Todo within a Project", 
  curDate2,
  "Pending", 
  "High", 
  ["Should be interesting", "Will provide insight."]
)

const testTodo2 = new TodoItem("Test the todolist again", "Simply test the display of a Todo within a Project", 
  curDate.toDateString(), 
  "In Progress", 
  "Complete",
  ["Should be interesting", "Will provide insight."]
)

testProj.addTodo(testTodo);
testProj.addTodo(testTodo2);

initialiseMenu();
generateProjectPage();
// generateTodoPage(testProj);
