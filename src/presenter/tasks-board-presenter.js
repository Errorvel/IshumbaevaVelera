import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';
import TaskComponent from '../view/task-component.js';
import TaskListComponent from '../view/task-list-component.js';
import EmptyPlaceholderComponent from '../view/empty-placeholder-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import BoardComponent from '../view/board-component.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new BoardComponent();
  #tasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#tasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container);
  }

  #renderTasksList(status, tasks, container) {
    const taskList = new TaskListComponent({ 
      title: StatusLabel[status], 
      status 
    });
    render(taskList, container);

    if (tasks.length === 0) {
      const emptyPlaceholder = new EmptyPlaceholderComponent();
      render(emptyPlaceholder, taskList.element);
    } else {
      tasks.forEach(task => this.#renderTask(task, taskList.element));
    }

    if (status === Status.BASKET) {
      const clearButton = new ClearButtonComponent();
      render(clearButton, taskList.element);
    }
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    
    Object.values(Status).forEach(status => {
      const tasksForStatus = this.#tasks.filter(task => task.status === status);
      this.#renderTasksList(status, tasksForStatus, this.#tasksBoardComponent.element);
    });
  }
}