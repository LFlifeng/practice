
    // 倒计时
    function getTime(S, E) {
        // 获取开始时间
        var start = S;
        // 获取结束时间
        var end = E;
        // 计算时间差（毫秒差）
        var num = end - start;
        if (num <= 0) {
            return { day:'00', hour: '00', minute: '00', seconds: '00' };
        }
        // 换算时间
        // 天
        var d = parseInt(num / 1000 / 60 / 60 / 24);
        d = d < 10 ? '0' + d : d;
        // 小时
        var h = parseInt(num / 1000 / 60 / 60 ) - d * 24;
        h = h < 10 ? '0' + h : h;
        // 分钟
        var m = parseInt(num / 1000 / 60 % 60);
        m = m < 10 ? '0' + m : m;
        // 秒
        var s = parseInt(num / 1000 % 60);
        s = s < 10 ? '0' + s : s;
        return { day:d, hour: h, minute: m, seconds: s };
    };
    var S = new Date();
    var E = new Date('2019/12/11 18:0:0');
    var o = getTime(S, E);
    // 1.获取一组div元素
    var divs = $('.item_flex .flex i');
    // 2.把计算好的时间差的时分秒分别赋值给每一个div的内容
    divs[0].innerText = o.day;
    divs[1].innerText = o.hour;
    divs[2].innerText = o.minute;
    divs[3].innerText = o.seconds;
    // 3.产生一个定时器
    var tmp = setInterval(function () {
        // 3.1重新计算
        var S = new Date();
        var E = new Date('2019/12/11 18:0:0');
        var o = getTime(S, E);
        // 3.2重新赋值
        divs[0].innerText = o.day;
        divs[1].innerText = o.hour;
        divs[2].innerText = o.minute;
        divs[3].innerText = o.seconds;
        // 3.3到达时间后，停止定时器
        if (o.day == '00'&&o.hour == '00' && o.minute == '00' && o.seconds == '00') {
            clearInterval(tmp);
        }
    }, 1000);