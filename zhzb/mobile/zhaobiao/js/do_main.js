require.config({
	baseUrl: "js",
	paths: {
		"jquery": "jquery-2.1.0.min",
		"require": "require",
		"resize": "resize",
		"carousel": "jinDanCarousel",
		"alert": 'alert',
	}
});

requirejs(['jquery', 'require', 'carousel', 'alert'],
	function ($, require, carousel, alert) {
		$(document).ready(function () {
			//加载完成之后关闭loading
			$('.loadingDiv').hide();

			var t = setInterval(function () {
				carousel.carouselAutoPlay()
			}, 5000);

			//点击抽奖
			$('body').on('click', '.list_EggsDiv ul li', function () {
				alert.clickDan();   //砸蛋
			});

			//关闭抽奖结果
			$('body').on('click', '.colseJiangPin', function () {
				$('.bg-mask').remove();
				$('.jiangPinResult').remove();
				$('body').css({ "overflow": "visible" });
				// window.location.href = window.location.href;
				// window.location.reload;

			});
			$('body').on('tap','.jiangPinResult .btn_Get',function(){
				var text = $(".jiangPinResult p").text();
				var text = text.substring(2)
				console.log(text)
				$('.bg-mask').remove();
				$('.jiangPinResult').remove();
				$('body').css({ "overflow": "visible" });
				mui.toast('领取成功');
				// alert.jiangPinResult();
				// window.location.href = window.location.href;
				// window.location.reload;
			})
			//关闭默认的事件动作
			$('body').on('touchmove', '.bg-mask', function (event) { event.preventDefault(); }, false);
			$('body').on('touchmove', '.loadingDiv', function (event) { event.preventDefault(); }, false);
		});
	});

requirejs(['jquery', 'resize'],
	function ($, resize) {
		resize.resizeCarousel();
	});


// requirejs(['jquery','require','carousel'],
// 	function($,require,carousel){
// 		carousel.autoSroll(carousel.carouselSroll(),2000);
// 		carousel.autoSroll(carousel.autoWinsList(),50);
// });
