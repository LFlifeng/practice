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
        $(_this).siblings('#address_n').append(" <span>" + selectItems[0].text + " <img src='./img/close.png'></span>");
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

$('#info_b').on('tap', function () {
    var _this = this;
    var picker = new mui.PopPicker();
    picker.setData([
        { value: 'cgxx', text: '采购信息' },
        { value: 'fbxx', text: '废标信息' },
    ]);
    //添加信息类型
    picker.show(function (selectItems) {
        $(_this).siblings('#info').append(" <span>" + selectItems[0].text + " <img src='./img/close.png'></span>");
        mui.toast('添加成功');
    });
});
//点击X删除信息类型
$('#info>span>img').on('tap', function (e) {
    var _this = this;
    mui.confirm('确认删除吗？', '删除', ['是', '否'], function (e) {
        if (e.index === 0) {
            $(_this).parent().remove();
        }
    }, 'div');
});

//点击按钮添加关键词
$('.hy_word .btn').on('tap', function () {
    var value = $(this).siblings('input').val();
    if (value === '') {
        mui.toast('关键词不能为空');
    } else {
        $('.hy_word').siblings('.address_m').children('.address_n').append(" <span>" + value + " <img src='./img/close.png'></span>");
        $(this).siblings('input').val('');
    }
});