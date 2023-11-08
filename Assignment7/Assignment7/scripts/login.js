"use strict";
const KEY = "userArr";
const loginButton = document.getElementById("btn-submit");
const userArr = getFromStorage(KEY, []);
loginButton.addEventListener("click", function () {
  const usernameInput = document.getElementById("input-username");
  const passwordInput = document.getElementById("input-password");

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (!username || !password) {
    alert("Please input username and password");
  }

  const user = userArr.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    setCurrentUser(user);
    window.location.href = "../index.html";
  } else {
    alert("Username or password incorrect!");
  }
});
