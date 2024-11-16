const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.id, task.text, task.completed));
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(item => ({
        id: item.dataset.id,
        text: item.querySelector('.task-text').textContent,
        completed: item.classList.contains('completed'),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(id, text, completed = false) {
    const taskItem = document.createElement('li');
    taskItem.className = `flex items-center justify-between p-2 bg-gray-100 rounded-lg ${completed ? 'completed' : ''}`;
    taskItem.dataset.id = id;
    taskItem.innerHTML = `
        <span class="task-text flex-grow ${completed ? 'line-through text-gray-500' : ''}">${text}</span>
        <div class="flex items-center space-x-2">
            <button class="edit-btn text-blue-500 hover:text-blue-700">Editar</button>
            <button class="delete-btn text-red-500 hover:text-red-700">Excluir</button>
        </div>
    `;
    taskList.appendChild(taskItem);
}

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (!text) return;
    const id = Date.now().toString();
    createTaskElement(id, text);
    saveTasks();
    taskInput.value = '';
});

taskList.addEventListener('click', (e) => {
    const taskItem = e.target.closest('li');
    if (!taskItem) return;

    if (e.target.classList.contains('edit-btn')) {
        const taskText = taskItem.querySelector('.task-text');
        const newText = prompt('Editar tarefa:', taskText.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskText.textContent = newText.trim();
            saveTasks();
        }
    } else if (e.target.classList.contains('delete-btn')) {
        taskItem.remove();
        saveTasks();
    } else {
        taskItem.classList.toggle('completed');
        const taskText = taskItem.querySelector('.task-text');
        taskText.classList.toggle('line-through');
        taskText.classList.toggle('text-gray-500');
        saveTasks();
    }
});
