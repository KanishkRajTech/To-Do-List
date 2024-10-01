document.addEventListener('DOMContentLoaded', function() {
    let taskInput = document.getElementById("task_name");
    let addButton = document.querySelector(".submit");
    let incompleteTaskHolder = document.querySelector(".incomplete_task_list");
    let completedTasksHolder = document.querySelector(".complete_task_list");

    let createNewTaskElement = function(taskString) {
        let listItem = document.createElement("li");
        let checkBox = document.createElement("input");
        let label = document.createElement("label");
        let editInput = document.createElement("input");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");
  
        label.innerText = taskString;

        checkBox.type = "checkbox";
        editInput.type = "text";
        editInput.className = "edit_text"
        editInput.style.display = "none";
        editButton.innerText = "Edit";
        editButton.className = "edit";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";

        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    let addTask = function() {
        if (taskInput.value === "") {
            return;
        }

        let listItem = createNewTaskElement(taskInput.value);
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        taskInput.value = "";
    }

 let editTask = function() {
        let listItem = this.parentNode;

        let editInput = listItem.querySelector('input[type=text]');
        let label = listItem.querySelector("label");
        let containsClass = listItem.classList.contains("editMode");

        if (containsClass) {
            label.innerText = editInput.value;
            editInput.style.display = "none";
            label.style.display = "inline";
        } else {
            editInput.value = label.innerText;
            editInput.style.display = "inline";
            label.style.display = "none";
        }

        listItem.classList.toggle("editMode");
    }

    let deleteTask = function() {
        let listItem = this.parentNode;
        let ul = listItem.parentNode;
        ul.removeChild(listItem);
    }

    let taskCompleted = function() {
        let listItem = this.parentNode;
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    }

    let taskIncomplete = function() {
        let listItem = this.parentNode;
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }

    let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
        let checkBox = taskListItem.querySelector("input[type=checkbox]");
        let editButton = taskListItem.querySelector("button.edit");
        let deleteButton = taskListItem.querySelector("button.delete");

        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        checkBox.onchange = checkBoxEventHandler;
    }

    addButton.addEventListener("click", addTask);

    for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
        bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
    }

    for (let i = 0; i < completedTasksHolder.children.length; i++) {
        bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
    }
});
