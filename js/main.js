"use strict";
//defining variables
let TasksArr = [
  {
    name: "Sample 1",
    isDone: true,
  },
  {
    name: "Sample 2",
    isDone: false,
  },
];
const TasksDiv = document.getElementById("tasks");
const AddTaskBtn = document.getElementById("add-task-btn");
const AddTaskInput = document.getElementById("task-input");
const ErrorAlert = document.getElementById("error-container");
const dateParagraph = document.getElementById("date");
const date = new Date();

//Set The Date With Current Date
(function SetDate(params) {
  dateParagraph.innerHTML = date.toDateString();
})();

//check If The Local Storage is null or not for initialization samples
(function LocalStorageCheck() {
  if (localStorage.getItem("tasks") == null) {
    DisplayTasks();
    UpdateLocalStorage();
  } else {
    TasksArr = JSON.parse(localStorage.getItem("tasks"));
    DisplayTasks();
  }
})();

//add Task To The Tasks Array when clicl on add icon
AddTaskBtn.addEventListener("click", function () {
  if (TaskInputValidation(AddTaskInput.value)) {
    TasksArr.push(TaskBuilder(AddTaskInput.value));
    AddTaskInput.value = "";
  }
  DisplayTasks();
  UpdateLocalStorage();
});

//listen on input to add real time validation
AddTaskInput.addEventListener("keyup", function () {
  TaskInputValidation(AddTaskInput.value);
});

//task Builder
function TaskBuilder(inputValue) {
  let NewTask = {
    name: inputValue,
    isDone: false,
  };
  return NewTask;
}

//check if the input is a valid task or not
function TaskInputValidation(text) {
  const regex = /^[A-Z]{1}[a-z]{1,11}$/;
  if (regex.test(text)) {
    ErrorAlert.style.display = "none";
    return true;
  } else {
    ErrorAlert.style.display = "flex";
    return false;
  }
}

//Display Tasks From Tasks Array
function DisplayTasks() {
  let HtmlTasksDiv = "";
  for (let i = 0; i < TasksArr.length; i++) {
    if (TasksArr[i].isDone) {
      HtmlTasksDiv += `<div class="task">
                        <input class="task-status" type="checkbox" checked order-number="${i}">
                        <p class="checked">${TasksArr[i].name}</p>
                        <i class="fa-solid fa-xmark close-icon" onclick="DeleteTask(${i})"></i>
                    </div>`;
    } else {
      HtmlTasksDiv += `<div class="task">
                            <input class="task-status" type="checkbox" order-number="${i}">
                            <p>${TasksArr[i].name}</p>
                            <i class="fa-solid fa-xmark close-icon" onclick="DeleteTask(${i})"></i>
                        </div>`;
    }
  }
  TasksDiv.innerHTML = HtmlTasksDiv;
}

//Delete Task From Tasks Array
function DeleteTask(index) {
  TasksArr.splice(index, 1);
  DisplayTasks();
  UpdateLocalStorage();
}

//Listen On Task Is Done Or Not
window.addEventListener("click", function (e) {
  if (e.target.classList.contains("task-status")) {
    TaskStatusCheck(e.target);
  }
});

//change the state of task even done or not
function TaskStatusCheck(CheckBoxInput) {
  if (CheckBoxInput.hasAttribute("checked")) {
    TasksArr[
      Number.parseInt(CheckBoxInput.getAttribute("order-number"))
    ].isDone = false;
  } else {
    TasksArr[
      Number.parseInt(CheckBoxInput.getAttribute("order-number"))
    ].isDone = true;
  }
  DisplayTasks();
  UpdateLocalStorage();
}

//Set Element of Tasks Array To Local Storage
function UpdateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(TasksArr));
}
