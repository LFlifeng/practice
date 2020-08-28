"use strict";

var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

Array.prototype.shuffle = function () {
  var _this = this;
  // 倒序
  for (var i = _this.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = _this[randomIndex];
    _this[randomIndex] = _this[i];
    _this[i] = itemAtIndex;
  }

  return _this;
};

arr.shuffle();
console.log(arr);