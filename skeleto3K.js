function Point(x, y) {
    this.x = x;
    this.y = y;
}

class ZhangSuen{
    constructor(img)
    {
        this.image = img;
        this.nbrs = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]];
        this.nbrGroups = [[[0, 2, 4], [2, 4, 6]], [[0, 2, 6], [0, 4, 6]]];
        this.grid = img; // na real não é uma array de pixel 2d
        this.toWhite = new Array();
    }

    main()
    {
        this.thinImage();
        /* for (let index = 0; index < 1000; index++) {
            this.thinImage2();
        } */
    }

    thinImage2()
    {
        var firstStep = true;
        for (let r = 1; r < this.grid.height - 1; r++) {
            for (let c = 1; c < this.grid.width - 1; c++) {
                if ( getColor(this.grid,r,c)[0] !== 0)
                    continue;
                let nn = this.numNeighbors(r, c);
                if (nn < 2 || nn > 6)
                    continue;
                if (this.numTransitions(r, c) !== 1)
                    continue;
                if (!this.atLeastOneIsWhite(r, c, firstStep ? 0 : 1))
                    continue;
                this.toWhite.push(new Point(c, r));
            }
        }

        //console.log(this.toWhite);
        for (let i = 0; i < this.toWhite.length; i++) {
            let p = this.toWhite[i];
            setColor(this.grid, p.x, p.y, 255);
            //this.grid[p.y][p.x] = ' ';
        }
        this.toWhite = new Array();
        console.log("finish");
    }

    thinImage()
    {
        var firstStep = false;
        var hasChanged;
        do {
            hasChanged = false;
            firstStep = !firstStep;
            for (var r = 1; r < this.grid.height - 1; r++) {
                for (var c = 1; c < this.grid.width - 1; c++) {
                    if ( getColor(this.grid,r,c)[0] !== 0)
                        continue;
                    var nn = this.numNeighbors(r, c);
                    if (nn < 2 || nn > 6)
                        continue;
                    if (this.numTransitions(r, c) !== 1)
                        continue;
                    if (!this.atLeastOneIsWhite(r, c, firstStep ? 0 : 1))
                        continue;
                    this.toWhite.push(new Point(c, r));
                    hasChanged = true;
                }
            }
            for (let i = 0; i < this.toWhite.length; i++) {
                var p = this.toWhite[i];
                setColor(this.grid, p.x, p.y, 255);
                //this.grid[p.y][p.x] = ' ';
            }
            this.toWhite = new Array();
        } while ((firstStep || hasChanged));
        this.printResult();
        console.log("finish");
    }

    numNeighbors (x, y) {
        //console.log("Neighbors ",x,y);
        var count = 0;
        for (var i = 0; i < this.nbrs.length - 1; i++)
            if (getColor(this.grid, x + this.nbrs[i][1], y + this.nbrs[i][0])[0] === 0)
                count++;
        //console.log("\tc:",count);
        return count;
    }

    numTransitions = function (r, c) {
        //console.log("numTransitions ",r,c);
        var count = 0;
        for (var i = 0; i < this.nbrs.length - 1; i++)
            if (getColor(this.grid, c + this.nbrs[i + 1][1], r + this.nbrs[i][0])[0] === 255) {
                if (getColor(this.grid, c + this.nbrs[i + 1][1], r + this.nbrs[i + 1][0])[0] === 0)
                    count++;
            }
        //console.log("\tc:",count);
        return count;
    }

    atLeastOneIsWhite = function (r, c, step) {
        //console.log("atLeastOneIsWhite ",r,c,step);
        var count = 0;
        var group = this.nbrGroups[step];
        for (var i = 0; i < 2; i++)
            for (var j = 0; j < group[i].length; j++) {
                var nbr = this.nbrs[group[i][j]];
                if (getColor(this.grid, c + nbr[1],r + nbr[0] )[0] === 255) {
                    count++;
                    break;
                }
            }
        //console.log("\tc:",count>1);
        return count > 1;
    }
   

}


ZhangSuen.thinImage = function () {
    var firstStep = false;
    var hasChanged;
    do {
        hasChanged = false;
        firstStep = !firstStep;
        for (var r = 1; r < ZhangSuen.grid.height - 1; r++) {
            for (var c = 1; c < ZhangSuen.grid.width - 1; c++) {
                if (ZhangSuen.grid[r][c] !== '#')
                    continue;
                var nn = ZhangSuen.numNeighbors(r, c);
                if (nn < 2 || nn > 6)
                    continue;
                if (ZhangSuen.numTransitions(r, c) !== 1)
                    continue;
                if (!ZhangSuen.atLeastOneIsWhite(r, c, firstStep ? 0 : 1))
                    continue;
                ZhangSuen.toWhite.push(new Point(c, r));
                hasChanged = true;
            }
        }
        for (let i = 0; i < ZhangSuen.toWhite.length; i++) {
            var p = ZhangSuen.toWhite[i];
            ZhangSuen.grid[p.y][p.x] = ' ';
        }
        ZhangSuen.toWhite = new Array();
    } while ((firstStep || hasChanged));
    ZhangSuen.printResult();
};
ZhangSuen.numNeighbors = function (r, c) {
    var count = 0;
    for (var i = 0; i < ZhangSuen.nbrs.length - 1; i++)
        if (ZhangSuen.grid[r + ZhangSuen.nbrs[i][1]][c + ZhangSuen.nbrs[i][0]] === '#')
            count++;
    return count;
};
ZhangSuen.numTransitions = function (r, c) {
    var count = 0;
    for (var i = 0; i < ZhangSuen.nbrs.length - 1; i++)
        if (ZhangSuen.grid[r + ZhangSuen.nbrs[i][1]][c + ZhangSuen.nbrs[i][0]] === ' ') {
            if (ZhangSuen.grid[r + ZhangSuen.nbrs[i + 1][1]][c + ZhangSuen.nbrs[i + 1][0]] === '#')
                count++;
        }
    return count;
};
ZhangSuen.atLeastOneIsWhite = function (r, c, step) {
    var count = 0;
    var group = ZhangSuen.nbrGroups[step];
    for (var i = 0; i < 2; i++)
        for (var j = 0; j < group[i].length; j++) {
            var nbr = ZhangSuen.nbrs[group[i][j]];
            if (ZhangSuen.grid[r + nbr[1]][c + nbr[0]] === ' ') {
                count++;
                break;
            }
        }
    return count > 1;
};
ZhangSuen.printResult = function () {
    for (var i = 0; i < ZhangSuen.grid.length; i++) {
        var row = ZhangSuen.grid[i];
        console.log(row.join(''));
    }
};
//return ZhangSuen;


//ZhangSuen.main(null);