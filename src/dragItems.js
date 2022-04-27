export default function dragItem(array) {
  const draggables = document.querySelectorAll('.todo-task');
  const todoContainer = document.querySelector('#todo-list');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });

  todoContainer.addEventListener('dragover', () => {
    
  });
}