import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
    return `
      <div class="new-task-modal">
        <h2>Добавить задачу</h2>
        <input type="text" id="taskInput" placeholder="Введите название..." />
        <button id="addTaskBtn">Добавить</button>
      </div>
    `;
  }
}