"use strict";

//array of tasks
const tasks = [
    {
        "id": 1,
        "description": "Complete Lab 3 assignment",
        "important": true,
        "private": false,
        "sharedWith": "Giorgio",
        "deadline": new Date("2020-04-30T10:00:00"),
        "project": "Web Applications I"
    },
    {
        "id": 2,
        "description": "Take the dog for a walk",
        "important": false,
        "private": true,
        "deadline": new Date("2020-05-10T19:00:00"),
        "project": "Personal"
    },
    {
        "id": 3,
        "description": "Finish reading current book",
        "important": false,
        "private": true,
        "deadline": new Date("2020-05-20T14:00:00"),
        "project": "Personal"
    },
    {
        "id": 4,
        "description" : "Buy groceries",
        "important": true,
        "private": false,
        "sharedWith": "Giorgio, Nicola",
        "deadline": new Date("2020-05-08T19:00:00"),
        "project": "Personal"
    }
];


//creating a node <li>
function createTaskNode(task){
    const li = document.createElement("li")
    li.id = "task" + task.id
    li.className = "list-group-item"

    const exDiv = document.createElement("div")
    exDiv.className = "d-flex w-100 justify-content-between"
    const inDiv = document.createElement("div")
    inDiv.className = "custom-control custom-checkbox"

    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"
    checkBox.id = "checkb-" + task.id
    if(task.important)
        checkBox.className = "custom-control-input important"
    else
        checkBox.className = "custom-control-input"
    inDiv.appendChild(checkBox)

    const taskDescription = document.createElement("label")
    taskDescription.className = "custom-control-label"
    taskDescription.htmlFor = checkBox.id
    taskDescription.innerText = task.description
    inDiv.appendChild(taskDescription)

    if(task.project) {
        const projectLabel = document.createElement("span")
        projectLabel.className = "badge badge-dark ml-4"
        projectLabel.innerText = task.project
        inDiv.appendChild(projectLabel)
    }

    const taskDeadline = document.createElement("small")
    taskDeadline.innerText = task.deadline.toString()
    const now = new Date()
    if(task.deadline.getTime() < now.getTime()){
        taskDeadline.classList.add("bg-danger")
        taskDeadline.classList.add("text-white")
    }

    exDiv.appendChild(inDiv)
    exDiv.appendChild(taskDeadline)
    if(!task.private && task.sharedWith !== undefined){
        inDiv.insertAdjacentHTML("afterend", "<img src=\"https://image.flaticon.com/icons/svg/615/615075.svg\" width=\"20\" height=\"20\" alt=\"\">")
    }

    li.appendChild(exDiv)
    return li
}

//creating the full ul list
function createAllTasks(){
    const taskList = document.getElementById("tasks")
    for(const task of tasks){
        const listNode = createTaskNode(task)
        taskList.appendChild(listNode)
    }
}


function deleteTasks(){
    const taskList = document.getElementById("tasks")
    taskList.innerHTML = ""
}

//check if the date is today
function checkToday(date){
    const today = new Date()
    return today.getDay() == date.getDay() && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear()
}

//check if the date is within next week
function checkNextWeek(date){
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(23);
    nextWeek.setMinutes(59);
    nextWeek.setSeconds(59);
    nextWeek.setMilliseconds(59);
    return date.getTime() >= tomorrow.getTime() && date.getTime() <= nextWeek.getTime();
}

//filters definition
const all = document.getElementById("filter-all")
const important = document.getElementById("filter-important")
const today = document.getElementById("filter-today")
const nextWeek = document.getElementById("filter-week")
const fPrivate = document.getElementById("filter-private")
const shared = document.getElementById("filter-shared")
const taskTitle = document.getElementById("task-filter-head")

all.addEventListener("click", event => {
    all.classList.add("active")
    important.classList.remove("active")
    today.classList.remove("active")
    nextWeek.classList.remove("active")
    fPrivate.classList.remove("active")
    shared.classList.remove("active")
    taskTitle.innerText = "All"

    deleteTasks()
    createAllTasks()
})

important.addEventListener("click", event => {
    all.classList.remove("active")
    important.classList.add("active")
    today.classList.remove("active")
    nextWeek.classList.remove("active")
    fPrivate.classList.remove("active")
    shared.classList.remove("active")
    taskTitle.innerText = "Important"

    deleteTasks()
    const taskList = document.getElementById("tasks")
    for(const task of tasks) if(task.important){
            const li = createTaskNode(task)
            taskList.appendChild(li)
        }
})

today.addEventListener("click", event => {
    all.classList.remove("active")
    important.classList.remove("active")
    today.classList.add("active")
    nextWeek.classList.remove("active")
    fPrivate.classList.remove("active")
    shared.classList.remove("active")
    taskTitle.innerText = "Today"

    deleteTasks()
    const taskList = document.getElementById("tasks")
    for(const task of tasks) if (checkToday(task.deadline)) {
        const li = createTaskNode(task)
        taskList.appendChild(li)
    }
})

nextWeek.addEventListener("click", event => {
    all.classList.remove("active")
    important.classList.remove("active")
    today.classList.remove("active")
    nextWeek.classList.add("active")
    fPrivate.classList.remove("active")
    shared.classList.remove("active")
    taskTitle.innerText = "Next 7 Days"

    deleteTasks()
    const taskList = document.getElementById("tasks")
    for(const task of tasks) if (checkNextWeek(task.deadline)) {
        const li = createTaskNode(task)
        taskList.appendChild(li)
    }
})

fPrivate.addEventListener("click", event => {
    all.classList.remove("active")
    important.classList.remove("active")
    today.classList.remove("active")
    nextWeek.classList.remove("active")
    fPrivate.classList.add("active")
    shared.classList.remove("active")
    taskTitle.innerText = "Private"

    deleteTasks()
    const taskList = document.getElementById("tasks")
    for(const task of tasks) if (task.private) {
        const li = createTaskNode(task)
        taskList.appendChild(li)
    }
})

shared.addEventListener("click", event => {
    all.classList.remove("active")
    important.classList.remove("active")
    today.classList.remove("active")
    nextWeek.classList.remove("active")
    fPrivate.classList.remove("active")
    shared.classList.add("active")
    taskTitle.innerText = "Shared With..."

    deleteTasks()
    const taskList = document.getElementById("tasks")
    for(const task of tasks) if (!task.private) {
        const li = createTaskNode(task)
        taskList.appendChild(li)
    }
})

createAllTasks()
