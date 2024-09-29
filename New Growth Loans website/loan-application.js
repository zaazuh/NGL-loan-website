const nextButton = document.querySelector(".btn-next");
const prevButton = document.querySelector(".btn-prev");
const submitButton = document.querySelector(".btn-submit");
const steps = document.querySelectorAll(".step");
const form_steps = document.querySelectorAll(".form-step");
const grossIncomeInput = document.getElementById("gross-income-input");
const rentInput = document.getElementById("rent-input");
const electricityInput = document.getElementById("electricity-input");
const waterInput = document.getElementById("water-input");
const tvLicenseInput = document.getElementById("tv-license-input");
const buildingInsuranceInput = document.getElementById("building-insurance-input");
const contactNameInput = document.getElementById("contactName");
const genderInput = document.getElementById("gender");
const IDNumberInput = document.getElementById("IDNumber");
const emailInput = document.getElementById("email");
const cellNumberInput = document.getElementById("cellNumber");
const addressInput = document.getElementById("address");
const bankNameInput = document.getElementById("bankName");
const bankAccountTypeInput = document.getElementById("bankAccountType");
const accountNumberInput = document.getElementById("accountNumber");
const branchCodeInput = document.getElementById("branchCode");
// const fileInput = document.getElementById("file-input");
const TCcheckboxInput = document.getElementById("TCcheckbox");
const PIcheckboxInput = document.getElementById("PIcheckbox");
let balanceLabel = document.getElementById("balance-label");

let active = 1;

// Define inputs variable here to make it accessible to both event listeners
let inputs;

nextButton.addEventListener("click", () => {
  const currentFormStep = document.querySelector(`.form-step.active`);
  inputs = currentFormStep.querySelectorAll("input, select");
  let isValid = true;
  const errorMessages = []; // Array to store error messages

  inputs.forEach((input) => {
    if (input.required) {
      if (input.value.trim() === "") {
        isValid = false;
        errorMessages.push(`${input.name} field is empty.`);
      } else if (input.type === "number" && isNaN(input.value)) {
        isValid = false;
        errorMessages.push(`Please enter a valid number in the ${input.name} field.`);
      }
    }
  });

  // Custom field validations
  if (!validateFullName(contactNameInput.value)) {
    isValid = false;
    errorMessages.push("Please enter a valid full name with at least 3 characters, more than one word, and maximum 30 characters.");
  }
  // if (genderInput.value === "") {
  //   isValid = false;
  //   errorMessages.push("Please select a gender.");
  // }
  if (!validateIDNumber(IDNumberInput.value)) {
    isValid = false;
    errorMessages.push("Please enter a valid South African ID number.");
  }
  if (!validateEmail(emailInput.value)) {
    isValid = false;
    errorMessages.push("Please enter a valid email address.");
  }
  if (!validatePhoneNumber(cellNumberInput.value)) {
    isValid = false;
    errorMessages.push("Please enter a valid South African phone number.");
  }
  if (!validateHomeAddress(addressInput.value)) {
    isValid = false;
    errorMessages.push("Please enter a valid home address with a building number, road, suburb, and city.");
  }

  // Validate loan amount range
  const loanAmountInput = document.getElementById("loanAmount");
  const loanAmount = parseFloat(loanAmountInput.value);
  const minLoanAmount = parseFloat(loanAmountInput.min);
  const maxLoanAmount = parseFloat(loanAmountInput.max);

  if (loanAmount < minLoanAmount || loanAmount > maxLoanAmount) {
    isValid = false;
    errorMessages.push(`Desired loan amount must be between ${minLoanAmount} and ${maxLoanAmount} Rands.`);
  }

  if (!isValid) {
    alert("Please fix the following errors:\n\n" + errorMessages.join("\n"));
  } else {
    // Check if the balance is sufficient
    const balance = parseFloat(balanceLabel.textContent);
    if (balance < 5000) {
      alert("In order to qualify for a loan, you need to have at least 5000 Rands left in your balance.");
    } else {
      active++;
      if (active > steps.length) {
        active = steps.length;
      }
      updateProgress();
    }
  }
});

prevButton.addEventListener("click", () => {
  active--;
  if (active < 1) {
    active = 1;
  }
  updateProgress();
});

submitButton.addEventListener("click", () => {
  let isValid = true;
  const errorMessages = [];

  // Check for empty required fields and invalid numbers using inputs from nextButton event listener
  inputs.forEach((input) => {
    if (input.required) {
      if (input.value.trim() === "") {
        isValid = false;
        errorMessages.push(`${input.name} field is empty.`);
      } else if (input.type === "number" && isNaN(input.value)) {
        isValid = false;
        errorMessages.push(`Please enter a valid number in the ${input.name} field.`);
      }
    }
  });

  // Custom field validations for step 5
  if (!validateBankName(bankNameInput.value)) {
    isValid = false;
    errorMessages.push("Bank name should contain only letters.");
  }
  if (!validateAccountNumber(accountNumberInput.value)) {
    isValid = false;
    errorMessages.push("Account number should be either 9 or 11 digits.");
  }
  if (!validateBranchCode(branchCodeInput.value)) {
    isValid = false;
    errorMessages.push("Branch code should be 6 digits.");
  }

  // Check if at least two files have been selected
  if (fileInput.files.length < 2) {
    isValid = false;
    errorMessages.push("Please upload at least two documents.");
  }

  // Check if the checkboxes are checked
  if (!TCcheckboxInput.checked) {
    isValid = false;
    errorMessages.push("You must accept the Terms and Conditions.");
  }
  if (!PIcheckboxInput.checked) {
    isValid = false;
    errorMessages.push("You must give consent to share your personal information.");
  }

  // Display alert box with error messages if validation fails
  if (!isValid) {
    alert("Please fix the following errors:\n\n" + errorMessages.join("\n"));
    return; // Prevent form submission
  }

  // If validation passes, show success message
  alert("Form submitted successfully!");
});

// Rest of your code...



const updateProgress = () => {
  // toggle .active class for each list item
  steps.forEach((step, i) => {
    if (i == active - 1) {
      step.classList.add("active");
      form_steps[i].classList.add("active");
    } else {
      step.classList.remove("active");
      form_steps[i].classList.remove("active");
    }
  });

  // enable or disable prev and next buttons
  if (active === 1) {
    prevButton.disabled = true;
  } else if (active === steps.length) {
    nextButton.disabled = true;
  } else {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
};

let nBalnce = 0;

// Function to update the balance label
function updateBalance() {
  // Get the values from the expenditure input fields
  const rent = parseFloat(rentInput.value) || 0;
  const electricity = parseFloat(electricityInput.value) || 0;
  const water = parseFloat(waterInput.value) || 0;
  const tvLicense = parseFloat(tvLicenseInput.value) || 0;
  const buildingInsurance = parseFloat(buildingInsuranceInput.value) || 0;

  // Calculate the total expenditure
  const totalExpenditure = rent + electricity + water + tvLicense + buildingInsurance;

  // Calculate the balance
  const grossIncomeInputValue = parseFloat(grossIncomeInput.value) || 0; // Assuming you have a grossIncomeInput field
  const balance = grossIncomeInputValue - totalExpenditure;

  // Update the balance label
  balanceLabel.textContent = isNaN(balance) ? "NaN" : balance.toFixed(2);
}

// Add event listeners to the expenditure input fields
rentInput.addEventListener("input", updateBalance);
electricityInput.addEventListener("input", updateBalance);
waterInput.addEventListener("input", updateBalance);
tvLicenseInput.addEventListener("input", updateBalance);
buildingInsuranceInput.addEventListener("input", updateBalance);


// file upload js (codingartist)

let fileInput = document.getElementById("file-input");
let fileList = document.getElementById("files-list");
let numOfFiles = document.getElementById("num-of-files");
fileInput.addEventListener("change", () => {
  console.log("Change event triggered"); // Check if the change event is triggered
  console.log("Selected files:", fileInput.files); // Log the selected files array
  for (let i of fileInput.files) {
    let reader = new FileReader();
    let listItem = document.createElement("li");
    let fileName = i.name;
    let fileSize = (i.size / 1024).toFixed(1);
    listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
    if (fileSize >= 1024) {
      fileSize = (fileSize / 1024).toFixed(1);
      listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
    }
    fileList.appendChild(listItem);
  }
  numOfFiles.textContent = `${fileInput.files.length} Files Selected`; // Update the number of files message
});

// FUNCTIONS!!!!!!!!


// Function to validate Full Name
function validateFullName(name) {
  if (name.length < 3 || name.length > 30) {
    return false;
  }
  return /\s/.test(name);
}

// Function to validate Email Address using regex
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate South African ID Number
function validateIDNumber(idNumber) {
  const idRegex = /^[0-9]{13}$/;
  if (!idRegex.test(idNumber)) {
    return false;
  }

  // Extract the first two digits from the ID number
  const firstTwoDigits = parseInt(idNumber.substring(0, 2));

  // Define the threshold for the year to consider someone as 18 or older
  const eighteenOrOlderThreshold = 24; // Assuming anyone born in 1900s until 1924 is 18 or older

  // Check if the person is 18 or older based on the first two digits
  if (firstTwoDigits >= 7 && firstTwoDigits <= eighteenOrOlderThreshold) {
    // Person is under 18
    alert("You need to be 18 or older to apply for a loan.");
    return false;
  }

  // Person is 18 or older
  return true;
}

// Function to validate South African Phone Number
function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^(?:\+27|0)[1-9]\d{8}$/;
  return phoneRegex.test(phoneNumber);
}

// Function to validate Home Address
function validateHomeAddress(address) {
  if (address.trim() === "") {
    return false;
  }
  return /\d/.test(address) && /road|rd|street|st|avenue|ave|suburb|city/i.test(address);
}

// Function to validate bank name (contains only letters)
function validateBankName(bankName) {
  const bankNameRegex = /^[a-zA-Z\s]+$/;
  return bankNameRegex.test(bankName);
}

// Function to validate account number (should be between 7 to 11 digits)
function validateAccountNumber(accountNumber) {
  const accountNumberRegex = /^\d{7,11}$/;
  return accountNumberRegex.test(accountNumber);
}

// Function to validate branch code (should have at least 5 digits)
function validateBranchCode(branchCode) {
  const branchCodeRegex = /^\d{5,}$/;
  return branchCodeRegex.test(branchCode);
}
