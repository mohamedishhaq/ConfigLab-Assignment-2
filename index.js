const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("Add-task-btn");
const todoTasks = document.getElementById("todo-tasks");
const doneTasks = document.getElementById("done-tasks");


window.onload = function() {
    loadLocalStorage();
}

addTaskBtn.onclick= function(){
    const taskContent = taskInput.value;

    if ( taskContent ==''){
        alert("Task is Empty!");
    }else{
        const li = document.createElement('li');

        // Creating the Task
        createTask(li,taskContent);

        // Completed Task
        completedTask(li);
        
        // editng the task
        editingTask(li);

        // deleting the task
        deletingTask(li);
    }
    
    
}



function createTask(li,taskContent){
    
    li.textContent = taskContent;

    // Adding the task to the list
    todoTasks.appendChild(li);
    saveToLocalStorage();
}


function completedTask(li){
    const donebtn = document.createElement("button");
        donebtn.innerHTML ="&#10004;";
        li.appendChild(donebtn);
        donebtn.onclick = function(){
            li.classList.toggle('done');
            if (li.classList.contains('done')){
                doneTasks.appendChild(li);
                   
            }else {
                todoTasks.appendChild(li);
            }
            saveToLocalStorage();
        }


}

function editingTask(li){
    const editBtn = document.createElement("button");
        editBtn.innerHTML = '&#128395;';
        li.appendChild(editBtn);
        editBtn.onclick = function(){
            const updateTask = prompt("Edit the task");
            if (updateTask){
                li.firstChild.nodeValue = updateTask;
                saveToLocalStorage();
            }
        }
}


function deletingTask(li){
    const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '&#128465;';
        li.appendChild(deleteBtn);
        deleteBtn.onclick = function(){
            li.remove();
            saveToLocalStorage();
        }    
}


function saveToLocalStorage() {

    // Save tasks to todoTasks list
    const todoTasksArray = [];
    todoTasks.querySelectorAll('li').forEach(li => {
        todoTasksArray.push(li.firstChild.nodeValue);
    });
    localStorage.setItem('todoTasks', JSON.stringify(todoTasksArray));



    // Save tasks to doneTasks list
    const doneTasksArray = [];
    doneTasks.querySelectorAll('li').forEach(li => {
        doneTasksArray.push(li.firstChild.nodeValue);
    });
    localStorage.setItem('doneTasks', JSON.stringify(doneTasksArray));
}

function loadLocalStorage(){
    const todoTasksArray = JSON.parse(localStorage.getItem('todoTasks')) || [];
    const doneTasksArray = JSON.parse(localStorage.getItem('doneTasks')) || [];


    todoTasksArray.forEach(task =>{
        const li = document.createElement('li');
        li.textContent = task;

        completedTask(li);

        editingTask(li);

        deletingTask(li);

        todoTasks.appendChild(li);
    });

    doneTasksArray.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        li.classList.add('done');

        completedTask(li);

        editingTask(li);

        deletingTask(li);

        doneTasks.appendChild(li);

    })



}

