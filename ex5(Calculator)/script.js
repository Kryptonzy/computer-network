// Variables to track input
let currentInput = '';  // Current input by the user
let previousInput = ''; // Previous input before an operator
let operator = '';      // Current operator used
let result = null;      // Store the final result

const display = document.getElementById('display');

// Helper function to update display
function updateDisplay(value) {
  display.textContent = value;
}

// Helper function to clear everything
function clearCalculator() {
  currentInput = '';
  previousInput = '';
  operator = '';
  result = null;
  updateDisplay('0');
}

// Handle number inputs
function handleNumber(number) {
  currentInput += number;
  updateDisplay(currentInput);
}

// Handle operator input
function handleOperator(op) {
  if (currentInput === '') return; // Do nothing if no number input yet
  if (operator !== '') {
    result = performCalculation(operator, previousInput, currentInput);
    previousInput = result;
  } else {
    previousInput = currentInput;
  }
  currentInput = '';
  operator = op;
  updateDisplay(operator);
}

// Perform basic and scientific calculations
function performCalculation(op, num1, num2) {
  let a = parseFloat(num1);
  let b = parseFloat(num2);

  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return b !== 0 ? a / b : 'Error'; // Prevent division by zero
    case '%':
      return a % b;
    case 'xʸ': // Power function
      return Math.pow(a, b);
    default:
      return num2;
  }
}

// Handle scientific functions (single number input)
function handleFunction(fn) {
  let num = parseFloat(currentInput);
  switch (fn) {
    case 'sin':
      result = Math.sin(num);
      break;
    case 'cos':
      result = Math.cos(num);
      break;
    case 'tan':
      result = Math.tan(num);
      break;
    case 'log':
      result = Math.log10(num);
      break;
    case 'ln':
      result = Math.log(num);
      break;
    case '√':
      result = Math.sqrt(num);
      break;
    case 'π':
      result = Math.PI;
      break;
    case 'e':
      result = Math.E;
      break;
    case 'x!': // Factorial
      result = factorial(num);
      break;
  }
  currentInput = result.toString();
  updateDisplay(result);
}

// Handle factorial calculation
function factorial(num) {
  if (num === 0 || num === 1) return 1;
  return num * factorial(num - 1);
}

// Handle equal button
function handleEqual() {
  if (currentInput === '' || previousInput === '') return; // Do nothing if no inputs
  result = performCalculation(operator, previousInput, currentInput);
  updateDisplay(result);
  currentInput = result.toString(); // Store result for further calculations
  operator = '';
}

// Handle button clicks
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (event) => {
    const value = event.target.textContent;

    // Handle clear button
    if (value === 'AC') {
      clearCalculator();
      return;
    }

    // Handle equal button
    if (value === '=') {
      handleEqual();
      return;
    }

    // Handle operators
    if (['+', '-', '×', '÷', '%', 'xʸ'].includes(value)) {
      handleOperator(value);
      return;
    }

    // Handle scientific functions
    if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'π', 'e', 'x!'].includes(value)) {
      handleFunction(value);
      return;
    }

    // Handle number or decimal
    if (!isNaN(value) || value === '.') {
      handleNumber(value);
    }
  });
});
