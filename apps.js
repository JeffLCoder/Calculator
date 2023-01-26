
// capture  input
let displayInput = '';
const inputNum = [];
const keys = document.querySelectorAll('.key')
const display = document.getElementById('display')

for (let key of keys) {
    key.addEventListener('click', (e) => {
        if (!'+-*/='.includes(e.target.innerText)) {
            populateNum(key);
        } else {
            storeNum();
            display.value = '';
            displayInput = '';
        }

    }
    )
}
function populateNum(elem) {
    displayInput += elem.innerText;
    display.value = displayInput;
}
function storeNum() {
    if (!inputNum[0]) {
        inputNum[0] = parseFloat(displayInput);
    } else {
        inputNum[1] = parseFloat(displayInput);
    }
}


// display.addEventListener('input', e => console.log(e));
// console.log(displayInput.join(''));
