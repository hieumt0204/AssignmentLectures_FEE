"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tbody = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("bmi-btn");

submitBtn.addEventListener("click", function (e) {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  function validateData(data) {
    for (let key in data) {
      if (data[key] === "" || data[key] === null) {
        alert("Please input for " + key + "!");
      }
    }
    for (let pet of petArr) {
      if (pet.id === data.id) {
        alert("ID must be unique!");
      }
    }

    if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15!");
    }
    if (data.length < 1 || data.length > 100) {
      alert("Length must be between 1 and 100!");
    }
    if (data.type === "Select Type") {
      alert("Please select Type!");
    }
    if (data.breed === "Select Breed") {
      alert("Please select Breed!");
    }
    return true;
  }
  const clearInput = () => {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  };

  //   function renderTableData(petArr) {
  //     const tableBody = document.getElementById("tbody");
  //     tableBody.innerHTML = "";

  //     for (let pet of petArr) {
  //       const row = document.createElement("tr");

  //       for (let key in pet) {
  //         const cell = document.createElement("td");

  //         if (
  //           key === "vaccinated" ||
  //           key === "dewormed" ||
  //           key === "sterilized"
  //         ) {
  //           const icon = document.createElement("i");
  //           icon.className = pet[key]
  //             ? "bi bi-check-circle-fill"
  //             : "bi bi-x-circle-fill";
  //           cell.appendChild(icon);
  //         } else if (key === "color") {
  //           const icon = document.createElement("i");
  //           icon.className = "bi bi-square-fill";
  //           icon.style.color = pet[key];
  //           cell.appendChild(icon);
  //         } else {
  //           cell.textContent = pet[key];
  //         }

  //         row.appendChild(cell);
  //       }

  //       const deleteButton = document.createElement("button");
  //       deleteButton.type = "button";
  //       deleteButton.className = "btn btn-danger";
  //       deleteButton.textContent = "Delete";
  //       const deleteCell = document.createElement("td");
  //       deleteCell.appendChild(deleteButton);
  //       row.appendChild(deleteCell);

  //       tableBody.appendChild(row);
  //     }
  //   }
  const petArr = [];
  function renderTableData(petArr) {
    const tableBodyEl = document.getElementById("tbody");
    // tableBodyEl.innerHTML = "";

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
                ? '<i class="bi bi-check-circle-fill" style="color: green"></i>'
                : '<i class="bi bi-x-circle-fill" style="color: red"></i>'
            }</td>
            <td>${
              pet.dewormed
                ? '<i class="bi bi-check-circle-fill" style="color: green"></i>'
                : '<i class="bi bi-x-circle-fill" style="color: red"></i>'
            }</td>
            <td>${
              pet.sterilized
                ? '<i class="bi bi-check-circle-fill" style="color: green"></i>'
                : '<i class="bi bi-x-circle-fill" style="color: red"></i>'
            }</td>
            <td class="column-bmi">${pet.bmi}</td>
            <td>${pet.date.toLocaleDateString()}</td>
            <td><button type="button" class="btn btn-danger delete-btn" onclick="deletePet('${
              pet.id
            }')">Delete</button></td>
        `;

      const deleteBtn = row.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure?")) {
          // Xóa thú cưng khỏi danh sách petArr
          const index = petArr.findIndex((p) => p.id === pet.id);
          if (index !== -1) {
            petArr.splice(index, 1);
            // renderTableData(petArr);
          }
          // Xóa hàng khỏi bảng
          row.remove();
        }
      });

      // Thêm hàng mới vào bảng
      tableBodyEl.appendChild(row);
    }
  }

  const validate = validateData(data);

  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }

  healthyBtn.addEventListener("click", function () {
    let healthyCheck = false;
    const healthyPetArr = [];

    healthyCheck = !healthyCheck;

    if (healthyCheck) {
      healthyBtn.textContent = "Show All Pet";
    } else {
      healthyBtn.textContent = "Show Healthy Pet";
    }

    // Lọc danh sách thú cưng khỏe mạnh nếu healthyCheck = true
    if (healthyCheck) {
      healthyPetArr.length = 0; // Xóa toàn bộ dữ liệu trong mảng healthyPetArr

      // Lọc thú cưng khỏe mạnh và thêm vào mảng healthyPetArr
      petArr.forEach((pet) => {
        if (pet.vaccinated && pet.dewormed && pet.sterilized) {
          healthyPetArr.push(pet);
        }
      });

      // Hiển thị danh sách thú cưng khỏe mạnh
      renderTableData(healthyPetArr);
    } else {
      // Hiển thị toàn bộ danh sách thú cưng
      renderTableData(petArr);
    }
  });

  calculateBmiBtn.addEventListener("click", function () {
    const type = typeInput.value;
    const weight = weightInput.value;
    const length = lengthInput.value;
    const bmiValue = calculateBMI(type, weight, length);

    // Cập nhật giá trị BMI trong bảng dữ liệu
    const bmiColumn = document.querySelectorAll(".column-bmi");
    bmiColumn.forEach((column) => {
      column.textContent = bmiValue;
    });
  });

  function calculateBMI(type, weight, length) {
    if (type === "Dog") {
      const bmi = (weight * 703) / length ** 2;
      return bmi.toFixed(2);
    } else if (type === "Cat") {
      const bmi = (weight * 886) / length ** 2;
      return bmi.toFixed(2);
    } else {
      return "?";
    }
  }
});
