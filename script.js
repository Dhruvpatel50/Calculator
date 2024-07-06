document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const btnValue = button.textContent;

            switch (btnValue) {
                case 'C':
                    currentInput = '';
                    previousInput = '';
                    operation = null;
                    display.textContent = '0';
                    break;
                case '=':
                    if (operation && previousInput !== '') {
                        currentInput = evaluate(previousInput, currentInput, operation);
                        operation = null;
                        display.textContent = currentInput;
                        previousInput = '';
                    }
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    if (currentInput === '' && previousInput !== '') {
                        operation = btnValue;
                    } else {
                        if (operation !== null) {
                            currentInput = evaluate(previousInput, currentInput, operation);
                        }
                        operation = btnValue;
                        previousInput = currentInput;
                        currentInput = '';
                    }
                    break;
                default:
                    if (currentInput === '' && btnValue === '0') {
                        display.textContent = '0';
                    } else {
                        currentInput += btnValue;
                        display.textContent = currentInput;
                    }
                    break;
            }
        });
    });

    function evaluate(num1, num2, operation) {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        switch (operation) {
            case '+':
                return (n1 + n2).toString();
            case '-':
                return (n1 - n2).toString();
            case '*':
                return (n1 * n2).toString();
            case '/':
                return (n1 / n2).toString();
            default:
                return num2;
        }
    }
});
