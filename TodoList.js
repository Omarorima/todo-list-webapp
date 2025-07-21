function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    if (task === "") return;
  
    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleComplete(this)">${task}</span>
      <button onclick="removeTask(this)">❌</button>
    `;
  
    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
  }
  
  function toggleComplete(span) {
    span.classList.toggle("completed");
  }
  
  function removeTask(button) {
    const li = button.parentElement;
    li.remove();
  }