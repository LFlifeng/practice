/*响应式布局 start*/
function autosize() {
    var dw=$(document).width();
    if(dw >= 640){ dw= 640};
    fz = (dw / 26.667);
    $('html').css({'font-size':fz + 'px'});
}
autosize();
$(window).resize(function(){
	autosize();
})
/*响应式布局 end*/

