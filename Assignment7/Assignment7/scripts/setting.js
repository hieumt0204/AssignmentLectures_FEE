"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSaveSettings = document.getElementById("btn-submit");
  const currentUser = getFromStorage("currentUser", []);

  if (!currentUser) {
    alert("Please login to use the Settings page.");
    window.location.href = "../pages/login.html";
  }

  // Hiển thị các thiết lập hiện tại
  const userSettings = getFromStorage("userSettings", []) ?? [];
  inputPageSize.value = userSettings.pageSize ?? 10;
  inputCategory.value = userSettings.category ?? "General";

  // Xử lý sự kiện khi người dùng lưu cài đặt
  btnSaveSettings.addEventListener("click", () => {
    const pageSize = parseInt(inputPageSize.value);
    const category = inputCategory.value;

    // Kiểm tra và giới hạn giá trị pageSize
    if (pageSize < 1) {
      alert("News per page should be at least 1.");
      return;
    }

    // Lưu cài đặt vào localStorage
    const updatedSettings = {
      pageSize: pageSize,
      category: category,
    };
    saveToStorage("userSettings", JSON.stringify(updatedSettings));

    alert("Settings saved.");
  });
});
