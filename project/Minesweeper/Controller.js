var model;

function restart() {
    var b = $('#board')[0];
    b.innerHTML = '';
    var width = eval($('#txtWidth')[0].value);
    var height = eval($('#txtHeight')[0].value);
    var landmine = eval($('#txtLandmine')[0].value);
    createGameboard(b, width, height, landmine);    
}

function createGameboard(board, width, height, landmine) {
    model = new Model(width, height, landmine);
    for (var y = 0 ; y < height ; y++) {
        var tr = document.createElement('tr');
        for (var x = 0 ; x < width ; x++) {
            var td = document.createElement('td');
            var btn = document.createElement('button');
            btn.setAttribute('class', 'btn blank');
            btn.setAttribute('i', y);
            btn.setAttribute('j', x);
            btn.setAttribute('onClick', 'btn_Click(this);');
            btn.setAttribute('onmousedown', 'mouseClick(event);');
            btn.setAttribute('oncontextmenu', 'return false;');
            btn.innerHTML = '　';
            td.appendChild(btn);
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
    model.makeRandom();
}

function buttonAddClass(btn, classname) {
    var i = btn.getAttribute('i');
    var j = btn.getAttribute('j');
    $('.btn[i="' + i + '"][j="' + j + '"]').addClass(classname);
}

function buttonRemoveClass(btn, classname) {
    var i = btn.getAttribute('i');
    var j = btn.getAttribute('j');
    $('.btn[i="' + i + '"][j="' + j + '"]').removeClass(classname);
}

function btn_Click(btn) {
    var i = btn.getAttribute('i');
    var j = btn.getAttribute('j');
    auto_Click(i, j);
}

function auto_Click(i, j) {
    var btn = $('.btn[i="' + i + '"][j="' + j + '"].blank')[0];
    if (btn !== undefined) {
        //console.log(i + ', ' + j);
        if (!btn.classList.contains('flag') && !btn.classList.contains('open')) {
            buttonAddClass(btn, 'open');
            buttonRemoveClass(btn, 'blank');
            btn.innerHTML = model.touch(i, j);
            //console.log(btn);
            if (btn.innerHTML != 'B') {
                buttonAddClass(btn, 'click' + btn.innerHTML);
                if (btn.innerHTML == '0') {
                    var tmp = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
                    for (var t = 0 ; t < tmp.length ; t++) {
                        var tI = eval(i) + tmp[t][0];
                        var tJ = eval(j) + tmp[t][1];
                        if (model.isOutOfMap(tI, tJ)) continue;
                        //console.log(tI + ', ' + tJ);
                        auto_Click(tI, tJ);
                    }
                }
            } else {
                buttonAddClass(btn, 'boom');
                btn.innerHTML = "✸";
                boom(i, j);
            }
        }
    }
}

function boom(i, j) {
    //var btnArray = $('.btn[class*="blank"]');
    var btn = $('.btn[class*="blank"]')[0];
    var index = 0;
    while (btn != undefined) {
        console.log(index);
        var i = btn.getAttribute('i');
        var j = btn.getAttribute('j');
        if (btn.classList.contains('flag')) {
            index++;
            btn = $('.btn[class*="blank"]')[index];
            continue;
        }
        buttonAddClass(btn, 'open');
        buttonRemoveClass(btn, 'blank');
        
        btn.innerHTML = model.touch(i, j);

        if (btn.innerHTML != 'B') {
            buttonAddClass(btn, 'click' + btn.innerHTML);
            if (btn.innerHTML == '0') {
                var tmp = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
                for (var t = 0 ; t < tmp.length ; t++) {
                    var tI = eval(i) + tmp[t][0];
                    var tJ = eval(j) + tmp[t][1];
                    if (model.isOutOfMap(tI, tJ)) continue;
                    auto_Click(tI, tJ);
                }
            }
        } else {
            buttonAddClass(btn, 'boom2');
            btn.innerHTML = "✸";
            //boom(i, j);
        }
        
        btn = $('.btn[class*="blank"]')[index];
    }
    alert('You Lose');
}

function mouseClick(event){
    //console.log("click");
    if (!event) {
        var event = window.event;
    }
    if (event.button == 2){
        var btn = event.srcElement;
        //console.log(event.srcElement);
        if (btn.classList.contains('blank')){
            if (btn.classList.contains('flag')) {
                btn.innerHTML = '　';
                buttonRemoveClass(btn, 'flag');
                model.setFlag(1);
                
            } else {
                btn.innerHTML = '⚑';
                buttonAddClass(btn, 'flag');
                model.setFlag(-1);
            }
            console.log(model.landmine);
        }
    }
}