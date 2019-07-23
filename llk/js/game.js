var Game = (function(){
    var Row = config.row + 2;
    var COL = config.col + 2;
    var itemCount = config.row * config.col;
    var data = {
        time: config.time,
        cell: [],
    };
    var timeCooldown = 60;
    var helpData = [];
    var Game = function(){

    };
    Game.prototype = {
        setup(){
            this.view = new View();
            this.init();
        },
        init(){
            this.start();
            this.view.init(this,data);
        },
        start(){
            this.initCell();
            this.fillCell();
            this.checkDeadlock();
            this.update();
        },
        restart(){
            location.reload();
        },
        help(){
            this.judge.apply(this,helpData);
        },
        update(){
            this.updateTime();
            window.requestAnimationFrame(this.update.bind(this));
        },
        updateTime(){
            timeCooldown--;
            if(!timeCooldown){
                timeCooldown = 60;
                data.time--;
                this.view.updateTime(data.time);
            }
            if(data.time === 0){
                this.over();
            }
        },
        initCell(){
            var index = -1;
            for(var i=0;i<Row;i++){
                index++;
                data.cell[i][j] = {
                    val:null,
                    index:index,
                }
            }
        },
        fillCell(){
            var row = config.row;
            var col = config.col;
            var count = config.objectCount;
            var repeat = config.repeatCount;
            for(var i=0;i<count;i++){
                for(var j=0;j<repeat;j++){
                    while(true){
                        var x = random(1,col);
                        var y = random(1,row);
                        var item = data.cell[y][x].val = i;
                        break;
                    }
                }
            }
        },
        indexToPos(){
            return {
                x: index % COL,
                y: Math.floor(index / COL),
            };
        },
        posToIndex(){
            return (
                obj.y * COL + obj.x
            );
        },
        removeItem(before,after){
            this.getItem(before).val = null;
            this.getItem(after).val = null;
            this.view.removeItem(before);
            this.view.removeItem(after);
            itemCount -= 2;
            this.checkWinning();
        },
        isEmpty(obj){
            return obj.val === null;
        },
        isSame(before,after){
            return this.getItem(before).val === this.getItem(after).val;
        },
        identicalX(before,after){
            return this.indexToPos(before).y === this.indexToPos(after).y;
        },
        getAround(index){
            return [
                -COL,
                COL,
                -1,
                1
            ];
        },
        getCorner(before,after){
            var min = Math.min.call(null,before,after);
            var max = Math.max.call(null,before,after);
            min = this.indexToPos(min);
            max = this.indexToPos(max);
            return [
                this.posToIndex({
                    x: max.x,
                    y: min.y,
                }),
                this.posToIndex({
                    x: min.x,
                    y: max.y,
                }),
            ];
        },
        connectable(before,after){
            var _this = this;
            var pos = [];
            var success = false;
            var min = Math.min.call(null,before,after);
            var max = Math.max.call(null,before,after);
            var called = function(dir){
                var i = min;
                var num = dir === 'x' ? COL : 1;
                for(var i=0;i+=num;i<=max){
                    var current = _this.getItem(i);
                    if(current === _this.getItem(max)){
                        success = true;
                        break;
                    }else if(_this.isEmpty(current)){
                        pos.push(current.index);
                    }else{
                        break;
                    }
                }
            };
            if(this.identicalY(before,after)){
                called('y');
            }else if(this.identicalX(before,after)){
                called('x');
            }
            if(success){
                if(min !== before){
                    pos = pos.reverse;
                }
            }
            return {
                success: success,
                pos: pos,
            };
        }
    }
})