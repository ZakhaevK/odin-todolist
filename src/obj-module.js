export {Project, TodoItem};

// const ls = require('local-storage');

class Project {
  #title = "";
  #description = "";
  #todoList = [];
  #id = ""; // Added to help track outside of title

  static #idCounter = 1; // Static property to track the next ID
  static #projectMap = new Map(); // Static Map to track all projects

  constructor(title, description) {
    this.#title = title;
    this.#description = description;
    this.#todoList = [];
    this.#id = Project.#generateId(); // Automatically generate a unique ID
    Project.#projectMap.set(this.#id, this); // Add this project to the Map
    Project.exportToLocalStorage();
  }

  // Generate a zero-padded ID (e.g. "0001", "0002")
  static #generateId() {
    return String(Project.#idCounter++).padStart(4, "0");
  }

  // Retrieve a project by its ID
  static getProjectById(id) {
    return Project.#projectMap.get(id); 
  }

  // Get all projects as an array
  static getAllProjects() {
    return Array.from(Project.#projectMap.values()); 
  }

  static exportToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(Project.getAllProjects()));
    console.log("Local Storage:" + localStorage.getItem("projects"));
  }
  
  getTitle() {
    return this.#title;
  }

  getDescription() {
    return this.#description;
  }

  getTodoList() {
    return this.#todoList;
  }

  getId() {
    return this.#id;
  }

  addTodo(todoItem) {
    this.#todoList.push(todoItem);
    Project.exportToLocalStorage();
  }

  toJSON() {
    return {
      title: this.#title,
      description: this.#description,
      todoList: this.#todoList,
      id: this.#id,
    };
  }

  static loadFromLocalStorage() {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    
    if (storedProjects && Array.isArray(storedProjects)) {
      // Clear existing static data
      Project.#projectMap.clear();
      Project.#idCounter = 1;
  
      // Reconstruct projects
      storedProjects.forEach((projectData) => {
        const project = new Project(projectData.title, projectData.description);
  
        // Re-add todos to the project
        projectData.todoList.forEach((todoData) => {
          const todoItem = new TodoItem(
            todoData.title,
            todoData.description,
            todoData.dueDate,
            todoData.status,
            todoData.priority,
            todoData.notes
          );
          project.addTodo(todoItem);
        });
  
        // Add the project to the map
        Project.#projectMap.set(project.getId(), project);
      });
    }
  }
  
}

class TodoItem {
  #title = "";
  #description = "";
  #dueDate = new Date();
  #status = "Pending";
  #priority = "";
  #notes = [];

  constructor(title, description, dueDate, status, priority, notes) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#status = status;
    this.#priority = priority;
    this.#notes = notes;
  }

  getTitle() {
    return this.#title;
  }

  getDescription() {
    return this.#description;
  }

  getDueDate() {
    return this.#dueDate;
  }

  getStatus() {
    return this.#status;
  }

  getPriority() {
    return this.#priority;
  }

  getNotes() {
    return this.#notes;
  }

  setTitle(text) {
    this.#title = text;
  }

  setDescription(text) {
    this.#description = text;
  }

  setDueDate(date) {
    this.#dueDate = date;
  }

  setStatus(text) {
    this.#status = text;
    // Possible usage of number switch here, not currently necessary
    // switch(num) {
    //   case 0:
    //     this.#status = "Pending";
    //   case 1:
    //     this.#status = "In Progress";
    //   case 2:
    //     this.#status = "Complete";
    //   default:
    //     console.log("Invalid input, must be 0 (Pending), 1 (In Progress), or 3 (Complete)")
    // }
  }

  setPriority(priority) {
    this.#priority = priority;
  }

  addNote(note) {
    this.#notes.push(note);
  }

  deleteNote(index) {
    this.#notes.splice(index, 1);
  }

  toJSON() {
    return {
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate, // This will automatically serialize as a string
      status: this.#status,
      priority: this.#priority,
      notes: this.#notes,
    };
  }

}