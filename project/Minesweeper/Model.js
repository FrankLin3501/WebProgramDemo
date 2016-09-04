function Model(width, height, landmine) {
    this.width = width;
    this.height = height;
    this.landmine = landmine;
    this.maxLandmine = this.landmine;
    this.map = [];
    this.isGameOver = false;
    /*  Shuffle
        use to produce the map.
    */
    this.makeRandom = function () {
        this.map = [];
        var n = this.maxLandmine;
        
        var tmp = [];
        var index = 0, maxLength = this.width * this.height;
        while (index < maxLength) {
            tmp.push(index < n ? -1 : 0);
            index++;
        }
        for (index = 0 ; index < maxLength ; index++){
            var _i = Math.floor(Math.random() * maxLength);
            var value = tmp[_i];
            tmp[_i] = tmp[index];
            tmp[index] = value;
        }
        index = 0;
        for (var i = 0 ; i < this.height ; i++){
            this.map.push([]);
            for (var j = 0 ; j < this.width ; j++){
                this.map[i].push(tmp[index++]);
            }
        }
        
        for (var i = 0 ; i < this.height ; i++){
            for (var j = 0 ; j < this.width ; j++){
                if (this.map[i][j] != -1){
                    var tmp = [[-1,-1],[-1,0],[-1,1],
                              [0,-1],[0,1],
                              [1,-1],[1,0],[1,1]];
                    for (var t = 0 ; t < tmp.length	; t++){
                        var t_i = i+tmp[t][0], t_j = j+tmp[t][1];
                        if (this.isOutOfMap(t_i, t_j)) continue;
                        if (this.map[t_i][t_j] == -1){
                            this.map[i][j]++;
                        }
                    }
                }
            }
        }
        
        this.show(this.map);
    }
    
    /*  show
        use to display the map.
    */
    this.show = function (b_Array) {
        var data = '○①②③④⑤⑥⑦⑧⑨';
        var line = '\\n';
        for (var i = 0 ; i < b_Array.length ; i++) {            
            for (var j = 0 ; j < b_Array[i].length ; j++) {
                //line += b_Array[i][j] + '  ';// == -1 ? '_' : 'O';
                var num = b_Array[i][j];
                var str = num==-1?'☒':num==0?'☐':'☑';
                line += str;
            }
            line += '\\n';
        }
        eval('console.log("%c' + line + '", "color:red;font-size:24px;");');
    }
    
    this.isOutOfMap = function (i, j) {
        if (i<0 || i>=this.height || j<0 || j>=this.width) {
            return true;
        }
        return false;
    }
    
    this.touch = function (i, j) {
        //console.log('i='+i+', j='+j);
        //if (i >= height || i < 0 || j >= width || j < 0) return 'E';//Error
        
        if (this.map[i][j] == -1) {
            this.isGameOver = true;
            //console.log('B');
            return 'B';//Boom
        } else {
            return this.map[i][j];
        }
    }

    this.setFlag = function (v) {
        this.landmine += eval(v);
    }
    /*  toString
        use to display property
    */
    this.toString = function () {
        console.log('Width:\t' + this.width + '\nHeight:\t' + this.height + '\nLandmine:\t' + this.landmine);
    }
}
