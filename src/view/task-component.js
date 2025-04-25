import { AbstractComponent } from "../framework/view/abstract-component.js";


function createTaskComponentTemplate({ title }) {
  return `<li class="task">${title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor({ task }) {
    super();
    this.#task = task;
    this._makeDraggable();
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }

  _makeDraggable() {
    this.element.dataset.taskId = this.#task.id;
    this.element.setAttribute("draggable", "true");
    this.element.addEventListener("dragstart", event => {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", this.#task.id);
    });
  }
}