// Get todos from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to render todos
function renderTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("flex", "items-center", "justify-between", "px-4", "py-2", "bg-white", "rounded-md", "shadow-md");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList.add("mr-2", "cursor-pointer");
    checkbox.addEventListener("change", () => {
      toggleTodoCompletion(index);
    });

    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    todoText.classList.add("flex-1", "mr-2", {
      "line-through text-gray-400": todo.completed,
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash text-red-500"></i>';
    deleteButton.classList.add("focus:outline-none");
    deleteButton.addEventListener("click", () => {
      deleteTodo(index);
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  });
}

// Function to add a new todo
function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    todos.push({ text: todoText, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";
    renderTodos();
  }
}

// Function to toggle todo completion
function toggleTodoCompletion(index) {
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Initial render of todos
renderTodos();

// Add event listener for new todo input
document.getElementById("todo-input").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});
