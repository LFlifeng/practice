mui(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: true, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 40, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: false//是否启用回弹
    })
});
mui.init({
    // pullRefresh: {
    //     container: ".mui-scroll-wrapper",//下拉刷新、上拉加载容器标识
    //     // 下拉刷新
    //     down: {
    //         style: 'circle',
    //         color: '#2bd009',
    //         contentover: '释放立即刷新',
    //         contentrefresh: '正在刷新...',
    //         callback: function () {
    //             setTimeout(function () {
    //                 mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
    //             }, 1000);
    //             console.log('下拉了')
    //         }
    //     },
    //     // 上拉加载
    //     up: {
    //         contentrefresh: '正在加载...',
    //         callback: function () {
    //             setTimeout(function () {
    //                 mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
    //             }, 1000);
    //             console.log('到底了~~~')
    //         }
    //     }
    // }
});
mui('body').on('tap','a',function(){
    window.top.location.href=this.href;
});
(function(){
    var html = document.documentElement;
    var width = html.getBoundingClientRect().width;
    html.style.fontSize = width/375*10 + 'px';
    // console.log(html.style.fontSize)
})()
