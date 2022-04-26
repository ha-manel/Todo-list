import './style.css';

let todoList = [
  {
    description: 'wash dishes',
    isCompleted: false,
    index: 1,
  },
  {
    description: 'buy groceries',
    isCompleted: false,
    index: 0,
  },
];

localStorage.setItem('todo', JSON.stringify(todoList));

// populate the todo list from storage
const todoContainer = document.querySelector('#todo');
const populateList = () => {
  todoList = JSON.parse(localStorage.getItem('todo'));
  todoList.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<button class="check-item"><i class="fa-regular fa-square"></i>${item.description}</button><button
          class="move-item"><i class="fa-solid fa-ellipsis-vertical"></i></button>`;
    todoContainer.insertBefore(li, todoContainer.children[item.index]);
  });
};
populateList();
