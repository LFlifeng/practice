new Vue({
    el: "#address",
    data() {
        return {
            address: [],
        }
    },
    created() {
        this.showAddress()
    },
    methods: {
        showAddress() {
            this.address = init_city_picker;
        }
    }
});
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//tab栏切换
var tabs = $('.tabs>ul li.tab');
var keys = $('.ul .li');
for (var i = 0; i < tabs.length; i++) {
    tabs[i].index = i;
    $(tabs[i]).toggle(function () {
        $('.ul').css({
            'z-index': '100000',
            'background': 'rgba(0, 0, 0, 0.3)'
        })
        $(this).children('i:nth-child(3)').css({
            'display': 'inline'
        });
        $(this).children('i:nth-child(2)').css({
            'display': 'none'
        });
        $(this).children('span,i:nth-child(3)').addClass('active');
        for (var j = 0; j < tabs.length; j++) {
            var num = this.index;
            $(keys[num]).addClass('active');
            $(keys[num]).siblings().removeClass('active');
            // //点击确定按钮关闭弹出层
            $('.queding').on('tap', function () {
                $(keys[num]).removeClass('active');
            });
        }
        $(this).siblings().children('i:nth-child(2)').css({
            'display': 'inline'
        });
        $(this).siblings().children(' i:nth-child(3)').css({
            'display': 'none'
        });
        $(this).siblings().children('span,i:nth-child(3)').removeClass('active');
    }, function () {
        $('.ul').css({
            'z-index': '0 !important',
            'background': 'rgba(0, 0, 0, 0)'
        });
        for (var j = 0; j < tabs.length; j++) {
            var num = this.index;
            $(keys[num]).addClass('active');
            $(keys[num]).siblings().removeClass('active');
            $(keys[num]).removeClass('active');
            // //点击确定按钮关闭弹出层
            $('.queding').on('tap', function () {
                $(keys[num]).removeClass('active');
            });
        }
        $('.tabs>ul li').children('i:nth-child(2)').css({
            'display': 'inline'
        });
        $('.tabs>ul li').children(' i:nth-child(3)').css({
            'display': 'none'
        });
        $('.tabs>ul li').children('span,i:nth-child(3)').removeClass('active');
    });
}

//省市区
var province = $('.address .province .pro_name li');
var city = $('.address .province .city_name');
for (var i = 0; i < province.length; i++) {
    province[i].index = i;
    $(province).on('tap', function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        for (var j = 0; j < province.length; j++) {
            var num = this.index;
            $(city[num]).addClass('active');
            $(city[num]).siblings().removeClass('active');
        }
    })
}
//点击确定按钮关闭弹出层
$('.queding').on('tap', function () {
    $('.ul').css({
        'z-index': '0 !important',
        'background': 'rgba(0, 0, 0, 0)'
    });
    $('.tabs>ul li').children('i:nth-child(2)').css({
        'display': 'inline'
    });
    $('.tabs>ul li').children(' i:nth-child(3)').css({
        'display': 'none'
    });
    $('.tabs>ul li').children('span,i:nth-child(3)').removeClass('active');
});