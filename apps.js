
// capture  input
const inputNums = [];
const inputOperators = [];
let result;
let displayInput = '';
const keys = document.querySelectorAll('.key');
const display = document.getElementById('display');
display.value = '0';
let keySequence;

for (let key of keys) {
    key.addEventListener('click', (e) => {
        const keyPressed = e.target.innerText;
        // keySequence.pop(keyPressed);
        // console.log('keySequence', keySequence);
        if ('+-*/'.includes(keySequence) && '+-*/'.includes(keyPressed)) {
            inputOperators[inputOperators.length - 1] = keyPressed;

            return
        }
        keySequence = keyPressed;
        if (!'+-*/='.includes(keyPressed)) {
            populateNum(key);
        } else if (inputOperators.length >= 1) {
            storeOperator(keyPressed);
            storeNum();
            doMath();
            display.value = result;
            displayInput = '';
            inputNums[0] = result;
        } else {
            storeNum();
            storeOperator(keyPressed);
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

}

// display.addEventListener('input', e => console.log(e));
// console.log(displayInput.join(''));
