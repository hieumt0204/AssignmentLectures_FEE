"use strict";

const currentUser = getCurrentUser();

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const logoutButton = document.getElementById("btn-logout");
if (currentUser) {
  //an phan hien thi dang nhap
  loginModal.style.display = "none";
  //hien thi phan chao mung va nut logout
  mainContent.style.display = "block";

  const welcomeMessage = document.createElement("p");

  welcomeMessage.textContent = "Welcome " + currentUser.lastName;
  mainContent.appendChild(welcomeMessage);

  //tao nut logout

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "pages/login.html";
  });

  mainContent.appendChild(logoutButton);
} else {
  loginModal.style.display = "block";
  mainContent.style.display = "none";
}
