function showAlert(msg, type) {
    let alertsContainer = document.querySelector('.alerts');
    let newAlert = document.querySelector('.alert').cloneNode(true);
    newAlert.classList.add('alert-' + type);
    newAlert.querySelector('.msg').innerHTML = msg;
    newAlert.classList.remove('d-none');
    alertsContainer.append(newAlert);
}

function moveBtnHandler(event) {
    let taskElement = event.target.closest('.task');
    let currentTable = event.target.closest('tbody');
    let targetTable = document.getElementById(currentTable.id == 'to-do-list' ? 'done-list' : 'to-do-list');

    moveTask(taskElement.id, currentTable.id == 'to-do-list' ? 'done' : 'to-do');

    let taskCounterElement = taskElement.closest('.card').querySelector('.task-counter');
    taskCounterElement.innerHTML = Number(taskCounterElement.innerHTML) - 1;

    targetTable.append(taskElement);

    taskCounterElement = taskElement.closest('.card').querySelector('.task-counter');
    taskCounterElement.innerHTML = Number(taskCounterElement.innerHTML) + 1;
    
}

function createTaskElement(form) {
    let newTaskElement = document.getElementById('task-template').cloneNode(true);
    newTaskElement.id = taskCounter++;
    newTaskElement.querySelector('.task-name').textContent = form.elements['name'].value;
    newTaskElement.querySelector('.task-description').textContent = form.elements['description'].value;
    newTaskElement.classList.remove('d-none');

    for (let btn of newTaskElement.querySelectorAll('.move-btn')) {
        btn.onclick = moveBtnHandler;
    }

    return newTaskElement;
}

function setFormValue(form, taskid) {
    let taskElement = document.getElementById(taskid);
    form.elements['name'].value = taskElement.querySelector('.task-name').textContent;
    form.elements['description'].value = taskElement.querySelector('.task-description').textContent;
    form.elements['task-id'].value = taskid;
}

function updateTask(form) {
    let taskElement = document.getElementById(form.elements['task-id'].value);
    taskElement.querySelector('.task-name').textContent = form.elements['name'].value;
    taskElement.querySelector('.task-description').textContent = form.elements['description'].value;
}

async function removeTaskBtnHandler(event) {
    let form = event.target.closest('.modal').querySelector('form');
    let taskElement = document.getElementById(form.elements['task-id'].value);
    let responseStatus = await deleteTask(form.elements['task-id'].value);
    if (responseStatus == 200) {
        let taskCounterElement = taskElement.closest('.card').querySelector('.task-counter');
        taskCounterElement.innerHTML = Number(taskCounterElement.innerHTML) - 1;
    
        taskElement.remove();
        showAlert('Задача удалена', 'success');
    }
}

function resetForm(form) {
    form.reset();
    form.querySelector('select').closest('.mt-3').classList.remove('d-none');
    form.elements['name'].classList.remove('form-control-plaintext');
    form.elements['description'].classList.remove('form-control-plaintext');
}

async function actionTaskBtnHandler(event) {
    let alertMsg;
    let form = this.closest('.modal').querySelector('form');
    let action = form.elements['action'].value;
    
    if (action == 'new') {
        let taskElement = document.getElementById(`${form.elements['column'].value}-list`);
        let newTaskElement = createTaskElement(form);
        let responseStatus = await submitTask(form);
        if (responseStatus == 200) {
            taskElement.append(newTaskElement);
            alertMsg = `Задача ${form.elements['name'].value} добавлена успешно!`;
        
            let taskCounterElement = taskElement.closest('.card').querySelector('.task-counter');
            taskCounterElement.innerHTML = Number(taskCounterElement.innerHTML) + 1;
            form.reset();
        }
    } else if (action == 'edit') {
        let responseStatus = await editTask(form.elements['task-id'].value, form.elements['name'].value, form.elements['description'].value);
        if (responseStatus == 200) {
            updateTask(form);
            alertMsg = `Задача ${form.elements['name'].value} обновлена успешно!`;
        }
    }
    if (alertMsg) {
        showAlert(alertMsg, 'success');
        resetForm(form);
    }
}

let taskCounter = 0;

titles = {
    'new':"Создание новой задачи",
    'edit':"Редактирование задачи",
    'show':"Просмотр задачи"
}

actionBtnText = {
    'new':"Создать",
    'edit':"Редактировать",
    'show':"Ок"
}

window.onload = function () {
    document.querySelector(".action-task-btn").onclick = actionTaskBtnHandler;

    let taskModal = document.getElementById('task-modal');
    taskModal.addEventListener('show.bs.modal', function(event) {
        let form = event.target.querySelector('form');
        
        let action = event.relatedTarget.dataset.action || "new";
        form.elements['action'].value = action;
        this.querySelector('.modal-title').textContent = titles[action];
        this.querySelector('.action-task-btn').textContent = actionBtnText[action];

        if (action == 'edit' || action == 'show') {
            this.querySelector('select').closest('.mt-3').classList.add('d-none');
            setFormValue(form, event.relatedTarget.closest('.task').id);
        }
        if (action == "show") {
            form.elements['name'].classList.add('form-control-plaintext');
            form.elements['description'].classList.add('form-control-plaintext');
        }
    });

    let removeTaskModal = document.getElementById('remove-task-modal');
    removeTaskModal.addEventListener('show.bs.modal', function(event) {
        let taskElement = event.relatedTarget.closest('.task');
        let form = event.target.querySelector('form');
        form.elements['task-id'].value = taskElement.id;
        event.target.querySelector('.task-name').textContent = taskElement.querySelector('.task-name').textContent;
    });

    document.querySelector('.remove-task-btn').onclick = removeTaskBtnHandler;

    getTasks();
}

function placeTasks(tasks) {
    tasks.forEach(task => {
        let newTaskElement = document.getElementById('task-template').cloneNode(true);
        newTaskElement.id = task.id;
        newTaskElement.querySelector('.task-name').textContent = task.name;
        newTaskElement.querySelector('.task-description').textContent = task.desc;
        newTaskElement.classList.remove('d-none');
    
        for (let btn of newTaskElement.querySelectorAll('.move-btn')) {
            btn.onclick = moveBtnHandler;
        }
    
        let taskElement = document.getElementById(`${task.status}-list`);
        taskElement.append(newTaskElement);

        let taskCounterElement = taskElement.closest('.card').querySelector('.task-counter');
        taskCounterElement.innerHTML = Number(taskCounterElement.innerHTML) + 1;
    });
}

function getTasks() {
    let url = "http://tasks-api.std-900.ist.mospolytech.ru/api/tasks?api_key=50d2199a-42dc-447d-81ed-d68a443b697e";
    fetch(url)  
        .then(function(response) {  
            response.json().then(function(data) {  
                placeTasks(data.tasks);  
            });
        })  
        .catch(function(error) {  
            showAlert('Ошибка при получении списка задач с сервера', 'danger');
        });
}

async function submitTask(form) {
    let url = "http://tasks-api.std-900.ist.mospolytech.ru/api/tasks?api_key=50d2199a-42dc-447d-81ed-d68a443b697e";
    let task = {
        name: form.elements['name'].value,
        desc: form.elements['description'].value,
        status: form.elements['column'].value
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'name=' + task.name + '&desc=' + task.desc + '&status=' + task.status + ''
        });
        return response.status;  
    } catch (error) {
        showAlert('Ошибка при отправке задачи на сервер', 'danger');
    }
}

async function deleteTask(id) {
    let url = "http://tasks-api.std-900.ist.mospolytech.ru/api/tasks/" + id + "?api_key=50d2199a-42dc-447d-81ed-d68a443b697e";

    try {
        const response = await fetch(url, { method: 'DELETE' });
        return response.status;
    } catch (error) {
        showAlert('Ошибка при удалении задачи с сервера', 'danger');
    }
}

async function moveTask(id, status) {
    let url = "http://tasks-api.std-900.ist.mospolytech.ru/api/tasks/"+ id +"?api_key=50d2199a-42dc-447d-81ed-d68a443b697e";
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'status=' + status + ''
        });
        return response.status;
    } catch (error) {
        showAlert('Ошибка при перемещении задачи на сервере', 'danger');
    }
}

async function editTask(id, name, desc) {
    let url = "http://tasks-api.std-900.ist.mospolytech.ru/api/tasks/"+ id +"?api_key=50d2199a-42dc-447d-81ed-d68a443b697e";
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'name=' + name + '&desc=' + desc + ''
        });
        return response.status;
    } catch (error) {
        showAlert('Ошибка при обновлении задачи на сервере', 'danger');
    }
}