
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


function generateTodoPage(project) {
  contentDiv.replaceChildren("");

  const contentTitle = document.createElement("h1");
  contentTitle.textContent = `${project.getTitle()} - To-do List:`; 

  const todoListDiv = document.createElement("div");
  todoListDiv.setAttribute("id", "todo-list");

  const todoList = project.getTodoList();
  for (let todo of todoList) {
    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("class", "todo-item")

    const titleElement = document.createElement("h2");
    const priorityElement = document.createElement("p");
    const dateElement = document.createElement("p");
    const statusElement = document.createElement("p");
    
    titleElement.textContent = todo.getTitle();
    priorityElement.textContent = `Priority: ${todo.getPriority()}`;
    dateElement.textContent = `Due Date: ${todo.getDueDate()}`;
    statusElement.textContent = `Status: ${todo.getStatus()}`;

    todoDiv.appendChild(titleElement);
    todoDiv.appendChild(priorityElement);
    todoDiv.appendChild(dateElement);
    todoDiv.appendChild(statusElement);
    todoListDiv.appendChild(todoDiv);

    todoDiv.addEventListener("click", () => {
      expandTodoItem(todo, todoDiv);
    })
  }
contentDiv.appendChild(contentTitle);
contentDiv.appendChild(todoListDiv);
}

function expandTodoItem(todo, todoDiv) {
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
}

function minimiseTodoItem(todo, todoDiv) {
  
}