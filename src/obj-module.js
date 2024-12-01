export {Project, TodoItem};

class Project {
  #title = "";
  #description = "";
  #todoList = [];

  constructor(title, description) {
    this.#title = title;
    this.#description = description;
    this.#todoList = [];
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

  addTodo(todoItem) {
    this.#todoList.push(todoItem);
  }
}

class TodoItem {
  #title = "";
  #description = "";
  #dueDate = new Date();
  #status = "";
  #priority = "";
  #notes = [];

  constructor(title, description, dueDate, priority, notes) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#status = "Pending";
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

  addNote(priority) {
    this.#notes.push(priority);
  }

  deleteNote(index) {
    this.#notes.splice(index, 1);
  }

}