import { createElement } from '../framework/render.js';

function createTaskComponentTemplate(taskText) {
  return `
    <li class="task-item">
      <span class="task-title">${taskText}</span>
    </li>
  `;
}

export default class TaskComponent {
  constructor(taskText) {
    this.taskText = taskText;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.taskText);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}