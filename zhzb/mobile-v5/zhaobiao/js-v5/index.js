// 数字增长
function Num_countUp(id) {
    var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
    };
    var numB = document.getElementById(id);
    var demo = new CountUp(id, 0, numB.innerText, 0, 2.5, options);
    if (!demo.error) {
        demo.start();
    } else {
        console.error(demo.error);
    }
}
Num_countUp('number'); Num_countUp('number1'); Num_countUp('number2'); Num_countUp('number3'); Num_countUp('number4')
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
$('.mask').css({
    'height': h + 'px'
});
$('.mask>div>i').on('tap', function () {
    $('.mask').css({
        'display': 'none'
    });
});
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
});