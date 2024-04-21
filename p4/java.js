document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const taskName = document.createElement('input');
            taskName.type = 'text';
            taskName.value = task.name;
            taskName.classList.add('task-name');
            if (task.completed) {
                li.classList.add('completed');
            }
            taskName.addEventListener('dblclick', () => {
                taskName.setAttribute('contenteditable', true);
                taskName.focus();
            });
            taskName.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    taskName.blur();
                    task.name = taskName.value;
                    saveTasks();
                    renderTasks();
                }
            });
            taskName.addEventListener('blur', () => {
                taskName.setAttribute('contenteditable', false);
            });
            const markBtn = document.createElement('button');
            markBtn.textContent = task.completed ? 'Uncomplete' : 'Complete';
            markBtn.classList.add('mark-btn');
            markBtn.addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', () => {
                taskName.setAttribute('contenteditable', true);
                taskName.focus();
            });
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(taskName);
            li.appendChild(markBtn);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function addTask(taskName) {
        tasks.push({ name: taskName, completed: false });
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    renderTasks();
});