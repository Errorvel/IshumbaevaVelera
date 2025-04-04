import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import BoardComponent from '../view/board-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';
import { tasks } from '../mock/task.js';
import ClearButtonComponent from '../view/clear-button-component.js';
export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new BoardComponent();
  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...tasks]; 

    render(this.#tasksBoardComponent, this.#boardContainer);

    const statuses = [Status.BACKLOG, Status.PROCESSING, Status.DONE, Status.BASKET];

    statuses.forEach(status => {
      const tasksListComponent = new TaskListComponent(status);
      render(tasksListComponent, this.#tasksBoardComponent.getElement());

      
      const statusLabel = StatusLabel[status];
      tasksListComponent.setTitle(statusLabel); 

      this.#boardTasks
        .filter(task => task.status === status)
        .forEach(task => {
          const taskComponent = new TaskComponent(task);
          render(taskComponent, tasksListComponent.getTaskListElement());
        });

        if (status === Status.BASKET) {
          const deleteButton = new ClearButtonComponent();
          render(deleteButton, tasksListComponent.getElement());
   } });
  }
}