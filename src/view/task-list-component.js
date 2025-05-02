import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTasksListComponentTemplate(status, title) {
  return `
    <section class="column ${status}">
      <h2>${title}</h2>
      <ul class="tasks-container"></ul>
    </section>
  `;
}
export default class TasksListComponent extends AbstractComponent {
  #status = null;
  #title = null;
  #onTaskDrop = null;

  constructor({ status, title, onTaskDrop }) {
    super();
    this.#status = status;
    this.#title = title;
    this.#onTaskDrop = onTaskDrop;
    this._setupDropZone();
  }

  get template() {
    return createTasksListComponentTemplate(this.#status, this.#title);
  }

  _setupDropZone() {
    const container = this.element.querySelector(".tasks-container");
  
    container.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });
  
    container.addEventListener("drop", (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");
      const { clientY } = event;
  
      const items = Array.from(container.children).filter(el => el.matches('[data-id]'));
      let beforeTaskId = null;
  
      for (const item of items) {
        const rect = item.getBoundingClientRect();
        if (clientY < rect.top + rect.height / 2) {
          beforeTaskId = item.dataset.id;
          break;
        }
      }
  
      this.#onTaskDrop(taskId, this.#status, beforeTaskId);
    });
  }
}  