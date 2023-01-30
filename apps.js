
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
        console.log('keyPressed', keyPressed);
        if (!lastKeyPressed && '+-*/='.includes(keyPressed)) return //first key can't be operator. 
        if (keyPressed === 'C') {
            inputNums.splice(0, inputNums.length);
            inputOperators.splice(0, inputOperators.length);
            display.value = '0';
            displayInput = '';
            return
        }
        if (keyPressed === '.' && display.value.includes('.')) return

        if ('+-*/='.includes(lastKeyPressed) && '+-*/='.includes(keyPressed)) {//only last operator is recorded if multiple operators pressed  in a row. Same applies if after pressing =, then press an operator to use the result as operand) 

            inputOperators.pop();
            inputOperators.push(keyPressed);
            lastKeyPressed = keyPressed;
            return
        }
        if (lastKeyPressed === '=' && !'+-*/='.includes(keyPressed)) { //re-initialize the calculator if user input new num after last result (i.e. pressing =)
            inputNums.splice(0, inputNums.length);
            inputOperators.splice(0, inputOperators.length);
        }
        lastKeyPressed = keyPressed;

        if (!'+-*/='.includes(keyPressed)) {
            populateNum(key);
        } else if (inputOperators.length >= 1) {
            storeInput(keyPressed);

            doMath();

        } else {
            storeInput(keyPressed);

        }
    }
    )
}


function populateNum(elem) {
    displayInput += elem.innerText;
    display.value = displayInput;
    console.log('displayInput', displayInput)
}
function storeInput(op) {
    if (parseFloat(displayInput)) { //input num can't be dot only
        if (!inputNums[0]) {
            inputNums[0] = parseFloat(displayInput);
        } else {
            inputNums[1] = parseFloat(displayInput);
        }
        displayInput = '';//clear input queue only after valid num input is captured

        if (op === '=' && inputNums.length <= 1) {
            return
        } else {
            inputOperators.push(op);
            console.log('inputOperators', inputOperators)
        }
    }
    // else {
    //     inputOperators.pop(); //clear last op input if input num is invalid
    // }
    console.log('storedNum', inputNums)
}
// function storeOperator(op) {
//     if (op === '=' && inputNums.length <= 1) {
//         return
//     } else {
//         inputOperators.push(op);
//         console.log('inputOperators', inputOperators)
//     }
// }

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

    inputNums[0] = result;
    inputNums.splice(1, 1);
    console.log('storedNum', inputNums);
    console.log('inputOperators', inputOperators)
}

// display.addEventListener('input', e => console.log(e));
// console.log(displayInput.join(''));
