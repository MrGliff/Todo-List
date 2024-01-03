let todoList = [{
    name: 'watch youtube',
    dueDate: '2023-12-31',
    isCompleted: 0
}, {
    name: 'make website',
    dueDate: '2024-01-05',
    isCompleted: 1
}];

renderTodo();

function renderTodo() {
    sortTodo();
    let todoHTML = '';
    for(let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const { name, dueDate, isCompleted } = todoObject;
        todoHTML += `
            <input type="checkbox" class="completeCheckbox" onclick="completeTask(${i})" ${isCompleted ? 'checked' : ''}/>
            <div class="${isCompleted ? 'completeTask' : 'incompleteTask'}">${name}</div>
            <div>${dueDate}</div>
            <button onclick="
            todoList.splice(${i}, 1);
            renderTodo();
            "class="deleteButton">Remove</button>
            `;
    }

    console.log(todoList)
    document.querySelector('.todoList').innerHTML = todoHTML;

    const lastItem = document.querySelector('.todoList div:last-child');
    if (lastItem) {
        lastItem.scrollIntoView({ behavior: 'smooth' });
    }
}

function addtodo() {
    const inputElement = document.querySelector('.todoInput');
    const dateInput = document.querySelector('.dateInput');
    if(inputElement.value === '')
        alert('Task Empty!');
    else {
        todoList.push({
            name: inputElement.value,
            dueDate: dateInput.value,
            isCompleted: 0
        });
        console.log(todoList);

        inputElement.value = '';
        dateInput.value = '';
        renderTodo();
    }
}

function completeTask(index) {
    todoList[index].isCompleted =  todoList[index].isCompleted ? 0 : 1;
    renderTodo();
}


document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;

        if (activeElement.tagName === 'INPUT' && activeElement.classList.contains('todoInput')) {
            addtodo();
        }

        if(activeElement.tagName === 'INPUT' && activeElement.classList.contains('dateInput')) {
            addtodo();
        }
    }
});

function sortTodo() {
    todoList.sort((a, b) => a.isCompleted - b.isCompleted);
}

function clearAll() {
    if(todoList.length === 0)
        alert('Already Empty!');
    else {
        todoList = [];
        renderTodo();
    }
}