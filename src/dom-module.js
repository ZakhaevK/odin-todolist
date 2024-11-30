
export {  initialiseMenu ,generateProjectPage, generateTodoPage };

// This function will initiaise clickable links on the sidebar
function initialiseMenu(projectList) {
  const sidebarDiv = document.getElementById("sidebar");
  const sbAddTodoButt = document.getElementById("sb-addtodo");
  const sbNewProjButt = document.getElementById("sb-newproj");
  const sbViewProjButt = document.getElementById("sb-viewproj");

  sbViewProjButt.addEventListener("click", () => {
    generateProjectPage();
  })

  loadSidebarProjectList(projectList);
}

function loadSidebarProjectList(projectList) {
  const sbProjectList = document.getElementById("sb-project-list")
  const projUL = document.createElement("ul");

  clearSidebarProjectList(); // Clear current projects

  for (let project of projectList) {
    const projLI = document.createElement("li");
    const projLink = document.createElement("a");
    projLink.textContent = project.getTitle();
    projLink.setAttribute("href", ""); // Placeholder

    projLI.appendChild(projLink);
    sbProjectList.appendChild(projLI);
  }
}

function clearSidebarProjectList() {
  const sbProjectList = document.getElementById("sb-project-list")
  sbProjectList.replaceChildren("");
}

const contentDiv = document.getElementById("content");

function generateProjectPage(projectList) {
  contentDiv.replaceChildren("");

  const contentTitle = document.createElement("h1");
  contentTitle.textContent = "Projects:"; 

  const projListDiv = document.createElement("div");
  projListDiv.setAttribute("id", "project-list");

  for (let project of projectList) {
    const projDiv = document.createElement("div");
    projDiv.setAttribute("class", "project-item")

    const titleElement = document.createElement("h2");
    const descElement = document.createElement("p");
    titleElement.textContent = project.getTitle();
    descElement.textContent = project.getDescription();

    projDiv.appendChild(titleElement);
    projDiv.appendChild(descElement)
    projListDiv.appendChild(projDiv);
  }
contentDiv.appendChild(contentTitle);
contentDiv.appendChild(projListDiv);
}

function generateAddTodo(projectList) {
  const body = Document.getElementByTagName("body");
  // Main container head elements
  const containerDiv = Document.createElement("div");
  containerDiv.setAttribute("id", "new-container");
  const formElement = Document.createElement("form");
  formElement.setAttribute("id", "new-form");
  const h1Element = Document.createElement("h1");
  h1Element.textContent = "Add Task";
  const exitElement = Document.createElement("new-form-exit");
  exitElement.textContent = "X";
  exitElement.setAttribute("id", "new-form-exit");
  // Content for AddTodo specificly
  const ulElement = Document.createElement("ul");

  const taskProjLi = Document.createElement("li");
  const taskProjLabel = Document.createElement("label");
  taskProjLabel.setAttribute("for", "taskproj");
  taskProjLabel.textContent = "Project:";
  const taskProjSelect = Document.createElement("select");
  taskProjSelect.setAttribute("id", "taskproj");
  for (let project of projectList) {
    const projOption = document.createElement("option");
    projOption.setAttribute("value", project.getTitle());
    projOption.textContent = project.getTitle();
    taskProjSelect.appendChild(projOption);
  }
  taskProjLi.appendChild(taskProjLabel);
  taskProjLi.appendChild(taskProjSelect);
  ulElement.appendChild(taskProjLi);

  taskNameInput = addBasicInputElement("taskname", "Name:", "text", ulElement);
  taskDescInput = addBasicInputElement("taskdesc", "Description:", "text", ulElement);
  taskDateInput = addBasicInputElement("taskdate", "Due Date:", "date", ulElement);

  const taskStatusLi = Document.createElement("li");
  const taskStatusLabel = Document.createElement("label");
  taskStatusLabel.setAttribute("for", "taskstatus");
  taskStatusLabel.textContent = "Initial Status:";
  const taskStatusSelect = Document.createElement("select");
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

  taskPrio = addBasicInputElement("taskprio", "Priority:", "text", ulElement);
}

function addBasicInputElement(id, textContent, type, appendTarget) {
  const li = Document.createElement("li");
  const label = Document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = textContent;
  const input = Document.createElement("input");
  input.setAttribute("id", id);
  input.setAttribute("type", type);
  li.appendChild(label);
  li.appendChild(input);
  appendTarget.appendChild(li);
  return input; // Maybe necessary for form submission
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
