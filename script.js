document.addEventListener("DOMContentLoaded", () => {
    fetchTasks();

    // Add event listener for form submission
    // const form = document.getElementById("event-form");
    // form.addEventListener("submit", async (e) => {
    //     e.preventDefault();
    //     await addTask();
    // });
});

// Function to fetch and display tasks
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/events');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    }
}

// Function to display tasks
function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear previous tasks

    tasks.forEach(task => {
        const taskRow = document.createElement('tr');
        taskRow.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.date}</td>
            <td>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskList.appendChild(taskRow);
    });
}

// Function to add a new task
async function addTask() {
    const name = document.getElementById("event-name").value;
    const description = document.getElementById("event-description").value;
    const date = document.getElementById("event-date").value;
    const location = document.getElementById("event-location").value;

    const newTask = {
        name,
        description,
        date,
        location
    };

    try {
        const response = await fetch('http://localhost:3000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error('Failed to add task:', error);
    }
}

// Function to delete a task
async function deleteTask(id) {
    try {
        const response = await fetch(`http://localhost:3000/events/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error('Failed to delete task:', error);
    }
}

// Function to edit a task (not fully implemented)
async function editTask(id) {
    // Implement edit functionality here
}
