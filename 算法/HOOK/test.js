function student(name, score, praise) {
    return {
        name: name,
        score: score,
        praise: praise
    }
}
/**
 * 比如获得过全国一等奖加20分，二等奖加10分，三等奖加5分
 * 未使用Hook的方式
 * @param {*} students 
 */
// function praiseAdd(students) {
//     var results = {};
//     for (var i in students) {
//         if (students[i].praise === 1) {
//             students[i].score += 20;
//         }else if(students[i].praise === 2){
//             students[i].score += 10;
//         }else if(students[i].praise === 3){
//             students[i].score += 5;
//         }
//         //对象中给没有的属性赋值
//         results[students[i].name] =students[i].score;
//     }
//     return results;
// }

var praiseList = {
    1: 20,
    2: 10,
    3: 5
}
/**
 * 比如获得过全国一等奖加20分，二等奖加10分，三等奖加5分
 * 使用Hook的方式
 * @param {*} students 
 */
function praiseAdd(students) {
    var results = {};
    for (var i in students) {
        
        if (praiseList[students.praise]) {
            console.log(praiseList[students.praise]);
            students[i].score += praiseList[students.praise];
        }
        results[students[i].name] = students[i].score;
    }
    return results;
}
var wcf = student('wangcuifang', 70, 1);
var lhn = student('liuhainan', 90, 2);
var lz = student('lizhi', 80, 3);
var gh = student('guohao', 85, 3);
var result = praiseAdd([wcf, lhn, lz, gh]);
for (var i in result) {
    console.log("name:" + i + ",score:" + result[i]);
}