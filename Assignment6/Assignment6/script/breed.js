const breedArr = getFromStorage("breedArr", []);

renderBreedTable(breedArr);

function renderBreedTable(breeds) {
  const tbody = document.getElementById("tbody");

  tbody.innerHTML = "";

  for (let i = 0; i < breeds.length; i++) {
    const breed = breeds[i];
    const row = document.createElement("tr");

    row.innerHTML = `
             <th scope="row">${i + 1}</th>
            <td>${breed.name}</td>
            <td>${breed.type}</td>
            <td>
                 <button class="btn btn-danger" onclick="deleteBreed(${i})">Delete</button>
            </td>
        `;

    tbody.appendChild(row);
  }
}
// Lấy các elements từ HTML
const breedNameInput = document.getElementById("input-breed");
const breedTypeInput = document.getElementById("input-type");
const submitBreedBtn = document.getElementById("submit-btn");

// Thêm sự kiện click cho nút "Submit"
submitBreedBtn.addEventListener("click", function () {
  // Lấy giá trị từ input fields
  const name = breedNameInput.value;
  const type = breedTypeInput.value;

  // Tạo Object chứa dữ liệu Breed
  const breedData = {
    name,
    type,
  };

  // Validate các trường
  if (!name || !type) {
    alert("Please fill in both Name and Type fields.");
    return;
  }

  // Thêm Object vào mảng breedArr
  breedArr.push(breedData);

  // Lưu mảng mới vào LocalStorage
  saveToStorage("breedArr", breedArr);

  // Gọi lại hàm renderBreedTable để hiển thị dữ liệu
  renderBreedTable(breedArr);

  // Xóa giá trị trong input fields sau khi thêm thành công
  breedNameInput.value = "";
  breedTypeInput.value = "Select Type";
});

// Hàm xóa Breed
function deleteBreed(index) {
  if (confirm("Are you sure you want to delete this Breed?")) {
    breedArr.splice(index, 1); // Xóa Breed khỏi mảng
    saveToStorage("breedArr", breedArr); // Lưu mảng mới vào LocalStorage
    renderBreedTable(breedArr); // Cập nhật bảng
  }
}
// Lấy các elements từ HTML
const breedTypeSelect = document.getElementById("input-type"); // Loại Breed Input

// Bổ sung sự kiện khi giá trị của Type Input thay đổi
breedTypeSelect.addEventListener("onchange", function () {
  // Lọc mảng breedArr theo loại đã chọn
  const selectedType = breedTypeSelect.value;
  const filteredBreeds = breedArr.filter(
    (breed) => breed.type === selectedType
  );

  // Gọi hàm renderBreed để hiển thị danh sách Breed tương ứng
  renderBreed(filteredBreeds);
});
function filterBreedsByType() {
  const selectedType = document.getElementById("input-type").value; // Lấy loài (type) đã chọn

  // Sử dụng hàm filter để lọc các Breed theo loài (type) đã chọn
  const filteredBreeds = breedArr.filter(
    (breed) => breed.type === selectedType
  );

  // Gọi hàm renderBreedTable để hiển thị danh sách các Breed đã lọc
  renderBreedTable(filteredBreeds);
}

// Hàm renderBreed để hiển thị danh sách Breed tương ứng
function renderBreed(breeds) {
  const breedInput = document.getElementById("input-breed"); // Breed Input
  breedInput.innerHTML = ""; // Xóa các option cũ

  // Tạo thêm option mới cho mỗi Breed trong danh sách
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.name; // Giá trị của option là tên Breed
    option.innerHTML = breed.name; // Hiển thị tên Breed
    breedInput.appendChild(option);
  });
}

// Gọi renderBreed khi trang tải lần đầu để hiển thị danh sách ban đầu
renderBreed(breedArr);
