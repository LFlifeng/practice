var num = 0; //记录查询次数
/**
 * 顺序查找
 * @param {*} arr 
 * @param {*} target 
 */
function inOrderSearch(arr, target) {
    for (var i = 0; i < arr.length; i++) {
        num++;//查询次数
        if (arr[i] === target) {
            return true;
        }
    }
    console.log(num);
    return false;
}
/**
 * 二分法查找
 * @param {*} arr 
 * @param {*} target 
 */
function dichotomySearch(arr, target) {
    if (arr.length === 0) return false;
    //记录最小下标
    var minIndex = 0;
    //记录最大下标
    var maxIndex = arr.length - 1;
    while (minIndex <= maxIndex) {
        num++;//查询次数
        //寻找中间下标位置
        var midIndex = Math.floor((minIndex + maxIndex) / 2);
        if (arr[midIndex] === target) {
            return true;
        } else if (arr[midIndex] > target) {
            maxIndex = midIndex - 1;
        } else {
            minIndex = midIndex + 1;
        }
        console.log(num);
    }
    return false;
}
/**
 * 插值查找
 * @param {*} arr 
 * @param {*} target 
 */
function interpolationSearch(arr,target){
    if (arr.length === 0) return false;
    //记录最小下标
    var minIndex = 0;
    //记录最大下标
    var maxIndex = arr.length - 1;
    while (minIndex <= maxIndex) {
        num++;//查询次数
        //寻找目标下标位置
        //(目标下标-最小下标) / (最大下标 - 最小下标) ≈ (目标值 - 最小值) / (最大值 - 最小值)
        //目标下标 ≈ (目标值 - 最小值) / (最大值 - 最小值) * (最大下标 - 最小下标) + 最小下标
        var midIndex = Math.floor((target - arr[minIndex]) / (arr[maxIndex] - arr[minIndex]) * (maxIndex - minIndex) + minIndex);
        if (arr[midIndex] === target) {
            return true;
        } else if (arr[midIndex] > target) {
            maxIndex = midIndex - 1;
        } else {
            minIndex = midIndex + 1;
        }
        console.log(num);
    }
    return false;
}
var arr = [5, 3, 6, 4, 7, 2];
// console.log(inOrderSearch(arr, 1));
// console.log(dichotomySearch(arr,1));
console.log(interpolationSearch(arr,1));
