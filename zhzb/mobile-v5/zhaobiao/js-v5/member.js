var title = $('.m_member .m_title');
		var member = $('.members .member');
		for (var i = 0; i < title.length; i++) {
			title[i].index = i;
			$(title).on('tap', function () {
				$(this).children('span').addClass('active');
				$(this).siblings().children('span').removeClass('active');
				for (var j = 0; j < title.length; j++) {
					var num = this.index;
					$(member[num]).addClass('active');
					$(member[num]).siblings().removeClass('active');
				}
			})
		}