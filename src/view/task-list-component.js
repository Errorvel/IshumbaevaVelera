import { createElement } from '../framework/render.js';
import TaskComponent from './task-component.js';
import FormAddTaskComponent from './form-add-task-component.js';

function createTaskListComponentTemplate(isFirstColumn) {
  return `
    <div class="column">
      ${isFirstColumn ? '<div class="form-container"></div>' : ''}
      <h2>Название блока</h2>
      <div class="tasks-container"></div>
    </div>
  `;
}

export default class TaskListComponent {
  constructor(isFirstColumn = false) {
    this.isFirstColumn = isFirstColumn;
    if (isFirstColumn) {
      this.formComponent = new FormAddTaskComponent();
    }
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.isFirstColumn);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      if (this.isFirstColumn) {
        this.addForm();
      }
    }
    return this.element;
  }

  addForm() {
    const formContainer = this.getElement().querySelector('.form-container');
    formContainer.appendChild(this.formComponent.getElement());

    const addButton = this.formComponent.getElement().querySelector("#addTaskBtn");
    const inputField = this.formComponent.getElement().querySelector("#taskInput");

    addButton.addEventListener("click", () => {
      const taskText = inputField.value.trim();
      if (taskText) {
        this.addTask(taskText);
        inputField.value = ""; 
      }
    });
  }

  addTask(taskText) {
    const taskItemsContainer = this.getElement().querySelector('.tasks-container');
    const task = new TaskComponent(taskText);
    taskItemsContainer.appendChild(task.getElement());
  }

  addTasks() {
    for (let i = 1; i <= 3; i++) {
      this.addTask("Название первой задачи");
    }
  }

  removeElement() {
    this.element = null;
  }
}