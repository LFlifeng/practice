var detectBrowser = function (name) {
    if (navigator.userAgent.toLowerCase().indexOf(name) > -1) {
        return true;
    } else {
        return false;
    }
};
var width = parseInt(window.screen.width);
if (detectBrowser("mz-m2")) width = 360;
var scale = width / 640;
var userScalable = 'no';
if (detectBrowser("qq/")) userScalable = 'no';
$('#viewport').attr('content', 'width=640,user-scalable=' + userScalable + ',initial-scale=' + scale);


function cancel(t) {
    $(t).parent().css("display", "none");
    $('.zhegai').css("display", "none");
}

function scrollTable2() {
    var i = 1;
    var len = $('.sharesList tr').length;
    $('.sharesList').append($('.sharesList tr').clone());
    var _table = $('.sharesList').eq(0);
    setInterval(function () {
        _table.css('marginTop', -94 * i);
        i++;
        if (i == len + 1) {
            setTimeout(function () {
                _table.css('transition', 'none');
                _table.css('marginTop', -6);
                i = 1;
                setTimeout(function () {
                    _table.css('transition', 'gp .7s')
                }, 700);
            }, 1000)
        }
    }, 2500);
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
cNum = GetQueryString("gp") ? GetQueryString("gp") : "";

if (cNum != '') getCodeInfo(cNum);

//获取股票信息
function getCodeInfo(code) {
    $.ajax({
        url: 'https://qd.10jqka.com.cn/quote.php?cate=real&type=stock&return=json&callback=showStockData&code=' + code,
        type: 'get',
        dataType: 'jsonp',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8'
    })
    .done(function (r) {
       // $('gp .gName,.btnBg span,.btnBgb span,.gpName,.tomorrow .red,.dialogBg span,h2 span,.btnBg2 span,.cc').html(r.info[code].name); //名称
        $('.gName').html(r.info[code].name); //股票名称
        $('.gCode').text('( ' + code + ' )'); //代码
        $('.dm').text(code); //代码
        $('.xianjia').text(r.data[code]['10']); //现价
        $('.zhangdie').text(r.data[code]['264648'].slice(0, -1)); //价格变动
        $('.zhangfu').text(r.data[code]['199112'].slice(0, -1) + '%'); //变动百分比
        $('.jinkai').text(r.data[code]['7']); //今开
        $('.zuigao').text(r.data[code]['8']); //最高
        $('.zuidi').text(r.data[code]['9']); //最低
        $('.zuoshou').text(r.data[code]['6']); //昨收
        $('#tgName').val(cNum);
        $('.chengjiaoliang').text((r.data[code]['13'] / 10000).toFixed(2) + '万'); //成交量
        $('.chengjiaoe').text((r.data[code]['19'] / 100000000).toFixed(2) + '亿'); //成交额
        $('.zhenfu').text((r.data[code]['526792'] / 1).toFixed(2) + '%'); //振幅
        $('.huanshou').text((r.data[code]['1968584'] / 1).toFixed(2) + '%'); //换手
        if (r.data[code]['199112'] >= 0) {
            $('.zhangdie,.zhangfu,.xianjia').css('color', '#ee3a23');
            $('.zhishu img').attr('src', '/public/static/index/image/arrow.png')
        } else {
            $('.zhangdie,.zhangfu,.xianjia').css('color', '#03a20c');
            $('.zhishu img').attr('src', '/public/static/index/image/arrowdown.png')
        }
        //停牌
        if (!r.data[code]['10']) {
            $('.xianjia').text('停牌');
            $('.zhangfu').text('');
            $('.zhishu img').css('opacity', 0).css('visibility', 'hidden');
        } else {
            $('.zhishu img').css('opacity', 1).css('visibility', 'visible');
        }
    })
    .fail(function () {
        console.log("error");
    })
}

function replaceX(str) {
    re = /([\s\S]{3})([\s\S]{3})/;
    return str.replace(re, "$1***");
}
function replaceY(str) {
    return str.replace(/.(?=.)/g, '**');
}

function showLocale(objD) {
    var str, colorhead, colorfoot;
    var yy = objD.getYear();
    if (yy < 1900) yy = yy + 1900;
    var MM = objD.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    var dd = objD.getDate();
    if (dd < 10) dd = '0' + dd;
    var hh = objD.getHours();
    if (hh < 10) hh = '0' + hh;
    var mm = objD.getMinutes();
    if (mm < 10) mm = '0' + mm;
    var ss = objD.getSeconds();
    if (ss < 10) ss = '0' + ss;
    var ww = objD.getDay();
    if (ww == 0) colorhead = "<font>";
    if (ww > 0 && ww < 7) colorhead = "<font >";
    str = colorhead + yy + "/" + MM + "/" + dd + " &nbsp&nbsp" + hh + ":" + mm + ":" + ss + " ";
    return (str);
}

function tick() {
    var today;
    today = new Date();
    document.getElementById("new_data").innerHTML = showLocale(today);
    window.setTimeout("tick()", 1000);
}
tick();


function animate() {
    $('.tan_content').show();
    $(".dialog").hide();
    $('html, body').animate({
        scrollTop: 0
    }, 100);
    $(".charts").animate({
        width: "25%"
    }, 500, "", function () {
        $(".discuss").html("正在通过最小二乘法OLS确定必要报 酬率...");
    });
    $(".charts").animate({
        width: "50%"
    }, 600, "", function () {
        $(".discuss").html("正在通过VAR系统确认风险值...");
    });
    $(".charts").animate({
        width: "75%"
    }, 700, "", function () {
        $(".discuss").html("正在通过量价交易模型...");
    });
    $(".charts").animate({
        width: "100%"
    }, 800, "", function () {
        $(".discuss").html("正在通过量价交易模型...");
        $('.charts').css('width', '0');
        $('.tan_content').hide();
        $(".dialog").show();
        $('.phonec').focus();
    });
}

$('.btnBg,.btnBg2').on('click', function () {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    saveMobile();
});
$('.circle').on('click', function () {
    $('.tan_div').hide();

});
$('#sm1').on('click', function () {
    cNum = $.trim($(".gpdm").val());
    var regcn = /^(00|30|60)\d{4}$/;
    if (cNum == ''|| !regcn.test(cNum)) {
        alert("请输入正确的股票号码");
        return false;
    } else {
        getCodeInfo(cNum);

    }
});

$('#sm2').on('click', function () {
    cNum = $.trim($(".gpdm").val());
    if (cNum == '') {
        alert('请输入股票代码！');
        $('html,body').animate({ scrollTop: 0 }, 'slow');
        return false;
    } else {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
        getCodeInfo(cNum);
    }
});

function saveMobile() {
    zpcj = cNum;
    // if (zpcj == '' || !checkData(s, "c", zpcj)) {
    if ( zpcj == ''){
        return false;
    } else {
        $(".discuss").html("正在通过事件驱动策略模型...");
        animate();
        $(".tan_div").height($("body").height());
        $(".tan_div").show();
    }
}

function checkData(data, pro, code) {
    var reg = new RegExp("^\d{6}$");
    var flag = false;
    for (var i = 0; i < data.length; i++) {
        var temp = data[i];
        if (temp[pro] == code) {
            flag = true;
            break;
        }
    }
    return flag;
}


function play()
{
    timer = setInterval(function ()
    {
        messageCar();
    }, 2500);
}
function stop()
{
    clearInterval(timer);
}
play();
$('.tempWrap').on({
    mouseover : function(){
        stop() ;
    } ,
    mouseout : function(){
        play() ;
    }
}) ;

// 信息轮播
var infoNum = 1;
var timer;
function messageCar(){
    if(infoNum == 7){
        infoNum = 1;
        $('.infoList').css('top','0px');
        $('.infoList').animate({top:'-=39px'},500);
        infoNum++;
    }else{
        $('.infoList').animate({top:'-=39px'},500);
        infoNum++;
    }
}