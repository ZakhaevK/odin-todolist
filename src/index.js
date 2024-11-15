import "./style.css";
import {Project, TodoItem} from  "./obj-module";
import { generateProjectPage } from "./dom-module";


const testProj = new Project("Test 1", "Project only to be used in testing");
const testProj2 = new Project("Test 2", "Project only to be used in testing");

const projectList = [testProj, testProj2];

const testTodo = new TodoItem("Test the todolist", "Simply test the display of a Todo within a Project", 
  Date.now(), 
  "High", 
  ["Should be interesting", "Will provide insight."]
)

testProj.addTodo(testTodo);

 generateProjectPage(projectList);