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

// adding a task
addButton.addEventListener('click', () => {
    const text = input.ariaValueMax.trim();
    if (text === "") return;

    clickSound.currentTime = 0;
    clickSound.play();

    const li = document.createElement("li");
    li.textContent ="❏ " + text;

    li.addEventListener('click', () => completeTask(li));

    taskList.appendChild(li);
    input.value = "";
});

