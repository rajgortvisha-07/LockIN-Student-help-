// Check whether the user is logged in
const isLoggedIn = localStorage.getItem("isLoggedIn");
const userData = localStorage.getItem("user");
if (isLoggedIn !== "true" || userData === null) {
    window.location.href = "index.html";
}
// Get the logged-in user's information
const currentUser = JSON.parse(userData);
// Create a unique storage key for this student
const taskStorageKey =
    "tasks_" + currentUser.email;
// GET TASKS FROM LOCAL STORAGE
let tasks = JSON.parse(
    localStorage.getItem(taskStorageKey)
) || [];
// DISPLAY TASKS
function displayTasks() {
    taskList.innerHTML = "";
    // If there are no tasks
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="bi bi-clipboard-x fs-1"></i>
                <p class="mt-2">
                    No tasks yet. Add your first task!
                </p>
            </div>
        `;
        return;
    }
    // Display every task
    tasks.forEach(function (task, index) {
        let priorityClass = "bg-warning text-dark";
        if (task.priority === "High") {
            priorityClass = "bg-danger";
        } else if (task.priority === "Low") {
            priorityClass = "bg-success";
        }
        taskList.innerHTML += `
            <div class="border rounded p-3 mb-3">
                <div class="row align-items-center">
                    <!-- Checkbox -->
                    <div class="col-auto">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            ${task.completed ? "checked" : ""}
                            onchange="toggleTask(${index})"
                        >
                    </div>
                    <!-- Task Details -->
                    <div class="col">
                        <h6 class="mb-1 ${
                            task.completed
                                ? "text-decoration-line-through text-muted"
                                : ""
                        }">
                            ${task.name}

                        </h6>
                        <small class="text-muted">
                         Due:
                            ${task.dueDate || "No date"}
                        </small>
                    </div>
                    <!-- Priority -->
                    <div class="col-auto">
                        <span class="badge ${priorityClass}">
                            ${task.priority}
                        </span>
                    </div>
                    <!-- Buttons -->
                    <div class="col-auto mt-2 mt-md-0">
                        <button
                            class="btn btn-sm btn-outline-primary"
                            onclick="editTask(${index})"
                        >
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button
                            class="btn btn-sm btn-outline-danger"
                            onclick="deleteTask(${index})"   >
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}
// ADD TASK
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskName =
        document.getElementById("taskName").value.trim();
    const priority =
        document.getElementById("priority").value;
    const dueDate =
        document.getElementById("dueDate").value;
    // Check task name
    if (taskName === "") {
        taskMessage.innerHTML = `
            <div class="alert alert-danger">
                Please enter a task.
            </div>
        `;
        return;
    }
    // Create task
    const newTask = {
    name: taskName,
    priority: priority,
    dueDate: dueDate,
    completed: false,
    completedDate: null
};
    // Add task
    tasks.push(newTask);
    // Save tasks
   localStorage.setItem(
    taskStorageKey,
    JSON.stringify(tasks)
);
    // Reset form
    taskForm.reset();
    // Show success message
    taskMessage.innerHTML = `
        <div class="alert alert-success">
            Task added successfully!
        </div>
    `;
    // Display tasks
    displayTasks();
    // Remove message after 2 seconds
    setTimeout(function () {
        taskMessage.innerHTML = "";
    }, 2000);
});
// COMPLETE / UNCOMPLETE TASK
function toggleTask(index) {
    tasks[index].completed =
        !tasks[index].completed;
    // Save the completion date
    if (tasks[index].completed === true) {
        tasks[index].completedDate =
            new Date().toISOString();
    } else {
        tasks[index].completedDate = null;
    }
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
    displayTasks();
}
// DELETE TASK
function deleteTask(index) {
    tasks.splice(index, 1);
   localStorage.setItem(
    taskStorageKey,
    JSON.stringify(tasks)
);
    displayTasks();
}
// EDIT TASK
function editTask(index) {
    const newTaskName = prompt(
        "Edit task:",
        tasks[index].name
    );
    if (newTaskName === null) {
        return;
    }
    if (newTaskName.trim() === "") {
        return;
    }
    tasks[index].name =
        newTaskName.trim();
   localStorage.setItem(
    taskStorageKey,
    JSON.stringify(tasks)
);
    displayTasks();
}
// DISPLAY TASKS WHEN PAGE LOADS
displayTasks();
// Logout function
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    window.location.href = "index.html";
}