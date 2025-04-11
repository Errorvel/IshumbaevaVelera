import { render, RenderPosition } from './framework/render.js';
import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';

const tasksBoardContainer = document.querySelector('.container');  

const tasksModel = new TasksModel();  
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,  
  tasksModel,
});

render(new HeaderComponent(), tasksBoardContainer, RenderPosition.AFTERBEGIN);  
render(new FormAddTaskComponent(), tasksBoardContainer); 

tasksBoardPresenter.init(); 
