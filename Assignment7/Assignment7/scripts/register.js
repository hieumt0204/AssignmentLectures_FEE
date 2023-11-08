"use strict";

const KEY = "userArr";

const userArr = getFromStorage(KEY, []);
//lấy dữ liệu từ form
const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-password-confirm");
const register = document.getElementById("btn-submit");

register.addEventListener("click", function (e) {
  e.preventDefault();
  const dataUser = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };
  const user = validateUser(dataUser);
  if (user) {
    userArr.push(dataUser);

    saveToStorage(KEY, userArr);

    window.location.href = "../pages/login.html";
  }
});

function validateUser(dataUser) {
  for (let key in dataUser) {
    if (dataUser[key] === "" || dataUser[key] === null) {
      alert("Please input for " + key + "!");
    }
  }
  if (password.value !== confirmPassword.value) {
    alert("Mật khẩu và xác nhận mật khẩu không giống nhau.");
    return false;
  }
  if (password.length < 6) {
    alert("Please password must have at least 6 character");
    return false;
  }
  const isUsernameExists = userArr.some(
    (pet) => pet.username === dataUser.username
  );
  if (isUsernameExists) {
    alert("Username already exists, please choose another username");
    return false;
  }

  return new User(firstName, lastName, username, password);
}
