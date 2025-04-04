import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(status) {
  return `
    <div class="column ${status}">
      <h2>${status}</h2>
      <ul class="tasks-container"></ul>
    </div>
  `;
}

export default class TaskListComponent {
  #status = null;
  #element = null;

  constructor(status) {
    this.#status = status;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.#status);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  getTaskListElement() {
    return this.getElement().querySelector('.tasks-container');
  }

  setTitle(title) {
    this.getElement().querySelector('h2').textContent = title;
  }

  removeElement() {
    this.element = null;
  }
}
