// Select elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const searchBar = document.getElementById('search-bar');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Handle form submission to add new task
taskForm.addEventListener('submit', addTask);

// Handle task deletion and editing
taskList.addEventListener('click', handleTaskActions);

// Search tasks
searchBar.addEventListener('input', searchTasks);

// Load tasks from localStorage and display them
function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(task => createTaskElement(task));
}

// Add a new task
function addTask(e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText);

  // Save task to localStorage
  saveTaskToStorage(taskText);

  taskInput.value = ''; // Clear input
}

// Create a task element in the DOM
function createTaskElement(taskText) {
  const li = document.createElement('li');
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit-btn');

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');

  li.appendChild(taskSpan);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

// Handle task actions (edit or delete)
function handleTaskActions(e) {
  if (e.target.classList.contains('delete-btn')) {
    deleteTask(e.target);
  } else if (e.target.classList.contains('edit-btn')) {
    editTask(e.target);
  }
}

// Delete a task
function deleteTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector('span').textContent;

  // Remove from localStorage
  removeTaskFromStorage(taskText);

  // Remove from DOM
  taskList.removeChild(li);
}

// Edit a task
function editTask(button) {
  const li = button.parentElement;
  const taskSpan = li.querySelector('span');
  const newTaskText = prompt('Edit task', taskSpan.textContent);

  if (newTaskText !== null && newTaskText.trim() !== '') {
    const oldTaskText = taskSpan.textContent;

    // Update localStorage
    updateTaskInStorage(oldTaskText, newTaskText);

    // Update DOM
    taskSpan.textContent = newTaskText;
  }
}

// Search tasks
function searchTasks(e) {
  const searchText = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll('#task-list li');

  tasks.forEach(task => {
    const taskText = task.querySelector('span').textContent.toLowerCase();
    if (taskText.includes(searchText)) {
      task.style.display = '';
    } else {
      task.style.display = 'none';
    }
  });
}

// Save task to localStorage
function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasksFromStorage() {
  return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

// Remove task from localStorage
function removeTaskFromStorage(taskText) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in localStorage
function updateTaskInStorage(oldTaskText, newTaskText) {
  const tasks = getTasksFromStorage();
  const taskIndex = tasks.indexOf(oldTaskText);
  if (taskIndex > -1) {
    tasks[taskIndex] = newTaskText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
