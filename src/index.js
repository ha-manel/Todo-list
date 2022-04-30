import './style.css';
import Tasks from './tasks.js';
import Status from './status.js';

const tasks = new Tasks();
const status = new Status();

// populate the todo list from storage
tasks.populateList();

// add new task
const newInput = document.querySelector('#new-task');
newInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && newInput.value) {
    tasks.add(newInput.value);
    newInput.value = '';
  }
});

// refresh the list
const refreshBtn = document.querySelector('#refresh-list');
refreshBtn.addEventListener('click', () => {
  document.location.reload();
});

// clear complated
status.clearCompleted(tasks);