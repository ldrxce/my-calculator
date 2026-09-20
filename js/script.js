var display = document.getElementById('display');
var buttons = document.getElementsByClassName('button');
var expression = '';

function updateDisplay(value) {
    display.textContent = value;
}

function parseTokens(expr) {
    var tokens = [];
    var number = '';
    var i = 0;

    while (i < expr.length) {
        var ch = expr.charAt(i);
        if (ch === ' ') {
            i = i + 1;
            continue;
        }

        if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
            if (number !== '') {
                tokens.push(number);
                number = '';
            }
            tokens.push(ch);
        } else {
            number = number + ch;
        }

        i = i + 1;
    }

    if (number !== '') {
        tokens.push(number);
    }

    return tokens;
}

function calculate(tokens) {
    var result = 0;
    var op = '';

    for (var i = 0; i < tokens.length; i = i + 1) {
        var token = tokens[i];

        if (token === '+' || token === '-' || token === '*' || token === '/') {
            op = token;
        } else {
            var value = Number(token);
            if (i === 0) {
                result = value;
            } else {
                switch (op) {
                    case '+':
                        result = result + value;
                        break;
                    case '-':
                        result = result - value;
                        break;
                    case '*':
                        result = result * value;
                        break;
                    case '/':
                        if (value === 0) {
                            return 'Error';
                        }
                        result = result / value;
                        break;
                }
            }
        }
    }

    return result;
}

function cleanExpression(expr) {
    var text = '';
    for (var i = 0; i < expr.length; i = i + 1) {
        var ch = expr.charAt(i);
        if (ch === ' ') {
            continue;
        }
        text = text + ch;
    }
    return text;
}

for (var i = 0; i < buttons.length; i = i + 1) {
    buttons[i].addEventListener('click', function () {
        var value = this.getAttribute('data-value');

        if (value === 'C') {
            expression = '';
            updateDisplay('0');
        } else if (value === '=') {
            if (expression === '') {
                updateDisplay('0');
                return;
            }
            var cleaned = cleanExpression(expression);
            var tokens = parseTokens(cleaned);
            var result = calculate(tokens);
            expression = String(result);
            updateDisplay(expression);
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (expression === '' || expression.charAt(expression.length - 1) === '+' || expression.charAt(expression.length - 1) === '-' || expression.charAt(expression.length - 1) === '*' || expression.charAt(expression.length - 1) === '/') {
                return;
            }
            expression = expression + ' ' + value + ' ';
            updateDisplay(expression);
        } else {
            if (expression === '0') {
                expression = value;
            } else {
                expression = expression + value;
            }
            updateDisplay(expression);
        }
    });
}
