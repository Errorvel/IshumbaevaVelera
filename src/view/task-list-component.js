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
    this.#setDropHandler();
  }

  get template() {
    return createTasksListComponentTemplate(this.#status, this.#title);
  }

  #setDropHandler() {
    this.element.addEventListener("dragover", event => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });

    this.element.addEventListener("drop", event => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");
      const container = this.element.querySelector(".tasks-container");
      const { clientY } = event;
      const items = Array.from(container.children);
      let newIndex = items.length;
      for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect();
        if (clientY < rect.top + rect.height / 2) {
          newIndex = i;
          break;
        }
      }
      this.#onTaskDrop(taskId, this.#status, newIndex);
    });
  }
}
