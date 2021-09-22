// Define Variables
const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('#collection');
const clearTask = document.querySelector('.clear-tasks');
const filterTask = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  window.addEventListener('DOMContentLoaded', loadTask);
  taskForm.addEventListener('submit', addTask);
  taskList.addEventListener('click', DeleteTask);
  clearTask.addEventListener('click', clearTasks);
  filterTask.addEventListener('keyup', filterTasks);
}

function loadTask() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create Li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task.toLowerCase()));

    // Create X
    const link = document.createElement('a');
    link.className = 'delete-link';
    link.innerHTML = '<i class="far fa-times-circle"></i>';
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Fill the "New Task" input');
  }

  // Create Li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value.toLowerCase()));

  // Create X
  const link = document.createElement('a');
  link.className = 'delete-link';
  link.innerHTML = '<i class="far fa-times-circle"></i>';
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Add task to LS
  addTaskToLocalStorage(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

// Add task to LS
function addTaskToLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task
function DeleteTask(e) {
  if (e.target.parentElement.classList.contains('delete-link')) {
    e.target.parentElement.parentElement.remove();
  }

  // Delete task from LS
  deleteTaskFromLocalStorage(e.target.parentElement.parentElement);

  e.preventDefault();
}

// Delete task from LS
function deleteTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e) {
  document.querySelectorAll('.collection-item').forEach(function (task) {
    task.remove();
  });

  // Clear tasks from LS
  clearTasksFromLocalStorage();

  e.preventDefault();
}

// Clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  let text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}