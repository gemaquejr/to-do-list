const taskText = document.querySelector('#texto-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const body = document.querySelector('body');
const createTask = document.querySelector('#criar-tarefa');
const clearAll = document.querySelector('#apaga-tudo');
const clearCompleted = document.querySelector('#remover-finalizados');
const removedSelected = document.querySelector('#remover-selecionado');
const upwards = document.querySelector('#mover-cima');
const below = document.querySelector('#mover-baixo');
const saveTask = document.querySelector('#salvar-tarefas');

createTask.addEventListener('click', () => {
  const newTask = document.createElement('li');
  newTask.className = 'task';
  newTask.innerHTML = taskText.value;
  taskList.appendChild(newTask);
  taskText.value = '';
});

function changeBackgroundColor(e) {
  for (let index = 0; index < taskList.children.length; index += 1) {
    if (taskList.children[index].classList.contains('selected')) {
      taskList.children[index].classList.remove('selected');
    }
  }
  const task = e.target;
  task.classList.add('selected');
}

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('task')) {
    changeBackgroundColor(e);
  }
});

taskList.addEventListener('dblclick', (event) => {
  event.target.classList.toggle('completed');
});

clearAll.addEventListener('click', () => {
  taskList.innerHTML = '';
});

function removeCompletedTask() {
  const completedTasks = document.querySelectorAll('.completed');
  for (let index = 0; index < completedTasks.length; index += 1) {
    taskList.removeChild(completedTasks[index]);
  }
}
clearCompleted.addEventListener('click', removeCompletedTask);

function saveTaskStorage() {
  localStorage.setItem('taskListStorage', JSON.stringify(taskList.innerHTML));
}
saveTask.addEventListener('click', saveTaskStorage);

window.onload = () => {
  if (localStorage !== null) {
    const returnTaskHTML = JSON.parse(localStorage.getItem('taskListStorage'));
    taskList.innerHTML = returnTaskHTML;
  }
};

function moveUp() {
  const selectedTask = document.querySelector('.selected');
  if (selectedTask !== null && selectedTask.previousElementSibling) {
    const itemBefore = selectedTask.previousElementSibling;
    taskList.insertBefore(selectedTask, itemBefore);
  }
}
upwards.addEventListener('click', moveUp);

function moveDown() {
  const selectedTask = document.querySelector('.selected');
  if (selectedTask !== null && selectedTask.nextElementSibling) {
    const itemAfter = selectedTask.nextElementSibling;
    itemAfter.after(selectedTask);
  }
}
below.addEventListener('click', moveDown);

function removeSelectedTask() {
  const selectedTask = document.querySelector('.selected');
  taskList.removeChild(selectedTask);
}
removedSelected.addEventListener('click', removeSelectedTask);
