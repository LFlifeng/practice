/**
 * 生成无向图
 * @param {*} value 
 */
function Node(value) {
    this.value = value;
    this.neighbours = [];
}
/**
 * 深度优先查询
 * @param {*} root 
 * @param {*} targetValue 目标值
 * @param {*} found  传一个空数组，来存储已经找过的节点
 */
function deepFirstSearch(root, targetValue, found) {
    //判断found数组中是否包含了root，若包含，说明该节点已经被查过，则直接返回
    if (found.includes(root)) return false;
    //先看本身是不是要找的节点
    if (root.value === targetValue) {
        return true; //如果是，返回true
    } else {
        found.push(root); //如果不是，则将节点放入数组中
    }
    //看本身的相邻节点是不是要找的节点
    for (var i = 0; i < root.neighbours.length; i++) {
        if (deepFirstSearch(root.neighbours[i], targetValue, found)) {
            return true; //在相邻节点中找到，则返回true
        }
    }
    // 若所有的相邻节点的深搜过程都找不到，则返回false
    return false;
}
/**
 * 
 * @param {*} roots 要查找的某一群节点，该数组中节点都是没有找过的 
 * @param {*} targetValue 目标值
 * @param {*} found 传一个空数组，来存储已经找过的节点
 */
function breadFirstSearch(roots, targetValue, found) {
    var nexts = []; //用来存储roots[i]相邻接节点的
    if (roots.length === 0) return false;
    for (var i = 0; i < roots.length; i++) {
        if (roots[i].value === targetValue) {
            return true; //该数组中存在目标值，则返回true
        }
        // 若不存在，则将该值放到found中，表示该值已查找过
        found.push(roots[i]);
        //继续查找该值的相邻节点的值
        for (var j = 0; j < roots[i].neighbours.length; j++) {
            //判断nexts中是否包含相邻节点
            if (!nexts.includes(roots[i].neighbours[i])) {
                //如果nexts中不包含相邻节点，则将该节点放入数组中
                nexts.push(roots[i].neighbours[i]);
            }
        }
    }
    //判断found数组中是否包含nexts数组中的值，如果包含的话就删除nexts数组的值
    for (var i = 0; i < nexts.length; i++) {
        if(found.includes(nexts[i])){
            //若包含就删除本身
            nexts.splice(i,1);
            i--;
        }
    }
    return breadFirstSearch(nexts,targetValue,found);
}
/**
 * 最小生成树，使用Prim算法根据点的集合与边的集合，链接节点 || 求最短路径问题
 * @param {*} roots 点的集合
 * @param {*} sides 边的集合
 */
function Prim(roots,sides){
    if(roots.length !== sides.length || roots.length <= 1) return;
    var result = {
        distance: Infinity,  //默认距离无穷大
        to: null,  //连接到部落的哪个点，部落的点
        from: null
    }
}
var a = new Node('a');
var b = new Node('b');
var c = new Node('c');
var d = new Node('d');
var e = new Node('e');
// a.neighbours.push(b, c, e);
// b.neighbours.push(a, c);
// c.neighbours.push(a, b, d);
// d.neighbours.push(c, e);
// e.neighbours.push(a, d);
// console.log(a);
// console.log(deepFirstSearch(a, 'c', []));
// console.log(breadFirstSearch([a, b], 'c', []));
var roots = [a,b,c,d,e];
var sides = [
    [0,8,3,Infinity,4],//a到各点的距离
    [8,0,4,Infinity,Infinity],//b到各点的距离
    [3,4,0,3,Infinity],//c到各点的距离
    [Infinity,Infinity,3,0,6],//d到各点的距离
    [4,Infinity,Infinity,6,0]//e到各点的距离
]
Prim(roots,sides);