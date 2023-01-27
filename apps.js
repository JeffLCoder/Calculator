
// capture  input
const inputNums = [];
const inputOperators = [];
let result = [];

const keys = document.querySelectorAll('.key');
const display = document.getElementById('display');
display.value = displayInput = '0';

for (let key of keys) {
    key.addEventListener('click', (e) => {
        if (!'+-*/='.includes(e.target.innerText)) {
            populateNum(key);
        } else if (inputOperators.length >= 1) {
            storeOperator(e.target.innerText);
            storeNum();
            doMath();
        } else {
            storeNum();
            storeOperator(e.target.innerText);
            display.value = '';
            displayInput = '';
        }
    }
    )
}
function populateNum(elem) {
    displayInput += elem.innerText;
    display.value = displayInput;
    console.log('displayInput', displayInput)
}
function storeNum() {
    if (!inputNums[0]) {
        inputNums[0] = parseFloat(displayInput);
    } else {
        inputNums[1] = parseFloat(displayInput);
    }
    console.log('storeNum', inputNums)
}
function storeOperator(op) {
    inputOperators.push(op);
    console.log('inputOperators', inputOperators)
}

function doMath() {
    switch (inputOperators[inputOperators.length - 2]) {
        case '/':
            result = !inputNums[1] ? 'ERROR' : inputNums[0] / inputNums[1]
            break;
        case '*':
            result = inputNums[0] * inputNums[1]
            break;
        case '+':
            result = inputNums[0] + inputNums[1]
            break;
        case '-':
            result = inputNums[0] - inputNums[1]
            break;
    }
    display.value = result;
}

// display.addEventListener('input', e => console.log(e));
// console.log(displayInput.join(''));
