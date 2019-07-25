var Game = (() => {
    var Row = config.row + 2;
    var COL = config.col + 2;
    var itemCount = config.row * config.col;
    var data = {
        time: config.time,
        cell: [],
    };
    var timeCooldown = 60;
    var helpData = [];
    var Game = () =>{

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
                        if(item.val === null){
                            data.cell[y][x].val = i;
                            break;
                        }
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
            var called = (dir) => {
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
        },
        directlyConnectable(before,after){
            var status = this.connectable(before,after);
            return status;
        },
        coceCorner(before,after){
            var _this = this;
            var success = false;
            var pos = [];
            var corners = this.getCorner(bofore,after);
            corners.forEach((el) => {
                if(!_this.isEmpty(_this.getItem(el)) || success){
                    return;
                }
                var _status = [
                    _this.connectable(before,el),
                    _this.connectable(el,after),
                ];
                var ok = _status.every((status) => {
                    return status.success;
                });
                if(ok){
                    _status[0].pos.push(el);
                    success = true;
                    pos = _status[0].pos.concat(_status[1].pos);
                }
            });
            return {
                success: success,
                pos: pos,
            };
        },
        twiceCorner(before,after){
            var success = false;
            var pos = [];
            var arounds = this.getAround(before);
            call: for(var i=0;i<arounds.length;i++){
                var j = before;
                while(j += arounds[i]){
                    var current = this.getItem(j);
                    if(!this.isEmpty(current)){
                        break;
                    }
                    var _status = this.onceCorner(j,after);
                    if(_status.success){
                        success = true;
                        var _pos = this.directlyConnectable(before,j).pos;
                        _pos.push(j);
                        pos = _pos.concat(_status.pos);
                        break call;
                    }
                    if(this.isLimit(j)){
                        break;
                    }
                }
            }
            return {
                success: success,
                pos: pos,
            }
        },
        isConnectable(before,after){
            var status = {};
            if(before === after) return false;
            if(!this.isSame(before,after)) return false;
            var calleds = [
                //直连
                this.directlyConnectable,
                //一次拐角
                this.onceCorner,
                //两次拐角
                this.twiceCorner,
            ];
            for(var i=0;i<calleds.length;i++){
                var fn = calleds[i].bind(this);
                status = fn(before,after);
                if(status.success){
                    break;
                }
            }
            return status;
        },
        judge(before,after){
            var _this = this;
            var status = this.isConnectable(before,after);
            if(status && status.success){
                if(status && status.success){
                    status.pos.unshift(before);
                    status.pos.push(after);
                    this.view.showLine(status.pos,(){
                        _this.removeItem(before,after);
                    });
                }else{
                    this.removeItem(before,after);
                }
                return true;
            }else{
                return false;
            }
        },
        isOutside(index){
            var pos = this.indexToPos(index);
            return (
                pos.x < 0 || pos.y < 0 || pos.x > COL-1 || pos.y > Row-1
            );
        },
        isLimit(index){
            var pos = this.indexToPos(index);
            return (
                pos.x === 0 || pos.y === 0 || pos.x === COL-1 || pos.y === Row-1
            );
        },
        getItem(index){
            if(this.isOutside(index)){
                return {};
            }
            var pos = this.indexToPos(index);
            return data.cell[pos.y][pos.x];
        },
        winning(){
            setTimeout(() => {
                var str = "已经完成，确定再来一局吗？";
                alert(str);
                location.reload();
            },50);
        },
        over(){
            data.time = config.time;
            var str = "失败！确定再来一次吗？";
            alert(str);
            location.reload();
        },
        checkWinning(){
            if(itemCount ===0 ){
                this.winning();
            }else{
                this.checkDeadlock();
            }
        },
        checkDeadlock(){
            log(1);
            var count = config.objectCount;
            var cell = reduceDimension(data.cell);
            var filter = (i) => {
                return cell.filter((el) => {
                    return el.val === i;
                });
            };
            for(var i=0;i<count;i++){
                var result = filter(i);
                var len = result.length;
                for(var j=0;j<len;j++){
                    var el = result[j].index;
                    for(var k=0;k<len;k++){
                        var status = this.isConnectable(el,result[k].index);
                        if(status && status.success) {
                            helpData = [el,result[k].index];
                            return;
                        }
                    }
                }
            }
            this.randomReset();
        },
        randomReset(){
            var _this = this;
            var row = config.row;
            var col = config.col;
            var cell = (() => {
                return reduceDimension(data.cell).filter((el) => {
                    return el.val !== null;
                });
            })();
            this.initCell();
            cell.forEach((el) => {
                while(true){
                    var x = random(1,col);
                    var y = random(1,row);
                    var item = data.cell[y][x];
                    if(item.val === null){
                        data.cell[y][x] = {
                            val: el.val,
                            index: _this.posToIndex({x: x,y: y}),
                        }
                        break;
                    }
                }
            });
            this.view.init(this,data);
            this.checkDeadlock();
        }
    }
    return Game;
})();