import {Project, TodoItem} from  "./obj-module";
export {  initialiseMenu ,generateProjectPage, generateTodoPage };

const contentDiv = document.getElementById("content");
let projectList = Project.getAllProjects();

// This function will initiaise clickable links on the sidebar
function initialiseMenu() {
  projectList = Project.getAllProjects();
  const sidebarDiv = document.getElementById("sidebar");
  const sbAddTodoButt = document.getElementById("sb-addtodo");
  const sbNewProjButt = document.getElementById("sb-newproj");
  const sbViewProjButt = document.getElementById("sb-viewproj");

  sbAddTodoButt.addEventListener("click", () => {
    generateAddTodo(projectList);
  })

  sbNewProjButt.addEventListener("click", () => {
    generateNewProject(projectList);
  })

  sbViewProjButt.addEventListener("click", () => {
    generateProjectPage(projectList);
  })

  loadSidebarProjectList(projectList);
}

function loadSidebarProjectList(projectList) {
  const sbProjectList = document.getElementById("sb-project-list")
  clearSidebarProjectList(); // Clear current projects
  const projUL = document.createElement("ul");

  for (let project of projectList) {
    const projLI = document.createElement("li");
    const projLink = document.createElement("a");
    projLink.textContent = project.getTitle();

    projLI.appendChild(projLink);
    projUL.appendChild(projLI);

    projLink.onclick = (e) => {
      e.preventDefault;
      generateTodoPage(project);
    }
  }
  sbProjectList.appendChild(projUL);
}


function clearSidebarProjectList() {
  const sbProjectList = document.getElementById("sb-project-list")
  sbProjectList.replaceChildren("");
}


function generateProjectPage() {
  contentDiv.replaceChildren("");

  const contentTitle = document.createElement("h1");
  contentTitle.textContent = "Projects:"; 

  const projListDiv = document.createElement("div");
  projListDiv.setAttribute("id", "project-list");

  for (let project of projectList) {
    const projDiv = document.createElement("div");
    projDiv.setAttribute("class", "project-item");

    const titleElement = document.createElement("h2");
    const descElement = document.createElement("p");
    titleElement.textContent = project.getTitle();
    descElement.textContent = project.getDescription();

    projDiv.appendChild(titleElement);
    projDiv.appendChild(descElement)
    projListDiv.appendChild(projDiv);

    projDiv.onclick = () => {
      generateTodoPage(project)
    }
  }
contentDiv.appendChild(contentTitle);
contentDiv.appendChild(projListDiv);
}

function generateAddTodo() {
  const bodyElement = document.getElementsByTagName("body");
  // Main container head elements
  const containerDiv = document.createElement("div");
  containerDiv.setAttribute("id", "new-container");
  const formElement = document.createElement("form");
  formElement.setAttribute("id", "new-form");
  const h1Element = document.createElement("h1");
  h1Element.textContent = "Add Task";
  const exitElement = document.createElement("button");
  exitElement.textContent = "X";
  exitElement.setAttribute("id", "new-form-exit");
  exitElement.onclick = (e) => {
    e.preventDefault();
    containerDiv.remove(); 
  }

  formElement.appendChild(h1Element);
  formElement.appendChild(exitElement);
  // Content for AddTodo specificly
  const ulElement = document.createElement("ul");

  const taskProjLi = document.createElement("li");
  const taskProjLabel = document.createElement("label");
  taskProjLabel.setAttribute("for", "taskproj");
  taskProjLabel.textContent = "Project:";
  const taskProjSelect = document.createElement("select");
  taskProjSelect.setAttribute("id", "taskproj");
  for (let project of projectList) {
    const projOption = document.createElement("option");
    projOption.setAttribute("value", project.getId());
    projOption.textContent = project.getTitle();
    taskProjSelect.appendChild(projOption);
  }
  taskProjLi.appendChild(taskProjLabel);
  taskProjLi.appendChild(taskProjSelect);
  ulElement.appendChild(taskProjLi);

  const taskNameInput = addBasicFormInput("taskname", "Name:", "text", ulElement);
  const taskDescInput = addBasicFormInput("taskdesc", "Description:", "text", ulElement);
  const  taskDateInput = addBasicFormInput("taskdate", "Due Date:", "date", ulElement);

  const taskStatusLi = document.createElement("li");
  const taskStatusLabel = document.createElement("label");
  taskStatusLabel.setAttribute("for", "taskstatus");
  taskStatusLabel.textContent = "Initial Status:";
  const taskStatusSelect = document.createElement("select");
  taskStatusSelect.setAttribute("id", "taskstatus");
  const statusOptionList = ["Pending", "In Progress", "Complete"];
  for (let option of statusOptionList) {
    const projOption = document.createElement("option");
    projOption.setAttribute("value", option);
    projOption.textContent = option;
    taskStatusSelect.appendChild(projOption);
  }
  taskStatusLi.appendChild(taskStatusLabel);
  taskStatusLi.appendChild(taskStatusSelect);
  ulElement.appendChild(taskStatusLi);

  const taskPrioLi = document.createElement("li");
  const taskPrioLabel = document.createElement("label");
  taskPrioLabel.setAttribute("for", "taskprio");
  taskPrioLabel.textContent = "Initial Priority:";
  const taskPrioSelect = document.createElement("select");
  taskPrioSelect.setAttribute("id", "taskprio");
  const prioOptionList = ["Low", "Medium", "High"];
  for (let option of prioOptionList) {
    const projOption = document.createElement("option");
    projOption.setAttribute("value", option);
    projOption.textContent = option;
    taskPrioSelect.appendChild(projOption);
  }
  taskPrioLi.appendChild(taskPrioLabel);
  taskPrioLi.appendChild(taskPrioSelect);
  ulElement.appendChild(taskPrioLi);

  // const taskPrio = addBasicFormInput("taskprio", "Priority:", "text", ulElement);

  const taskNoteButton = addBasicFormInput("tasknotebutt", "Notes:", "button", ulElement);
  taskNoteButton.setAttribute("value", "Add Note");
  const taskNotesDiv = document.createElement("div");
  taskNotesDiv.setAttribute("id", "tasknotes");
  const taskNotesList = [];
  taskNoteButton.addEventListener("click", () => {
    let note = prompt("Please enter your note", "");
    addTaskNote(taskNotesDiv, note);
    taskNotesList.push(note);
  })
  ulElement.appendChild(taskNotesDiv);

  const submitFormButton = document.createElement("button");
  
  submitFormButton.setAttribute("type", "submit");
  submitFormButton.setAttribute("id", "form-submit");
  submitFormButton.textContent = "Create";
  submitFormButton.addEventListener("click", (e) => {
    e.preventDefault();
  
    const selectedProjectId = taskProjSelect.value; // Get the selected project ID
    const newTaskProject = Project.getProjectById(selectedProjectId); // Retrieve the project from the class Map
  
    if (newTaskProject) {
      const newTaskName = taskNameInput.value;
      const newTaskDesc = taskDescInput.value;
      const newTaskDate = taskDateInput.value;
      const newTaskStatus = taskStatusSelect.value;
      const newTaskPriority = taskPrioSelect.value;
  
      const newTask = new TodoItem(
        newTaskName,
        newTaskDesc,
        newTaskDate,
        newTaskStatus,
        newTaskPriority,
        taskNotesList
      );
  
      newTaskProject.addTodo(newTask); // Add the task to the selected project
      containerDiv.remove(); // Remove the whole container to give user control back
      console.log(newTaskProject.getTodoList());
    } else {
      console.error("Invalid project selected");
    }
  });

  ulElement.appendChild(submitFormButton);
  formElement.appendChild(ulElement);
  containerDiv.appendChild(formElement);
  bodyElement[0].appendChild(containerDiv);
}

function generateNewProject() {
  const bodyElement = document.getElementsByTagName("body");
  // Main container head elements
  const containerDiv = document.createElement("div");
  containerDiv.setAttribute("id", "new-container");
  const formElement = document.createElement("form");
  formElement.setAttribute("id", "new-form");
  const h1Element = document.createElement("h1");
  h1Element.textContent = "New Project";
  const exitElement = document.createElement("button");
  exitElement.textContent = "X";
  exitElement.setAttribute("id", "new-form-exit");
  exitElement.onclick = (e) => {
    e.preventDefault();
    containerDiv.remove(); 
  }
  formElement.appendChild(h1Element);
  formElement.appendChild(exitElement);

  // Content for NewProject specificly
  const ulElement = document.createElement("ul");
  const titleInput = addBasicFormInput("projtitle", "Project Title:", "text", ulElement);
  const descInput = addBasicFormInput("projdesc", "Project Description:", "textbox", ulElement);

  const submitFormButton = document.createElement("button");
  submitFormButton.setAttribute("type", "submit");
  submitFormButton.setAttribute("id", "form-submit");
  submitFormButton.textContent = "Create";
  submitFormButton.addEventListener("click", (e) => {
    e.preventDefault();
  
      const newProjTitle = titleInput.value;
      const newProjDesc = descInput.value;
  
      const newProj = new Project(
        newProjTitle,
        newProjDesc,
      );

      containerDiv.remove(); // Remove the whole container to give user control back
      projectList = Project.getAllProjects();
      loadSidebarProjectList(Project.getAllProjects());
      console.log(projectList);
  });

  ulElement.appendChild(submitFormButton);
  formElement.appendChild(ulElement);
  containerDiv.appendChild(formElement);
  bodyElement[0].appendChild(containerDiv);


  console.log(Project.getAllProjects())
}


// Creates a li element and places a input within it based on constructor with a label.
// Also appemds each element within the li, and appends to a target.
function addBasicFormInput(id, textContent, type, appendTarget) {
  const li = document.createElement("li");
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = textContent;
  const input = document.createElement("input");
  input.setAttribute("id", id);
  input.setAttribute("type", type);
  li.appendChild(label);
  li.appendChild(input);
  appendTarget.appendChild(li);
  return input; // Maybe necessary for form submission
}


// Used to add a note to the HTML
function addTaskNote(taskNotesDiv, note) {
  const noteDiv = document.createElement("div");
  const notePara = document.createElement("p");
  const noteRemove = document.createElement("button");
  noteRemove.setAttribute("class", "remove-note");
  noteRemove.textContent = "x"
  notePara.textContent = note;

  noteRemove.addEventListener("click", () => {
    noteDiv.replaceChildren("");
    noteDiv.remove();
  })

  noteDiv.appendChild(notePara);
  noteDiv.appendChild(noteRemove);
  taskNotesDiv.appendChild(noteDiv);
}


function generateTodoPage(project) {
  contentDiv.replaceChildren("");

  const contentTitle = document.createElement("h1");
  contentTitle.textContent = `${project.getTitle()} - To-do List:`; 

  const todoListDiv = document.createElement("div");
  todoListDiv.setAttribute("id", "todo-list");

  const todoList = project.getTodoList();
  for (let todo of todoList) {
    const todoDiv = document.createElement("div");
    generateTodoItem(todo, todoDiv);
    todoListDiv.appendChild(todoDiv);
  }
contentDiv.appendChild(contentTitle);
contentDiv.appendChild(todoListDiv);
}


function generateTodoItem(todo, todoDiv) {

  const titleElement = document.createElement("h2");
  const priorityElement = document.createElement("p");
  const dateElement = document.createElement("p");
  const statusElement = document.createElement("p");
  
  titleElement.textContent = todo.getTitle();
  priorityElement.textContent = `Priority: ${todo.getPriority()}`;
  dateElement.textContent = `Due Date: ${todo.getDueDate()}`;
  statusElement.textContent = `Status: ${todo.getStatus()}`;

  todoDiv.setAttribute("class", "todo-item");
  todoDiv.appendChild(titleElement);
  todoDiv.appendChild(priorityElement);
  todoDiv.appendChild(dateElement);
  todoDiv.appendChild(statusElement);

  todoDiv.onclick = () => toggleTodoItem(todo, todoDiv);
}


function toggleTodoItem(todo, todoDiv) {
  const isExpanded = todoDiv.classList.contains("todo-item-expand");

  if (isExpanded) {
    // Collapse logic for todoDiv
    todoDiv.replaceChildren(""); 
    generateTodoItem(todo, todoDiv);
  } else {
    // Expand logic for todoDiv
    const todoDesc = document.createElement("p");
    const notesPara = document.createElement("p");
    const notesUL = document.createElement("ul");

    todoDesc.textContent = `Description: ${todo.getDescription()}`;
    notesPara.textContent = "Notes:";

    for (const note of todo.getNotes()) {
      const noteLI = document.createElement("li");
      noteLI.textContent = note;
      notesUL.appendChild(noteLI);
    }

    todoDiv.setAttribute("class", "todo-item-expand");
    todoDiv.appendChild(todoDesc);
    todoDiv.appendChild(notesPara);
    todoDiv.appendChild(notesUL);

    todoDiv.onclick = () => toggleTodoItem(todo, todoDiv);
  }
}
