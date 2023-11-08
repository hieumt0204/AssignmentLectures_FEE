"use strict";
const petArr = getFromStorage("petArr", []);

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

// const petKey = "petArr";
// const breedKey = "breedArr";

// const petArr = [];

// let petArr = JSON.parse(getFromStorage("petArr")) || [];
const petKey = "petArr";
const breedKey = "breedArr";
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    saveToStorage(petKey, petArr);
    clearInput();
    renderTableData(petArr);
  }
});

function validateData(data) {
  for (let key in data) {
    if (data[key] === "" || data[key] === null) {
      alert("Please input for " + key + " !");
      return;
    }

    if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15!");
      return;
    }
    if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      return;
    }
    if (data.length < 1 || data.length > 100) {
      alert("Length must be between 1 and 100!");
      return;
    }
    if (data.type === "Select Type") {
      alert("Please select Type!");
      return;
    }
    if (data.breed === "Select Breed") {
      alert("Please select Breed!");
    }
    const isDulicateId = petArr.some((pet) => pet.id === data.id);
    if (isDulicateId) {
      alert("ID must be unique!");
      return false;
    } else {
      return true;
    }
  }
}
function clearInput() {
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
}
function renderTableData(petArr) {
  const tableBodyEl = document.getElementById("tbody");

  tableBodyEl.innerHTML = "";

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
                <button class="btn btn-danger" onclick="deletePet('${
                  pet.id
                }')">Delete</button>
            </td>

        `;
    tableBodyEl.appendChild(row);
  }
}

function deletePet(petId) {
  if (confirm("Are you sure you want to delete this pet?")) {
    const index = petArr.findIndex((pet) => pet.id === petId);
    if (index !== -1) {
      petArr.splice(index, 1);

      saveToStorage(petKey, petArr);
      renderTableData(petArr);
    }
  }
}

let healthyCheck = false;
let healthyPetArr = [];

const showHealthyPetBtn = document.getElementById("healthy-btn");

showHealthyPetBtn.addEventListener("click", function () {
  healthyCheck = !healthyCheck;
  showHealthyPetBtn.textContent = healthyCheck
    ? "Show All Pet"
    : "Show Healthy Pet";

  if (healthyCheck) {
    healthyPetArr = petArr.filter(
      (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
    );
    renderTableData(healthyPetArr);
  } else {
    renderTableData(petArr);
  }
});

const calculateBMIButton = document.getElementById("calculate-bmi-btn");

calculateBMIButton.addEventListener("click", function () {
  for (const pet of petArr) {
    const bmi = calculateBMI(pet);
    pet.bmi = bmi;
  }

  saveToStorage(petKey, petArr);

  renderTableData(petArr);
});

function calculateBMI(pet) {
  if (pet.type === "Dog") {
    return ((pet.weight * 703) / pet.length ** 2).toFixed(2);
  } else if (pet.type === "Cat") {
    return ((pet.weight * 886) / pet.length ** 2).toFixed(2);
  } else {
    return "?";
  }
}
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

renderTableData(petArr);
