const breedArr = getFromStorage("petArr", []);

renderTableEditData(petArr);
function renderTableEditData(petArr) {
  // Lấy ra tbody của bảng
  const tableBodyEl = document.getElementById("tbody");

  // Xóa toàn bộ nội dung hiện tại của bảng
  tableBodyEl.innerHTML = "";

  // Duyệt qua danh sách thú cưng và thêm từng thú cưng vào bảng
  for (const pet of petArr) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <th scope="row">${pet.id}</th>
            <td>${pet.name}</td>
            <td>${pet.age}</td>
            <td>${pet.type}</td>
            <td>${pet.weight} kg</td>
            <td>${pet.length} cm</td>
            <td>${pet.breed}</td>
            <td><i class="bi bi-square-fill" style="color: ${
              pet.color
            }"></i></td>
            <td>${
              pet.vaccinated
                ? '<i class="bi bi-check-circle-fill"></i>'
                : '<i class="bi bi-x-circle-fill"></i>'
            }</td>
            <td>${
              pet.dewormed
                ? '<i class="bi bi-check-circle-fill"></i>'
                : '<i class="bi bi-x-circle-fill"></i>'
            }</td>
            <td>${
              pet.sterilized
                ? '<i class="bi bi-check-circle-fill"></i>'
                : '<i class="bi bi-x-circle-fill"></i>'
            }</td>
            <td>${formatDate(pet.date)}</td>
            <td>${pet.bmi}</td>
            <td>
                <button class="btn btn-warning edit-btn" onclick="startEditPet('${
                  pet.id
                }')">Edit</button>
            </td>
        


        `;
    tableBodyEl.appendChild(row);
  }
}

function startEditPet(petId) {
  // Tìm thông tin thú cưng muốn chỉnh sửa dựa trên petId
  const petToEdit = petArr.find((pet) => pet.id === petId);

  // Hiển thị thông tin của thú cưng lên form chỉnh sửa
  document.getElementById("edit-name").value = petToEdit.name;
  document.getElementById("edit-age").value = petToEdit.age;
  document.getElementById("edit-type").value = petToEdit.type;
  // Thêm code để hiển thị Breed tương ứng với Type
  document.getElementById("edit-breed").value = petToEdit.breed;

  // Hiển thị form chỉnh sửa và ẩn nút "Submit"
  document.getElementById("edit-form").style.display = "block";
  document.getElementById("submit-edit-btn").style.display = "none";

  // Gán giá trị petId vào một biến global (để sử dụng trong hàm lưu chỉnh sửa)
  currentEditPetId = petId;
}

function saveEditedPet() {
  const editName = document.getElementById("edit-name").value;
  const editAge = document.getElementById("edit-age").value;
  const editType = document.getElementById("edit-type").value;
  const editBreed = document.getElementById("edit-breed").value;

  // Thực hiện Validate dữ liệu như trong bài Assignment 01
  // Nếu dữ liệu hợp lệ, tiếp tục
  if (validatePetData(editName, editAge, editType, editBreed)) {
    // Tìm thú cưng cần chỉnh sửa dựa trên currentEditPetId và cập nhật thông tin mới
    const editedPetIndex = petArr.findIndex(
      (pet) => pet.id === currentEditPetId
    );
    if (editedPetIndex !== -1) {
      petArr[editedPetIndex].name = editName;
      petArr[editedPetIndex].age = editAge;
      petArr[editedPetIndex].type = editType;
      petArr[editedPetIndex].breed = editBreed;

      // Lưu thông tin mới vào LocalStorage
      saveToStorage("petArr", JSON.stringify(petArr));

      // Ẩn form chỉnh sửa
      document.getElementById("edit-form").style.display = "none";

      // Hiển thị lại nút "Submit" để thêm thú cưng mới
      document.getElementById("submit-edit-btn").style.display = "block";

      // Gọi lại hàm renderPetTable để hiển thị danh sách thú cưng mới
      renderPetTable();
    }
  }
}
