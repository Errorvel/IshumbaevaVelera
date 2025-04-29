import { createElement } from "../framework/render.js";

function createFormAddTaskComponentTemplate() {
  return `
    <div class="new-task-modal">
      <h2>Название задачи</h2>
      <input type="text" id="taskInput" placeholder="Введите название..." />
      <button id="addTaskBtn">Добавить</button>
    </div>
  `;
}

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
