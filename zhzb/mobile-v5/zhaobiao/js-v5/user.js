var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		$('.mask').css({
			'height': h + 'px'
		});
		$('#erweima').on('click', function () {
			$('.mask').show();
		});
		$('.mask .m_content>i').on('click', function () {
			$('.mask').hide();
		})