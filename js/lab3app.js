"use strict";

//Array of tasks
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
        "important": true,
        "private": true,
        "deadline": new Date("2020-05-07T19:00:00"),
        "project": "Personal"
    },
    {
        "id": 3,
        "description": "Finish reading current book",
        "important": false,
        "private": true,
        "deadline": new Date("2020-05-20T14:00:00"),
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

    exDiv.appendChild(inDiv)
    exDiv.appendChild(taskDeadline)
    if(!task.private && task.sharedWith !== undefined){
        inDiv.insertAdjacentHTML("afterend", "<img src=\"https://image.flaticon.com/icons/svg/615/615075.svg\" width=\"20\" height=\"20\" alt=\"\">")
    }

    li.appendChild(exDiv)
    return li
}


