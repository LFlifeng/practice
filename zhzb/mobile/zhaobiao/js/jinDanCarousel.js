define(function () {
	var ul_List1 = [];
	var jiangchi = [
		{
			jcMoney: "10元优惠券",
		},
		{
			jcMoney: "50元优惠券",
		},
		{
			jcMoney: "100元优惠券",
		},
		{
			jcMoney: "200元优惠券",
		},
	];
	function random() {
		return Math.floor(Math.random() * 4 + 1);
	}
	while (ul_List1.length < 50) {
		var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170","178", "182","187", "189");
		var i = parseInt(10 * Math.random());
		var prefix = prefixArray[i];
		for (var j = 0; j < 8; j++) {
			prefix = prefix + Math.floor(Math.random() * 10);
		}
		ul_List1.push({ name: prefix, jdjp: jiangchi[random() - 1].jcMoney});
	}
	count = 15;
	ul_List1.forEach(function (e) {
		var tel = e.name;
		tel = "" + tel;
		var ary = tel.split("");
		ary.splice(3, 4, "****");
		var tel1 = ary.join("");
		var oDate = new Date();
		// var oYear = oDate.getFullYear() + "";
		var oMonth = oDate.getMonth() + 1 < 10 ? "0" + (oDate.getMonth() + 1) : (oDate.getMonth() + 1) + "";
		var oDay = oDate.getDate() < 10 ? "0" + oDate.getDate() : oDate.getDate() + "";
		var oTime =oMonth + '-' + oDay;//最后拼接时间
		$('.all_List_Div ul.ul_List1').append(`<li>
		<span class="span_dateTime">`+ oTime + `</span>
		<span class="span_userNme">`+ tel1 + `</span>
		<span class="span_userWingName">`+ e.jdjp + `</span>
		</li>`);
		$('.all_List_Div ul.ul_List2').append(`<li>
		<span class="span_dateTime">`+ oTime + `</span>
		<span class="span_userNme">`+ tel1 + `</span>
		<span class="span_userWingName">`+ e.jdjp + `</span>
		</li>`);
		// if ($('.all_List_Div ul.ul_List1').children("li").length > count) {
		// 	$(".all_List_Div ul.ul_List1").children("li")[0].remove()
		// }
	})

	var dis = 0;
	// 中奖用户名单滚动
	var autoWinsList = function () {
		dis++;
		$('.all_List_Div .ul_List1').scrollTop(dis);
		if ($('.all_List_Div .ul_List1').scrollTop() >= $('.ul_List1 li').height()) {
			dis = 0;
			$('.all_List_Div .ul_List1').scrollTop(dis);
		}
	}
	// 金蛋滚动效果
	var carouselAutoPlay = function () {
		var width = $('.list_EggsDiv').width();
		$(".list_EggsDiv ul").eq(0).animate({ left: '-' + width }, 1200, function () {
			$(this).css({
				left: width,
				zIndex: 0
			}).parent().appendTo($('.list_EggsDiv'));
		}).parent().next().find('ul').animate({ left: 0 }, 1200);
	}
	return {
		autoWinsList: autoWinsList,  //中奖用户名单
		carouselAutoPlay: carouselAutoPlay  //金蛋幻灯片滚动效果
	}
});