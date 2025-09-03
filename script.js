let currentInput = "";
let historyList = [];

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === "" && operator !== '-') return;
  if (/[+\-*/%]$/.test(currentInput)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay();
}

function appendDot() {
  const parts = currentInput.split(/[\+\-\*\/%]/);
  const lastPart = parts[parts.length - 1];
  if (!lastPart.includes(".")) {
    currentInput += ".";
    updateDisplay();
  }
}

function toggleSign() {
  if (currentInput) {
    currentInput = currentInput.startsWith("-") ? currentInput.slice(1) : "-" + currentInput;
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function calculate() {
  try {
    if (currentInput.includes("/0")) {
      document.getElementById("result").innerText = "Error: ÷0";
      return;
    }
    let result = eval(currentInput);
    if (!isFinite(result)) {
      document.getElementById("result").innerText = "Error";
      return;
    }
    historyList.push(currentInput + " = " + result);
    currentInput = result.toString();
    updateDisplay();
  } catch {
    document.getElementById("result").innerText = "Error";
  }
}

function updateDisplay() {
  document.getElementById("history").innerText = currentInput;
  document.getElementById("result").innerText = currentInput || "0";
}

function showHistory() {
  let historyBox = document.getElementById("history-box");
  let list = document.getElementById("history-list");
  list.innerHTML = "";
  historyList.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  historyBox.style.display = historyBox.style.display === "block" ? "none" : "block";
}
