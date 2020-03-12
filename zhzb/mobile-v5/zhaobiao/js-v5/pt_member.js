var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        $('.mask').css({
            'height': h + 'px'
        });
        $('.m_content i').on('click', function () {
            $('.mask').hide();
        })
        $('.kthy').on('click', function () {
            $('.mask').hide();
            mui.toast('提交成功')
        })
        $('#address_b').on('tap', function () {
            var _this = this;
            var picker = new mui.PopPicker({
                layer: 2
            });
            picker.setData(init_city_picker);
            picker.pickers[0].setSelectedIndex(1);
            picker.pickers[1].setSelectedIndex(1);
            //添加所在地区
            picker.show(function (selectItems) {
                $(_this).siblings('#address_n').append(" <span>" + selectItems[0].text + " <i class='mui-icon mui-icon-closeempty'></span>");
                mui.toast('添加成功');
            });
        });
        //点击X删除地区
        $('#address_n>span>i').on('tap', function (e) {
            var _this = this;
            mui.confirm('确认删除吗？', '删除', ['是', '否'], function (e) {
                if (e.index === 0) {
                    $(_this).parent().remove();
                }
            }, 'div');
        });

        var money = $('.member_cl .cl_lb');
        $(money).on('tap', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            var xj = $(this).children().eq(1).children('i').html();
            var yj = $(this).children().eq(2).children('i').html();
            var cj = yj - xj;
            // 已优惠
            $('.zf .hj_yyh i').html(cj + '元<span></span>');
            // 合计
            $('.zf .hj i').html(xj);
        });