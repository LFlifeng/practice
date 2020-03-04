var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
Array.prototype.shuffle = function () {
    let _this = this;
    for (let i = _this.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = _this[randomIndex];
        _this[randomIndex] = _this[i];
        _this[i] = itemAtIndex;
    }
    return _this;
}
arr.shuffle();
console.log(arr)