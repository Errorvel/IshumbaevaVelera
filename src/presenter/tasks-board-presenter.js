import { render } from '../framework/render.js';
import { Status, StatusLabel, UserAction, UpdateType } from '../const.js';
import TaskComponent from '../view/task-component.js';
import TaskListComponent from '../view/task-list-component.js';
import EmptyPlaceholderComponent from '../view/empty-placeholder-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import BoardComponent from '../view/board-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new BoardComponent();
  #resetButtonComponent = null;
  #loadingComponent = null;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
  }

  #handleModelEvent(event, payload) {
    if (event === UpdateType.INIT) {
      if (this.#loadingComponent) {
        this.#loadingComponent.element.remove();
      }
      return;
    }
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        if (this.#resetButtonComponent) {
          if (!this.#tasksModel.hasBasketTasks()) {
            this.#resetButtonComponent.disable();
          } else {
            this.#resetButtonComponent.enable();
          }
        }
        break;
    }
  }

  async init() {
  
    this.#loadingComponent = new LoadingViewComponent();
    render(this.#loadingComponent, this.#boardContainer);

   
    await this.#tasksModel.init(); 
    this.#clearBoard();
    this.#renderBoard();

    this.#resetButtonComponent = new ClearButtonComponent({ onClear: this.#handleClearBasketClick.bind(this) });
    const clearContainer = document.querySelector('.clear-button-container');
    if (clearContainer) {
      render(this.#resetButtonComponent, clearContainer);
      if (!this.#tasksModel.hasBasketTasks()) {
        this.#resetButtonComponent.disable();
      } else {
        this.#resetButtonComponent.enable();
      }
    }
  }

  async #handleClearBasketClick() {
    try {
      if (this.#resetButtonComponent) {
        this.#resetButtonComponent.disable();
      }
      await this.#tasksModel.clearBasketTasks();
    } catch (err) {
      console.error('Ошибка при очистке корзины:', err);
    }
  }

  async createTask() {
    const taskTitle = document.querySelector('#add-task').value.trim();
    if (!taskTitle) {
      return;
    }
    try {
      await this.#tasksModel.addTask(taskTitle);
      document.querySelector('#add-task').value = '';
    } catch (err) {
      console.error('Ошибка при создании задачи:', err);
    }
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #renderTask(task, listContainer) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, listContainer);
    taskComponent.makeDraggable(); 
  }
  
  
  async #handleTaskDrop(taskId, newStatus, beforeTaskId) {
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus, beforeTaskId);
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи:', err);
    }
  }
  

  #renderTasksList(status, container) {
    const listCmp = new TaskListComponent({
      status,
      title: StatusLabel[status],
      onTaskDrop: this.#handleTaskDrop.bind(this),
    });
    render(listCmp, container);

    const listContainer = listCmp.element.querySelector('.tasks-container');
    const items = this.tasks.filter(t => t.status === status);

    if (items.length === 0) {
      render(new EmptyPlaceholderComponent(), listContainer);
    } else {
      items.forEach(task => this.#renderTask(task, listContainer));
    }

    if (status === 'basket') {
      const clearBtn = new ClearButtonComponent({
        onClear: this.#handleClearBasketClick.bind(this)
      });
      render(clearBtn, listContainer);
      if (!this.tasks.some(t => t.status === 'basket')) {
        clearBtn.disable();
      } else {
        clearBtn.enable();
      }
    }
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    Object.values(Status).forEach(status => {
      this.#renderTasksList(status, this.#tasksBoardComponent.element);
    });
  }
}
