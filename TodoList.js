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
  
    saveTasksToLocalStorage();
  }
  
  function toggleComplete(span) {
    span.classList.toggle("completed");
    saveTasksToLocalStorage();
  }
  
  function removeTask(button) {
    const li = button.parentElement;
    li.remove();
    saveTasksToLocalStorage();
  }
  
  // Save tasks to localStorage
  /**
   * Saves the current list of tasks to localStorage.
   * Each task includes its text and completion status.
   */
  function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Load tasks from localStorage when page loads
  window.onload = function() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span onclick="toggleComplete(this)">${task.text}</span>
          <button onclick="removeTask(this)">❌</button>
        `;
        if (task.completed) {
            li.querySelector("span").classList.add("completed");
        }
        document.getElementById("taskList").appendChild(li);
    });
  
    document.getElementById("taskInput").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
  }