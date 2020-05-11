
var isSubmit = false;
var isGpdm = false;

// 当前时间
var myDate = new Date();
myDate.getFullYear(); //获取完整的年份(4位,1970-????)
myDate.getMonth(); //获取当前月份(0-11,0代表1月)
myDate.getDate(); //获取当前日(1-31)
myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
myDate.getTime(); //获取当前时间(从1970.1.1開始的毫秒数)
myDate.getHours(); //获取当前小时数(0-23)
myDate.getMinutes(); //获取当前分钟数(0-59)
myDate.getSeconds(); //获取当前秒数(0-59)
var t = null;
t = setTimeout(time, 1000); //開始运行
function time() {
    clearTimeout(t); //清除定时器
    dt = new Date();
    var yy = dt.getFullYear(); //获取年
    var mm = (dt.getMonth() + 1) > 9 ? dt.getMonth() + 1 : "0" + (dt.getMonth() + 1); //获取月
    var dd = dt.getDate() > 9 ? dt.getDate() : "0" + dt.getDate(); //获取日
    var h = dt.getHours() > 9 ? dt.getHours() : "0" + dt.getHours(); //获取时
    var m = dt.getMinutes() > 9 ? dt.getMinutes() : "0" + dt.getMinutes(); //获取分
    var s = dt.getSeconds() > 9 ? dt.getSeconds() : "0" + dt.getSeconds(); //获取秒
    document.getElementById("new_data").innerHTML = yy + "/" + mm + "/" + dd + "&nbsp;&nbsp;" + h + ":" +
        m + ":" + s;
    t = setTimeout(time, 1000); //设定定时器，循环运行
}

// 查询股票信息
function getCodeInfo(code) {
    $.ajax({
        url: 'https://qd.10jqka.com.cn/quote.php?cate=real&type=stock&return=json&callback=showStockData&code=' + code,
        type: 'get',
        dataType: 'jsonp',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8'
    }).done(function (r) {
        //$('gp .gName,.btnBg span,.btnBgb span,.gpName,.tomorrow .red,.dialogBg span,h2 span,.btnBg2 span,.cc').html(r.info[code].name); //名称
        if(r.info[code].name == ''){
            layer.msg('请输入正确的股票代码');
            $(".gpdm").focus();
        }else {
            isGpdm = true;
            $('.gName,.gpname').html(r.info[code].name); //股票名称
            $('.gCode').text('( ' + code + ' )'); //代码
            $('.dm').text(code); //代码
            $('.zhishu span').text(r.data[code]['10']); //现价
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
                $('.zhishu,.zhangdie,.zhangfu,.xianjia').css('color', '#ee3a23');
                $('.zhishu img').attr('src', '/public/static/index/image/arrow.png')
            } else {
                $('.zhishu,.zhangdie,.zhangfu,.xianjia').css('color', '#03a20c');
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
        }
    }).fail(function () {
        console.log("error");
    })
}

$('#sm1').on('click', function () {
    cNum = $.trim($(".gpdm").val());
    var regcn = /^(00|30|60)\d{4}$/;
    if (cNum == ''|| !regcn.test(cNum)) {
        layer.msg('请输入正确的股票代码');
        return false;
    } else {
        getCodeInfo(cNum);
        $('.gpdm2').val(cNum);
    }
});

// 弹窗动画
function animate() {
    $('.layer-progress').show();
    $('html, body').animate({
        scrollTop: 0
    }, 100);
    $(".progress-bar").animate({
        width: "25%"
    }, 500, "", function () {
        $(".progress-text").html("正在通过最小二乘法OLS确定必要报 酬率...");
    });
    $(".progress-bar").animate({
        width: "50%"
    }, 600, "", function () {
        $(".progress-text").html("正在通过VAR系统确认风险值...");
    });
    $(".progress-bar").animate({
        width: "75%"
    }, 700, "", function () {
        $(".progress-text").html("正在通过量价交易模型...");
    });
    $(".progress-bar").animate({
        width: "100%"
    }, 800, "", function () {
        $(".progress-text").html("正在通过量价交易模型...");
        $('.progress-bar').css('width', '0');
        $('.layer-progress').hide();
        layer.open({
            type: 1,
            shade: false,
            title: false, //不显示标题
            area: '9rem',
            content: $('.layer-share'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        });
        $('.cus-phone').focus();
    });
}

$(".btnBg").click(function () {
    if(isGpdm){
        animate();
    }else {
        layer.msg('请输入正确的股票代码');
        $(".gpdm").focus();
    }
});

// 提交数据
$(".getFree").click(function () {
    if(isSubmit){
        layer.msg("请勿重复提交！");
        return false;
    }
    var tgMobile = $.trim($(".cus-phone").val());
    var stock = $.trim($(".gpdm2").val());
    var care = $.trim($(".care").val());
    var str = location.href;
    var regpn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if(!regpn.test(tgMobile)){
        layer.msg("请输入正确的手机号码！");
    }else {
        $.ajax({
            type:"post",
            url: "/index/index",
            data: {call:tgMobile,stock:stock,url:str,care:care},
            dataType:"html",
            success: function(msg){ //回调函数
                if(msg == 1){
                    layer.msg('提交成功，请静候客服的回电~.~！');
                    gdt('track', 'RESERVATION', {'key1': 'value1', 'key2': 'value2'}); //预约
                }else if(msg == 2){
                    layer.msg('您已经提交过了！');
                }
                isSubmit = true;
            }
        });
    }
});
