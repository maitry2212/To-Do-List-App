document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);

  input.value = "";
}

function createTaskElement(text, isCompleted = false) {
  const li = document.createElement("li");
  if (isCompleted) li.classList.add("completed");

  li.innerHTML = `
    <span onclick="toggleTask(this)">${text}</span>
    <button onclick="deleteTask(this)">Delete</button>
  `;

  document.getElementById("taskList").appendChild(li);
}

function toggleTask(span) {
  span.parentElement.classList.toggle("completed");
  updateStorage();
}

function deleteTask(button) {
  button.parentElement.remove();
  updateStorage();
}

function saveTask(text) {
  const tasks = getTasks();
  tasks.push({ text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateStorage() {
  const items = document.querySelectorAll("#taskList li");
  const tasks = Array.from(items).map(li => ({
    text: li.querySelector("span").innerText,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
