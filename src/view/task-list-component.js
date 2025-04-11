import { AbstractComponent } from "../framework/view/abstract-component.js";
import { StatusLabel } from "../const.js";

export default class TaskListComponent extends AbstractComponent {
  #status = null;
  #title = null;

  constructor({ title, status }) {
    super();
    this.#title = title || StatusLabel[status];
    this.#status = status;
  }

  get template() {
    return `
      <div class="column ${this.#status}">
        <h2>${this.#title}</h2>
        <ul class="tasks-container"></ul>
      </div>
    `;
  }
}