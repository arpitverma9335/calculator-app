"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node = /** @class */ (function () {
    function node(Data) {
        this.data = Data;
        this.next = null;
    }
    return node;
}());
var head = null;
function isEmpty() {
    if (head == null) {
        return true;
    }
    return false;
}
function push(data) {
    var new_node = new node(data);
    if (isEmpty()) {
        head = new_node;
        return head;
    }
    new_node.next = head;
    head = new_node;
    return head;
}
function peek() {
    if (isEmpty()) {
        return "\0";
    }
    return head.data;
}
function pop() {
    if (isEmpty()) {
        console.log("Stack Empty");
    }
    else {
        var ptr = head;
        head = head.next;
        ptr = null;
    }
}
function display() {
    if (isEmpty()) {
        console.log("Empty Array");
    }
    else {
        console.log("Output is: ");
        var ptr = head;
        var result = "";
        while (ptr.next != null) {
            result += ptr.data + " ";
            ptr = ptr.next;
        }
        result += ptr.data;
        console.log(result);
    }
}
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
function infixToPostfix(expression) {
    var postfix = [];
    for (var i = 0; i < expression.length; i++) {
        if (expression[i] == "{" || expression[i] == "(") {
            head = push(expression[i]);
        }
        else if (expression[i] == "}" || expression[i] == ")") {
            pop();
        }
    }
    if (isEmpty()) {
        for (var i = 0; i < expression.length; i++) {
            if (Number(expression[i]) || expression[i] === "0") {
                postfix.push(expression[i]);
            }
            else if (expression[i] == "(") {
                head = push(expression[i]);
            }
            else if (expression[i] == ")") {
                while (peek() != "(") {
                    postfix.push(peek());
                    pop();
                }
                pop();
            }
            else {
                if (isEmpty()) {
                    head = push(expression[i]);
                }
                else {
                    while (priority(expression[i]) <= priority(peek())) {
                        if (isEmpty()) {
                            break;
                        }
                        postfix.push(peek());
                        pop();
                    }
                    head = push(expression[i]);
                }
            }
        }
        while (!isEmpty()) {
            postfix.push(peek());
            pop();
        }
        return postfix;
    }
    else {
        throw "Brackets mismatched";
    }
}
function solvingPostfix(postfixExp) {
    console.log("==>exp from request: ", postfixExp);
    var resultant;
    var first_operand, second_operand;
    for (var i = 0; i < postfixExp.length; i++) {
        if (Number(postfixExp[i]) || postfixExp[i] === "0") {
            head = push(postfixExp[i]);
        }
        else {
            first_operand = +peek();
            pop();
            second_operand = +peek();
            pop();
            if (isNaN(first_operand * second_operand)) {
                throw "Invalid string, Kindly check";
            }
            if (postfixExp[i] == "^") {
                resultant = Math.pow(second_operand, first_operand);
                head = push(resultant.toString());
            }
            else if (postfixExp[i] == "/") {
                resultant = second_operand / first_operand;
                head = push(resultant.toString());
            }
            else if (postfixExp[i] == "*") {
                resultant = first_operand * second_operand;
                head = push(resultant.toString());
            }
            else if (postfixExp[i] == "+") {
                resultant = first_operand + second_operand;
                head = push(resultant.toString());
            }
            else if (postfixExp[i] == "-") {
                resultant = second_operand - first_operand;
                head = push(resultant.toString());
            }
            else {
                throw "Invalid operator ( " + postfixExp[i] + " ) deteted!";
            }
        }
    }
    return +peek();
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
        while (!isEmpty()) {
            pop();
        }
        return solution.toString();
    }
    catch (error) {
        while (!isEmpty()) {
            pop();
        }
        return { error: error };
    }
}
exports.calculator = calculator;
//# sourceMappingURL=calculator.js.map