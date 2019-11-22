//新建一个链表
function Node(value) {
    this.value = value;
    this.next = null;
}
//遍历打印链表的节点
function print(root) {
    // while(root) {
    //     console.log(root.value);
    //     root = root.next;
    // }
    if (root) {
        console.log(root.value);//打印本身的数据
        print(root.next);
    }
}
//获取链表的长度
function count(root) {
    if (!root) return 0;
    // if(root.next === null) return 1;
    // if(root) return 1 + count(root.next);
    return 1 + count(root.next);
}
//通过下标获取链表中的某个数据
function getValue(root, index) {
    /**
    * 判断某个节点是否是我要查找的节点
    * @param {*} node 表示某个节点
    * @param {*} i 该节点是第几个节点
    */
    function _getValue(node, i) {
        if (!root) return null;
        if (i === index) return node.value;
        return _getValue(node.next, ++i);
    }
    return _getValue(root, 0);
}
// 通过下标设置链表中的某个数据
function setValue(root, index, value) {
    function _setValue(node, i) {
        if (!node) return;
        if (i === index) {
            node.value = value;
        } else {
            _setValue(node.next, ++i);
        }
    }
    _setValue(root, 0);
}
//在链表某一个节点之后加入一个新节点
function insertAfter(root, newRoot) {
    if (!root) return;
    var newRoot = new Node(newRoot);
    newRoot.next = root.next;
    root.next = newRoot;
}
//在链表末尾加入一个新节点
function insertLast(root, newRoot) {
    if (!root.next) {
        var newRoot = new Node(newRoot);
        root.next = newRoot;
    } else {
        insertLast(root.next, newRoot)
    }
    // if (root.next === null) {
    //     var newRoot = new Node(newRoot);
    //     newRoot.next = root.next;
    //     root.next = newRoot;
    // }
}
//删除一个链表节点(根据给定的数据来删除某个节点)
function remove(root, value) {
    if (!root || !root.next) return;
    if (root.next.value === value) {//通过要删除节点的前一个节点来判断
        root.next = root.next.next;
    } else {
        remove(root.next, value);
    }
}
//链表倒序
function reserve(root) {
    if (!root || !root.next) return root;//一个节点或者无节点的情况
    if (!root.next.next) {
        //两个节点时
        //先记录下一项
        var flag = root.next;
        root.next.next = root;
        root.next = null;
        return flag;
    } else {
        var flag = reserve(root.next);
        root.next.next = root;
        root.next = null;
        return flag;
    }
}
var a = new Node('a');
var b = new Node(1);
var c = new Node('c');
var d = new Node('d');
a.next = b;
b.next = c;
c.next = d;
// console.log(a)
// print(a);
// console.log(count(d));
// console.log(getValue(a,3))
// setValue(a, 1, 'b');
// console.log(a)
// insertAfter(d, 1);
// insertLast(a, 2);
// remove(a,'d');
console.log(a);
var temp = reserve(a);
print(temp);
