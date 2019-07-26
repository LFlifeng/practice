var View = (function(){
    var container = $('.container')[0];
    var gridContainer = $('.grid-container')[0];
    var timeDom = $('.time')[0];
    var game = null;
    var View = function(){ };
    View.prototype = {
        init(g,data){
            game = g;
            this.updateTime(data.time);
            this.initGrid(data.cell);
        },
        updateTime(time){
            timeDom.innerHTML = time;
        },
        itemHTML(el){
            var empty = el.val === null;
            var img = config.imgByName(empty ? 0 : el.val);
            return (
                `<div class="grid-item ${empty ? 'hidden' : ''}"
                    data-val="${el.val}"
                    data-index="${el.index}">
                    <div class="grid-item-content">
                        ${img}
                    </div>
                        ${config.itemDirectionHTML}
                </div>`
            );
        },
        initGrid(cell){
            var _this = this;
            var html = "";
            cell.forEach(function(arr){
                html += "<div class='grid-cell'>";
                arr.forEach(function(el){
                    html += _this.itemHTML(el);
                });
                html += "</div>";
            });
            gridContainer.innerHTML = html;
        },
        itemAction(item){
            item.classList.add('action');
        },
        itemCancelAction(item){
            item.classList.remove('action');
        },
        removeItem(index){
            var item = $(`.grid-item[data-index="${index}"]`)[0];
            item.classList.add('hidden');
        },
        getRelationhip(prev,next,current){
            var dir = [];
            var max = [
                prev > current,
                next > current
            ];
            var arr = [prev,next];
            arr.forEach(function(el,index){
                if(game.identicalY(el,current)){
                    dir[index] = max[index] ? 'right' : 'left';
                }else if (game.indenticalX(el,current)){
                    dir[index] = max[index] ? 'down' : 'up';
                }
            });
            return dir;
        },
        showLine(pos,callback){
            var _this = this;
            pos.forEach(function(el,index){
                if(index === 0) return;
                if(index === pos.length-1) return;
                var item = $(`.grid-item[data-index="${el}"] .grid-item-direction`);
                var prev = pos[index-1];
                var next = pos[index+1];
                var dir = _this.getRelationhip(prev,next,el);
                item.classList.add(dir[0],dir[1]);
            });
            setTimeout(function(){
                _this.classLine();
                callback();
            },300);
        },
        clearLine(){
            var item = $(".grid-item-direction");
            item.forEach(function(el){
                el.classList.remove('up','down','left','right');
            });
        },
    };
});
console.dir(View);
