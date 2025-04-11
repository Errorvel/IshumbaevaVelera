import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return `
      <li class="task task-${this.#task.status}">
        <span class="task-title">${this.#task.title}</span>
      </li>
    `;
  }
}