import { render, RenderPosition } from './framework/render.js';
import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';
import ClearButtonComponent from './view/clear-button-component.js';

const tasksBoardContainer = document.querySelector('.container');  

const tasksModel = new TasksModel();  
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,  
  tasksModel,
});

const formAddTaskComponent = new FormAddTaskComponent({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
  tasksBoardPresenter.createTask();
}

render(new HeaderComponent(), tasksBoardContainer, RenderPosition.AFTERBEGIN);  
render(formAddTaskComponent, tasksBoardContainer); 

tasksBoardPresenter.init(); 

const clearButtonComponent = new ClearButtonComponent();
const clearButtonContainer = document.querySelector('.clear-button-container');

if (clearButtonContainer) {
  render(clearButtonComponent, clearButtonContainer);
  clearButtonComponent.updateState(); 
}

const basketContainer = document.querySelector('.basket .tasks-container');

if (basketContainer) {
  const observer = new MutationObserver(() => {
    clearButtonComponent.updateState(); 
  });

  observer.observe(basketContainer, { childList: true });
}