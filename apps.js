
// capture  input
const inputNums = [];
const inputOperators = [];
let result;
let displayInput = '';
const keys = document.querySelectorAll('.key');
const display = document.getElementById('display');
display.value = '0';
let lastKeyPressed;

for (let key of keys) {
    key.addEventListener('click', (e) => {
        const keyPressed = e.target.innerText;

        if (!lastKeyPressed && '+-*/='.includes(keyPressed)) return //first key can't be operator.

        if ('+-*/='.includes(lastKeyPressed) && '+-*/='.includes(keyPressed)) {//only last operator is recorded if multiple operators pressed  in a row. Same applies if after pressing =, then press an operator to use the result as operand) 

            inputOperators[inputOperators.length - 1] = keyPressed;
            return
        }
        if (lastKeyPressed === '=' && !'+-*/='.includes(keyPressed)) { //re-initialize the calculator if user input new num after last result
            inputNums.splice(0, inputNums.length);
            inputOperators.splice(0, inputOperators.length);
        }
        lastKeyPressed = keyPressed;

        if (!'+-*/='.includes(keyPressed)) {
            populateNum(key);
        } else if (inputOperators.length >= 1) {
            storeOperator(keyPressed);
            storeNum();
            doMath();

        } else {
            storeNum();
            storeOperator(keyPressed);
            // display.value = '';
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
    console.log('storedNum', inputNums)
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
    displayInput = ''; //clear captured input queue 
    inputNums[0] = result;
    inputNums.splice(1, 1);
}

// display.addEventListener('input', e => console.log(e));
// console.log(displayInput.join(''));
