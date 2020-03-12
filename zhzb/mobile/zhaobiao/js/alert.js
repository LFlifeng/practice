define(function () {
	var clickDan = function () {
		clickJinDanView();
	}
	var jiangchi = [

		{
			jcMoney: "10元优惠券",
			jcImg: './img/10.png'
		},
		{
			jcMoney: "50元优惠券",
			jcImg: './img/50.png'
		},
		{
			jcMoney: "100元优惠券",
			jcImg: './img/100.png'
		},
		{
			jcMoney: "200元优惠券",
			jcImg: './img/200.png'
		},
	];
	function random() {
		return Math.floor(Math.random() *10 % 4);
	}
	
	var jiangPinResult = function () {
		var num = random();
		var str = '';
		str += '<div class="bg-mask"></div>';
		str += '<div class="jiangPinResult">';
		str += '<img class="gongxi" src="./img/gx.png" alt="恭喜你" title="恭喜">';
		str += '<p>获得' + jiangchi[num].jcMoney + '</p>';
		str += '<img class="imgJiangPin" src="' + jiangchi[num].jcImg + '" alt="奖品" title="奖品">';
		str += '<a href="#"><input class="btn_Get" value="领取奖品" type="button"></a>';
		str += '<img class="colseJiangPin" src="img/close.png" alt="关闭" title="关闭">';
		str += '</div>';
		$('body').css({ 'overflow': 'hidden' });
		$('body').prepend(str);
		setTimeout(function () {
			$('.jiangPinResult').addClass('active');
		}, 200);
	}
	var jcMoney = function() {
		$('')
	}
	var clickJinDanView = function () {
		var str = '';
		str += '<div class="bg-mask"></div>';
		str += '<div class="chouJiang">';
		str += '<p class="chouJiangTishi">请稍等...</p>';
		str += '<img class="caiDai" src="img/caidai.png" alt="彩带">';
		str += '<img class="imgDan" src="img/egg.png" alt="砸蛋" title="砸蛋">';
		str += '<img class="imgChuiZi" src="img/chuizi.png" alt="锤子">';
		str += '</div>';

		$('body').css({ 'overflow': 'hidden' });
		$('body').prepend(str);

		setTimeout(function () {
			$('.bg-mask').remove();
			$('.chouJiang').remove();
			jiangPinResult();
		}, 3500);
	}
	return {
		clickDan: clickDan,  //
		jiangPinResult: jiangPinResult, //显示奖品的弹窗
		clickJinDanView: clickJinDanView,    //显示敲击金蛋效果
	}
});