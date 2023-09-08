const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const alertSound = document.getElementById("alertSound");


const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${task.taskName}</span><span>${task.taskTime}<button class="bg-red margin-3" onclick="deleteTask(${index})">Delete</button><button class="bg-blue margin-3" onclick="updateTask(${index})">Update</button></span>`;
        taskList.appendChild(li);
    });
}

addButton.addEventListener("click", () => {
    alertSound.play();
    const newTask = taskInput.value.trim();
    const newTime = timeInput.value.trim();
    if (newTask !== "" && newTime !== "") {
        tasks.push({ taskName: newTask, taskTime: newTime });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        timeInput.value = "";
        renderTasks();
    } else {
        alertSound.play();
        alert("Please enter both task and time.");
    }
});

const deleteTask = (index) => {
    alertSound.play();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

const updateTask = (index) => {
    alertSound.play();
    const updatedTask = prompt("Update the task:", tasks[index].taskName);
    if (updatedTask !== null) {
        tasks[index].taskName = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
    alertSound.play();
    const updatedTime = prompt("Update the time:", tasks[index].taskTime);
    if (updatedTime !== null) {
        tasks[index].taskTime = updatedTime;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}

const checkTasksTime = () => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    tasks.forEach((task, index) => {
        if (task.taskTime === currentTime) {
            alertSound.play();
            const confirmation = confirm(`Time for task: "${task.taskName}"\nDo you want to delete this task?`);
            if (confirmation) {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            }
        }
        if(task.taskTime < currentTime){
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    });
}

setInterval(checkTasksTime, 1000);

renderTasks();