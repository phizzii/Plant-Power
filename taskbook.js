// close window sound
const clickSound = new Audio('assets/mouse_click.mp3');
document.getElementById('back_arrow').addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    window.close(); // works since this is a popup
    });


// task element stuff
const input = document.getElementById('new-task-input');
const addButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const completedList = document.getElementById('completed-list');

// save tasks using electron local storage

function saveTasks() {
    const tasks = [];
    const completed = [];

    taskList.querySelectorAll("li").forEach(li => tasks.push(li.textContent));
    completedList.querySelectorAll("li").forEach(li => completed.push(li.textContent));

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completed", JSON.stringify(completed));
}

// adding a task
addButton.addEventListener('click', () => {
    const text = input.value.trim();
    if (text === "") return;

    clickSound.currentTime = 0;
    clickSound.play();

    const li = document.createElement("li");
    li.textContent ="❏ " + text;

    li.addEventListener('click', () => completeTask(li));

    taskList.appendChild(li);
    input.value = "";
    saveTasks();
});

// marking file as complete

function completeTask(item) {
    clickSound.currentTime = 0;
    clickSound.play();

    const newItem = document.createElement("li");
    newItem.textContent = "✔ " + item.textContent.substring(2);

    item.remove();
    completedList.appendChild(newItem);
    saveTasks();
}

// tabs :)

const tabTasks = document.getElementById("tab-tasks");
const tabCompleted = document.getElementById("tab-completed");
const taskContainer = document.getElementById("task-list-container");
const completedContainer = document.getElementById("completed-list-container");

tabTasks.addEventListener("click", () => {
    tabTasks.classList.add("active");
    tabCompleted.classList.remove("active");

    taskContainer.style.display = "block";
    completedContainer.style.display = "none";
});

tabCompleted.addEventListener("click", () => {
    tabCompleted.classList.add("active");
    tabTasks.classList.remove("active");

    taskContainer.style.display = "none";
    completedContainer.style.display = "block";
});