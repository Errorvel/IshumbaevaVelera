import { AbstractComponent } from "../framework/view/abstract-component.js";


function createTaskComponentTemplate({ id, title }) {
  return `<li class="task" data-id="${id}" draggable="true">${title}</li>`;
}


export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor({ task }) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }

  makeDraggable() {
    this.element.setAttribute("draggable", "true");
    this.element.addEventListener("dragstart", (event) => {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", this.#task.id);
    });
  }
}
