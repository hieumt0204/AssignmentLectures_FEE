"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const inputTask = document.getElementById("input-task");
  const btnAdd = document.getElementById("btn-add");
  const todoList = document.getElementById("todo-list");

  // Lấy username của người dùng hiện tại từ localStorage
  const KEY = "userArr";
  const userArr = getFromStorage(KEY, []);
  const currentUser = userArr;

  if (!currentUser) {
    alert("Please login to use the Todo List.");
    window.location.href = "../pages/login.html";
  }
  let todoArr = getFromStorage("todoArr", []);
  if (!Array.isArray(todoArr)) {
    todoArr = [];
  }

  // Hiển thị danh sách công việc ban đầu
  displayTodos();

  // Thêm công việc mới khi nhấn nút "Add"
  btnAdd.addEventListener("click", () => {
    const taskText = inputTask.value.trim();
    if (taskText !== "") {
      const newTask = {
        task: taskText,
        owner: currentUser.username,
        isDone: false,
      };
      todoArr.push(newTask);
      inputTask.value = "";
      saveTodos();
      displayTodos();
    }
  });

  // Xử lý sự kiện khi nhấn nút "Enter" trên bàn phím
  inputTask.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      btnAdd.click();
    }
  });

  // Đánh dấu công việc là đã hoàn thành hoặc chưa hoàn thành
  todoList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const index = event.target.getAttribute("data-index");
      todoArr[index].isDone = !todoArr[index].isDone;
      saveTodos();
      displayTodos();
    }
  });

  // Xóa công việc khi nhấn vào nút "x" (close)
  todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("close")) {
      const index = event.target.parentElement.getAttribute("data-index");
      todoArr.splice(index, 1);
      saveTodos();
      displayTodos();
    }
  });

  // Hiển thị danh sách công việc
  function displayTodos() {
    todoList.innerHTML = "";
    const userTodos = todoArr.filter(
      (task) => task.owner === currentUser.username
    );
    userTodos.forEach((todo, index) => {
      const todoItem = document.createElement("li");
      todoItem.dataset.index = index;
      todoItem.textContent = todo.task;
      if (todo.isDone) {
        todoItem.classList.add("checked");
      }

      const closeBtn = document.createElement("span");
      closeBtn.className = "close";
      closeBtn.textContent = "×";

      todoItem.appendChild(closeBtn);
      todoList.appendChild(todoItem);
    });
  }

  // Lưu danh sách công việc vào localStorage
  function saveTodos() {
    saveToStorage("todoArr", todoArr);
  }
});
