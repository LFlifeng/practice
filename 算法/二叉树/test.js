/**
 * 生成树
 * @param {*} value 
 */
function node(value) {
    this.value = value;
    this.children = [];
}
/**
 * 生成二叉树
 * @param {*} value 
 */
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}
/**
 * 前序遍历
 * @param {*} root 
 */
function DLR(root) {
    if (!root) return;// 没有节点
    console.log(root.value);
    DLR(root.left);
    DLR(root.right);
}
/**
 * 中序遍历
 * @param {*} root 
 */
function LDR(root) {
    if (!root) return;//没有节点的情况
    LDR(root.left);
    console.log(root.value);
    LDR(root.right);
}
/**
 * 后序遍历
 * @param {*} root 
 */
function LRD(root) {
    if (!root) return;//没有节点的情况
    LRD(root.left);
    LRD(root.right);
    console.log(root.value);
}
/**
 * 根据前序遍历和中序遍历得到一个一棵二叉树
 * @param {*} dlr 前序遍历序列
 * @param {*} ldr 中序遍历序列
 */
function getTree(dlr, ldr) {
    //将传入的前序遍历序列和中序遍历序列字符串分割成数组
    dlr = dlr.split('');
    ldr = ldr.split('');
    //判断不成立的情况
    if (dlr.length === 0 || ldr.length === 0) return null;
    if (dlr.length !== ldr.length) throw new Error('无效的遍历值');
    //在前序遍历中取出根节点的值
    var rootValue = dlr[0];
    //生成根节点
    var root = new Node(rootValue);
    //在中序遍历中找到根节点的位置
    var index = ldr.indexOf(rootValue);
    //左边的中序遍历结果
    var leftLDR = ldr.slice(0, index).join('');
    //左边的前序遍历结果
    var leftDLR = dlr.slice(1, leftLDR.length + 1).join('');
    //左支
    root.left = getTree(leftDLR, leftLDR);
    // 右边的中序遍历结果
    var rightLDR = ldr.slice(index + 1).join('');
    // 右边的前序遍历结果
    var rightDLR = dlr.slice(leftLDR.length + 1).join('');
    //右支
    root.right = getTree(rightDLR, rightLDR);

    return root;
}
/**
 * 获取一棵树的深度
 * @param {*} root 
 */
function getDeep(root) {
    if (!root) return 0;
    var left = getDeep(root.left);
    var right = getDeep(root.right);
    return Math.max(left, right) + 1;//最后加一个根节点
}
/**
 * 查询二叉树--------深度优先
 * @param {*} root 
 * @param {*} targetValue 
 */
function deepFirstSearch(root, targetValue) {
    if (!root) return false;
    if (root.value === targetValue) return true;
    var leftResult = deepFirstSearch(root.left, targetValue);
    var rightResult = deepFirstSearch(root.right, targetValue);
    return leftResult || rightResult;
}
/**
 * 查询二叉树--------广度优先
 * @param {*} nodes 一个数组，某一层的所有节点
 * @param {*} targetValue 
 */
function breadthFirstSearch(nodes, targetValue) {
    if (nodes.length === 0) return false;
    var nextArr = []; //下一层中的节点
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].value === targetValue) {
            return true;
        } else {
            // nodes[i].value !== targetValue 的情况
            // nodes[i].left是否存在，若存在就将左节点存到nextArr数组中
            if (nodes[i].left) {
                nextArr.push(nodes[i].left);
            }
            // nodes[i].right是否存在，若存在就将右节点存到nextArr数组中
            if (nodes[i].right) {
                nextArr.push(nodes[i].right);
            }
        }
    }
    return breadthFirstSearch(nextArr, targetValue);
}
// var a = new Node('a');
// var b = new Node('b');
// var c = new Node('c');
// var d = new Node('d');
// var e = new Node('e');
// var f = new Node('f');
// var g = new Node('g');

// a.left = b;
// a.right = c;
// b.left = d;
// b.right = e;
// e.left = g;
// c.left = f;
// console.log(a);
// DLR(a);
// LDR(a);
// LRD(a);
var root = getTree('abdegcf', 'dbgeafc');
console.log(root);
// console.log(getDeep(root))