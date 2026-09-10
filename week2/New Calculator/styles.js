function calculate(value)
{

    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let result;

    if(value == "add"){
        result = num1 + num2;
    }else if (value === "subtract"){
        result = num1 - num2;
    }else if (value ==="multiply"){
        result = num1 * num2;
    }else if (value === "divide"){
        result = num1 / num2;
    }

    document.getElementById("result").innerHTML = "Result = " + result;
}
