var isGetVCode = false;
var telphone, zpcj, lgs;

$(function () {
  $(".pbut").click(function (e) {
    zpcj = $(".qltype input.click").val();
    telphone = $('.qltype input.phone').val();
    var rec = /^(00|30|60)\d{4}$/;  //正则
    // var regs = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
    if (zpcj == "" || zpcj == null || zpcj == undefined) { // "",null,undefined
      layer.msg('请输入股票代码！');
      return false;
    } else if (!(rec.test(zpcj)) || zpcj == '000000') {
      layer.msg('请输入正确的股票代码！');
      return false;
    } else {
      $(".tt").text(zpcj);
      $('.qltc').fadeIn();
    }
  });
  $('.qltcc .close').click(function () {
    $('.qltc').fadeOut();
  })
});