let todoItems = [];
const container = document.querySelector(".container");

// Render todos on the screen
function renderTodo(todo) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));

  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = "";
    return;
  }

  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `todo-item droppable ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.setAttribute("draggable", true);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <div class="timestamp">
            <p>Created at: ${todo.created_at.slice(0, 19).replace("T", " ")}</p>
            <p>Completed at: ${
              todo.completed_at
                ? todo.completed_at.slice(0, 19).replace("T", " ")
                : "Not completed yet"
            }</p>
    </div>
    <button class="delete-todo js-delete-todo">
            <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  // If item already exists in the DOM, replace it
  if (item) {
    list.replaceChild(node, item);
  } else {
    // else, append it to the end of the list
    list.append(node);
  }

  const sortable = Sortable.create(list);
}

// Add a new todo
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
    created_at: new Date().toISOString(),
  };

  //Fetch request to add todo to database
  fetch("/api/add-todo", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.text());
      }
      return response.text();
    })
    .then((text) => {
      todoItems.push(todo);
      renderTodo(todo);
    })
    .catch((err) => {
      alert(err);
    });
}

// Mark todo as done
function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  todoItems[index].completed_at = new Date().toISOString();
  renderTodo(todoItems[index]);

  const todo = todoItems[index];

  fetch("/api/mark-checked", {
    method: "PATCH",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.text());
      }
      return response.text();
    })
    .then((text) => {
      todoItems.push(todo);
      renderTodo(todo);
      console.log(text);
    })
    .catch((err) => {
      alert(err);
    });
}

// Delete todo
function deleteTodo(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));

  const todo = {
    deleted: true,
    ...todoItems[index],
  };

  todoItems = todoItems.filter((item) => item.id !== Number(key));

  fetch("/api/delete-todo", {
    method: "DELETE",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.text());
      }
      return response.text();
    })
    .then((text) => {
      renderTodo(todo);
    })
    .catch((err) => {
      alert(err);
    });
}

// Render existing todo items when page is reloaded
document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todoItems");
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
    });
  }
});

// Create a new todo item and reset input field
const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector(".js-todo-input");

  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

// Check or delete todo items
const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});
