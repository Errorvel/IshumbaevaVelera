import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskBoardComponentTemplate() {
    return `
      <div class="task-board"></div>
    `;
  
}
export default class TaskBoardComponent extends AbstractComponent {
  get template() {
    return createTaskBoardComponentTemplate();
  }
}