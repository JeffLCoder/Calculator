
// capture  input
const displayInput = [];
const keys = document.querySelectorAll('.key')
const display = document.getElementById('display')

for (let key of keys) {
    key.addEventListener('click', (e) => {
        console.log(e.target.innerText);
        if (!'+-*/='.includes(e.target.innerText)) {
            displayInput.push(key.innerText);
            display.value = displayInput.join('');
        }
    }
    )
}
// display.addEventListener('input', e => console.log(e));
// console.log(displayInput.join(''));
