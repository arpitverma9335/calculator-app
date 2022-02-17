"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function priority(op) {
    if (op == "^") {
        return 3;
    }
    else if (op == "/" || op == "*") {
        return 2;
    }
    else if (op == "+" || op == "-") {
        return 1;
    }
    else {
        return -1;
    }
}
function peek(arr) {
    var len = arr.length;
    if (len == 0) {
        return "\0";
    }
    return arr[len - 1];
}
function isEmpty(arr) {
    if (arr.length == 0) {
        return true;
    }
    return false;
}
var stack = [];
function infixToPostfix(expression) {
    for (var i = 0; i < expression.length; i++) {
        if (expression[i] == "{" || expression[i] == "(") {
            stack.push(expression[i]);
        }
        else if (expression[i] == "}" || expression[i] == ")") {
            stack.pop();
        }
    }
    if (isEmpty(stack)) {
        var postfix = [];
        for (var i = 0; i < expression.length; i++) {
            if (Number(expression[i]) || expression[i] === "0") {
                postfix.push(expression[i]);
            }
            else if (expression[i] == "(") {
                stack.push(expression[i]);
            }
            else if (expression[i] == ")") {
                while (peek(stack) != "(") {
                    postfix.push(peek(stack));
                    stack.pop();
                }
                stack.pop();
            }
            else {
                if (isEmpty(stack)) {
                    stack.push(expression[i]);
                }
                else {
                    while (priority(expression[i]) <= priority(peek(stack))) {
                        if (isEmpty(stack)) {
                            break;
                        }
                        postfix.push(peek(stack));
                        stack.pop();
                    }
                    stack.push(expression[i]);
                }
            }
        }
        while (!isEmpty(stack)) {
            postfix.push(peek(stack));
            stack.pop();
        }
        return postfix;
    }
    else {
        throw "Brackets mismatched";
    }
}
function solvingPostfix(postfixExp) {
    var resultant;
    var first_operand, second_operand;
    for (var i = 0; i < postfixExp.length; i++) {
        if (Number(postfixExp[i]) || postfixExp[i] === "0") {
            stack.push(postfixExp[i]);
        }
        else {
            first_operand = +peek(stack);
            stack.pop();
            second_operand = +peek(stack);
            stack.pop();
            if (isNaN(first_operand * second_operand)) {
                throw "Invalid string, Kindly check";
            }
            if (postfixExp[i] == "^") {
                resultant = Math.pow(second_operand, first_operand);
                stack.push(resultant.toString());
            }
            else if (postfixExp[i] == "/") {
                resultant = second_operand / first_operand;
                stack.push(resultant.toString());
            }
            else if (postfixExp[i] == "*") {
                resultant = first_operand * second_operand;
                stack.push(resultant.toString());
            }
            else if (postfixExp[i] == "+") {
                resultant = first_operand + second_operand;
                stack.push(resultant.toString());
            }
            else if (postfixExp[i] == "-") {
                resultant = second_operand - first_operand;
                stack.push(resultant.toString());
            }
            else {
                throw "Invalid operator ( " + postfixExp[i] + " ) deteted!";
            }
        }
    }
    return +peek(stack);
}
function calculator(expression) {
    try {
        var trimmed_expression = expression.replace(/\s+/g, "");
        var validatio_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "^", "(", ")"];
        for (var _i = 0, trimmed_expression_1 = trimmed_expression; _i < trimmed_expression_1.length; _i++) {
            var char = trimmed_expression_1[_i];
            if (!validatio_array.includes(char)) {
                throw "invalid character ( " + char + " ) found";
            }
        }
        var expression_arr = trimmed_expression.match(/([0-9]+|\W)/g);
        for (var i = 0; i < expression_arr.length; i++) {
            if (expression_arr[i] == "(") {
                if (Number(expression_arr[i - 1])) {
                    throw "error at index " + i + ", operator missing, kindly check";
                }
            }
            if (expression_arr[i] == ")") {
                if (Number(expression_arr[i + 1])) {
                    throw "error at index " + i + ", operator missing, kindly check";
                }
            }
        }
        var result = infixToPostfix(expression_arr);
        var solution = solvingPostfix(result);
        while (!isEmpty(stack)) {
            stack.pop();
        }
        return solution.toString();
    }
    catch (error) {
        while (!isEmpty(stack)) {
            stack.pop();
        }
        return { error: error };
    }
}
exports.calculator = calculator;
//# sourceMappingURL=calculation.js.map