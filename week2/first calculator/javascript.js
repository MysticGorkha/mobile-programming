
function sum() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let sum = num1 + num2;
    document.getElementById("result1").innerHTML = "The sum is: " + sum;
}

function subtract() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let difference = num1 - num2;
    document.getElementById("result2").innerHTML = "The difference is: " + difference;
}

function multiply() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let product = num1 * num2;
    document.getElementById("result3").innerHTML = "The product is: " + product;
}

