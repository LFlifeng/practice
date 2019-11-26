/**
 * 值交换
 * @param {*} arr 
 * @param {*} d1 
 * @param {*} d2 
 */
function swap(arr, d1, d2) {
    var temp = arr[d1];
    arr[d1] = arr[d2];
    arr[d2] = temp;
}
/**
 * 选择排序
 * @param {*} arr 
 */
function sortSelection(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        //假设第一个值是最小值
        var min = arr[i];
        //记录最小值的位置
        var index = i;
        // console.log(min)
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j];
                //将最小值的位置赋值给index
                index = j;
            }
            //找到最小值，交换第i位和第index位的位置
            swap(arr, i, index);
        }
    }
}
/**
 * 冒泡排序
 * @param {*} arr 
 */
function sortBubble(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}
/**
 * 插入排序
 * @param {*} arr 
 */
function sortInsertion(arr) {
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            //记录第i位的值
            var temp = arr[i];
            //第一部分进行排序
            for (var j = i; j >= 0; j--) {
                if (j > 0 && arr[j - 1] > temp) {
                    arr[j] = arr[j - 1];
                } else {
                    arr[j] = temp;
                    break;
                }
            }
        }
    }
}
/**
 * 快速排序
 * @param {*} arr 
 */
function sortQuick(arr) {
    /**
     * 对数组的某部分进行快速排序
     * @param {*} arr 
     * @param {*} start 区域开始的位置
     * @param {*} end 区域结束的位置
     */
    function _sortQuick(arr, start, end) {
        if (start >= end || start > arr.length - 1) return;
        //将开始位置start设置为低位low，结束的位置end设置为高位high
        var low = start, high = end;
        //设定基准值 key  以区域结束的位置的值为基准值
        var key = arr[end];
        while (low < high) {
            while (low < high && arr[low] <= key) low++;
            arr[high] = arr[low];
            while (low < high && arr[high] >= key) high--;
            arr[low] = arr[high];
        }
        //low === high
        arr[low] = key;
        _sortQuick(arr, start, low - 1);
        _sortQuick(arr, low + 1, end);
    }
    _sortQuick(arr, 0, arr.length - 1);
}
var arr = [5, 3, 6, 4, 7, 2];
// sortSelection(arr);
// sortBubble(arr);
// sortInsertion(arr);
sortQuick(arr);
console.log(arr)