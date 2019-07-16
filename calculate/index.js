// // console.log($('.numb input').val())
// var Vinput = $('.numb input');
// // console.log(Vinput[0].value)
// for(var i=0;i<Vinput.length;i++){
//     Vinput[i].index = i;
//     var num = this.index;
//     Vinput[i].onclick = function(e){
//        for(var j=0;j<Vinput.length;j++){
//             // console.log(Vinput[j].value)
//             // console.log(e)
//             if(e.target.value = j) {
//                 $('#box').value = this.value;
//             }
//        }
//     }
// }
// 数据容器
var left = 0;   //被除数
var right = 0;  //除数
var sum = 0;    //和  

var numb = 0;   //此变量用来限制点的输入     
// 获取id并返回
function $(id) {
    return document.getElementById(id);
}
// 运算函数
function operation(id) {
    if ($("box").value != "0") {
        if (left == 0) {
            $("box").value = $("box").value + $(id).value;
            left = parseFloat($("box").value);
        }
    }
    //numb 转为number类型 让点可以再输入一次
    numb = 0;
}

// 数字盘函数
function figure(id) {

    // 判断被除数是否有值
    if (left == 0) {
        // 改变value默认值
        if ($("box").value === "0") {
            $("box").value = $(id).value;
        } else {
            $("box").value = $("box").value + $(id).value;
        }
    } else {
        $("box").value = $("box").value + $(id).value;
        var str = $("box").value;
        var num = "";
        // 获取第二次输入的数字
        for (var i = 0; i < str.length; i++) {
            // 判断加减乘除
            if (str[i] == "+") {
                for (var j = i + 1; j < str.length; j++) {
                    num += str[j];

                };
                right = parseFloat(num);
            } else if (str[i] == "-") {
                for (var j = i + 1; j < str.length; j++) {
                    num += str[j];

                };
                right = parseFloat(num);
            }
            else if (str[i] == "*") {
                for (var j = i + 1; j < str.length; j++) {
                    num += str[j];

                };
                right = parseFloat(num);
            }
            else if (str[i] == "/") {
                for (var j = i + 1; j < str.length; j++) {
                    num += str[j];

                };
                right = parseFloat(num);
            }
        };
    }

    // 清空所有数据  
    if (sum != 0) {
        left = 0;
        right = 0;
        sum = 0;
        numb = 0;
        $("box").value = $(id).value;
    }

}


// 数字键盘区----------------------------------------------------------开始
$("one").onclick = function () {
    figure("one");
}
$("two").onclick = function () {
    figure("two");
}
$("three").onclick = function () {
    figure("three");
}
$("four").onclick = function () {
    figure("four");
}
$("five").onclick = function () {
    figure("five");
}
$("six").onclick = function () {
    figure("six");
}
$("seven").onclick = function () {
    figure("seven");
}
$("eight").onclick = function () {
    figure("eight");
}
$("nine").onclick = function () {
    figure("nine");
}
$("zero").onclick = function () {
    figure("zero");
}

// 数字键盘区----------------------------------------------------------结束




//功能区-----------------------------------------------------------开始

// 加
$("add").onclick = function () {
    operation("add");
}


//减
$("reduce").onclick = function () {
    operation("reduce");
}

// 乘
$("ride").onclick = function () {
    operation("ride");
}

// 除
$("division").onclick = function () {
    operation("division");
}

// 点
$("round").onclick = function () {
    // 限制点的输入
    if (numb === 0 && sum == 0) { //numb值等于0 类型等于number                        
        $("box").value = $("box").value + $("round").value;
        numb = ($("box").value); //numb赋值为字符串
    }

}

// 清除
$("res").onclick = function () {
    if ($("box").value != "0") {
        left = 0;
        right = 0;
        sum = 0;
        numb = 0;
        $("box").value = "0";
    }
}

// 求和
$("sum").onclick = function () {
    var symbol = "";
    if (left != 0 && right != 0) {
        for (var i = 0; i < $("box").value.length; i++) {
            symbol = $("box").value[i];
            if (symbol == "+") {
                sum = left + right;
                $("box").value = sum;
            } else if (symbol == "-") {
                sum = left - right;
                $("box").value = sum;
            }
            else if (symbol == "*") {
                sum = left * right;
                $("box").value = sum;

            }
            else if (symbol == "/") {
                sum = left / right;
                $("box").value = sum;
            }
        };
    }
}
