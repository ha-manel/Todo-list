// import './style.css';
import Tasks from './tasks.js';

const tasks = new Tasks();

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

// edit description of task with enter keypress or a change in the input field
const editInput = document.querySelectorAll('.todo-item');
editInput.forEach((input, index) => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value) {
      tasks.update(input.value, index);
    }
  });
});

editInput.forEach((input, index) => {
  input.addEventListener('change', () => {
    if (input.value) {
      tasks.update(input.value, index);
    }
  });
});

// delete a task
const deleteBtn = document.querySelectorAll('.delete-task');
deleteBtn.forEach((button, index) => {
  button.addEventListener('click', () => {
    tasks.delete(index);
  });
});
