import "./style.css";

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
    this.#todoList.append(todoItem);
  }
}

class TodoItem {
  #title = "";
  #description = "";
  #dueDate = new Date();
  #priority = "";
  #notes = [];

  constructor(title, description, dueDate, priority, notes) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
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

  setPriority(priority) {
    this.#priority = priority;
  }

  addNote(priority) {
    this.#notes.append(priority);
  }


}