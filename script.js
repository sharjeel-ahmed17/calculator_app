document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let operator = null;
    let firstValue = '';
    let secondValue = '';
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                firstValue = '';
                secondValue = '';
                operator = null;
                display.textContent = '0';
            } else if (value === '=') {
                if (operator && firstValue !== '' && secondValue !== '') {
                    const result = calculate(parseFloat(firstValue), parseFloat(secondValue), operator);
                    display.textContent = result;
                    firstValue = result;
                    secondValue = '';
                    operator = null;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (firstValue !== '' && secondValue === '') {
                    operator = value;
                    shouldResetDisplay = true;
                }
            } else {
                if (shouldResetDisplay) {
                    display.textContent = '';
                    shouldResetDisplay = false;
                }
                if (operator) {
                    secondValue += value;
                } else {
                    firstValue += value;
                }
                display.textContent += value;
            }
        });
    });

    function calculate(a, b, operator) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return 0;
        }
    }
});
