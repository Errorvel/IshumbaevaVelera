import { createElement } from '../framework/render.js';

function createTaskComponentTemplate(task) {
  
  return `
    <li class="task">
      <span class="task-title">${task.title}</span>
    </li>
  `;
}

export default class TaskComponent {
  #task = null;
  #element = null;
  constructor(task) {
    this.task = task;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.task);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}
