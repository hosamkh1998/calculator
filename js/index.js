function onInit() {
  console.log("ready");
}

var strHtml = "0";

document.addEventListener("keydown", function (event) {
  if (event.key == "Backspace") {
    onNumberClick("delEnd");
  } else if (event.key == "Delete") {
    onNumberClick("delAll");
  } else if (event.key == "Enter") {
    onEqualClick();
  } else if (event.key == "Escape") {
    onNumberClick("delStart");
  } else if (event.key == ".") {
    onNumberClick(".");
  } else if (event.key == "0") {
    onNumberClick("0");
  } else if (event.key == "1") {
    onNumberClick("1");
  } else if (event.key == "2") {
    onNumberClick("2");
  } else if (event.key == "3") {
    onNumberClick("3");
  } else if (event.key == "4") {
    onNumberClick("4");
  } else if (event.key == "5") {
    onNumberClick("5");
  } else if (event.key == "6") {
    onNumberClick("6");
  } else if (event.key == "7") {
    onNumberClick("7");
  } else if (event.key == "8") {
    onNumberClick("8");
  } else if (event.key == "9") {
    onNumberClick("9");
  } else if (event.key == "+") {
    onNumberClick("+");
  } else if (event.key == "-") {
    onNumberClick("-");
  } else if (event.key == "*") {
    onNumberClick("*");
  } else if (event.key == "/") {
    onNumberClick("/");
  }
});

function onNumberClick(number) {
  if (number === "input") {
    strHtml = document.querySelector(".calcRes").value;
  } else {
    switch (number) {
      case "delAll":
        strHtml = "";
        number = "0";
        break;
      case "delStart":
        strHtml = deleteFirstChar(strHtml);
        number = "";
        break;
      case "delEnd":
        strHtml = deleteLastChar(strHtml);
        number = "";
        break;
      case ".":
        if (strHtml.includes(".")) number = "";
        break;
    }

    if ((strHtml == 0 && number === ".") || strHtml === "0.") strHtml += number;
    else if (strHtml == 0 && number !== ".") strHtml = number;
    else strHtml += number;
    document.querySelector(".result").innerHTML = strHtml;
    document.querySelector(".calcRes").value = strHtml;
  }
}

function deleteFirstChar(str) {
  return str.substr(1);
}

function deleteLastChar(str) {
  return str.slice(0, -1);
}

function onEqualClick() {
  var numArr = [];
  var tempNum = "";
  for (var i = 0; i < strHtml.length; i++) {
    if (
      strHtml[i] == "+" ||
      strHtml[i] == "-" ||
      strHtml[i] == "*" ||
      strHtml[i] == "/"
    ) {
      numArr.push(strHtml[i]);
    } else {
      tempNum += strHtml[i];
      if (
        strHtml[i + 1] == "+" ||
        strHtml[i + 1] == "-" ||
        strHtml[i + 1] == "*" ||
        strHtml[i + 1] == "/"
      ) {
        numArr.push(tempNum);
        tempNum = "";
      }
    }
  }

  numArr.push(tempNum);

  var result = 1;
  var flag = 0;
  for (let j = 0; j < numArr.length; j++) {
    if (numArr[j] == "*" || numArr[j] == "/") {
      if (numArr[j] == "*") {
        numArr[j - 1] = numArr[j - 1] * numArr[j + 1];
        numArr.splice(j, 2);
        j--;
      } else if (numArr[j] == "/") {
        numArr[j - 1] = numArr[j - 1] / numArr[j + 1];
        numArr.splice(j, 2);
        j--;
      }
    } else if (flag == 1) {
      if (numArr[j] == "+") {
        numArr[j - 1] = +numArr[j - 1] + +numArr[j + 1];
        numArr.splice(j, 2);
        j--;
      } else if (numArr[j] == "-") {
        numArr[j - 1] = numArr[j - 1] - numArr[j + 1];
        numArr.splice(j, 2);
        j--;
      }
    }
    if (j == numArr.length - 1 && flag == 0) {
      flag = 1;
      j = 0;
    } else if (j == numArr.length - 1 && flag == 1) {
      break;
    }
  }
  console.log(numArr);
  console.log(result);
  console.log(strHtml);
  document.querySelector(".result").innerHTML = strHtml + "=" + numArr[0];

  String(numArr[0]).includes(".")
    ? (document.querySelector(".calcRes").value = numArr[0]
        .toFixed(5)
        .toLocaleString())
    : (document.querySelector(".calcRes").value = numArr[0].toLocaleString());
  strHtml = String(numArr[0]);
}
