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

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#renderBoard();
  }

  createTask() {
    const taskTitle = document.querySelector('#add-task')?.value.trim();
    if (!taskTitle) {
      return;
    }

    this.#tasksModel.addTask(taskTitle);
    document.querySelector('#add-task').value = '';
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container);
  }

  #renderTasksList(status, container) {
    const taskListComponent = new TaskListComponent({
      title: StatusLabel[status],
      status
    });

    render(taskListComponent, container);

    const tasksForStatus = this.tasks.filter(task => task.status === status);

    if (tasksForStatus.length === 0) {
      const emptyPlaceholder = new EmptyPlaceholderComponent();
      render(emptyPlaceholder, taskListComponent.element);
    } else {
      tasksForStatus.forEach(task => this.#renderTask(task, taskListComponent.element));
    }

    if (status === Status.BASKET) {
      const clearButton = new ClearButtonComponent({
        onClear: () => this.#tasksModel.deleteTasksByStatus(Status.BASKET)
      });
      render(clearButton, taskListComponent.element);
    }
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    Object.values(Status).forEach(status => {
      this.#renderTasksList(status, this.#tasksBoardComponent.element);
    });
  }
}