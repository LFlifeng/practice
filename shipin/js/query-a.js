
function check(data,str) {
    let arrayA = [];
    for(let i = 0;i < data.length;i++){
        let temp = data[i];
        //console.log(temp.c);
        if(temp.c.indexOf(str) != -1){
            arrayA.push(temp);
        }
        if(arrayA.length >= 4){
            break;
        }
    }
    return arrayA;
}


$(function () {
    $(".qltype input").keyup(function () {
        let code = $(".qltype input").val();
        //console.log(code);
        let stock = check(s,code);
        //console.log(stock);
        let obj = $(".fast-change");
        $(".fast-change li:gt(0)").remove();
        for(let i = 0;i < stock.length;i++){
            let j = stock[i].c.indexOf(code);
            let code_len = code.length;
            let str_left = stock[i].c.substring(0,j);
            let str_right = stock[i].c.substring(j+code_len,6);
            let code_str = str_left + code.fontcolor("red") + str_right;
            //console.log(code_str);
            obj.append("<li><span class='code'>"+code_str+"</span><span>"+stock[i].n+"</span></li>");
        }
        obj.slideDown();
        $(".fast-change li").bind('click',function () {
            code = $(this).children(".code").text();
            //console.log(code);
            $(".qltype input").val(code);
            $(".fast-change").slideUp();
        });
    });
    $(".qltype input").blur(function () {
        $(".fast-change").slideUp();
    });
});