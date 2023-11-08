"use strict";
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultVal) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultVal;
}

const setCurrentUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user || null;
};
