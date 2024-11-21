
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
    
    titleElement.textContent = todo.getTitle();
    priorityElement.textContent = `Priority: ${todo.getPriority()}`;
    dateElement.textContent = `Due Date: ${todo.getDueDate()}`;

    todoDiv.appendChild(titleElement);
    todoDiv.appendChild(priorityElement);
    todoDiv.appendChild(dateElement);
    todoListDiv.appendChild(todoDiv);
  }
contentDiv.appendChild(contentTitle);
contentDiv.appendChild(todoListDiv);
}