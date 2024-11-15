// Will feature DOM manipulation later
export {generateProjectPage};
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
