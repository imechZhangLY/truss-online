import {POINT, LINE} from './geometry'

export const PAINTMAP = {

    paintMapWidth:400,
    paintMapHeight:400,

    //几何结构的特征尺寸
    typicalLength:400,

    //svg在窗口中的位置
    left:200,
    top:74
};

export const COORDINATE = {
    paintMap: PAINTMAP,
    __option__: {
        position: {
            right: 70,
            top: 70 
        },
        title:{
            xTitle: 'x',
            yTitle: 'y',
            //相对与坐标系x轴的右端点
            xTitlePosition: {
                offSetX: 25,
                offSetY: 9
            },
            //相对于坐标系y轴的上端点
            yTitlePosition: {
                offSetX: -9,
                offSetY: -25
            },
        },
        font:{
            fontColor: 'red',
            fontName: 'Times New Roman',
            fontSize: '25px'
        },
        axis:{
            length: 80,
            width: 3,
            color: 'rgb(200,200,200)',
            marker: {
                width: 6,
                height: 6
            }
        },

    },
    get x2():number {
        return this.paintMap.paintMapWidth - this.__option__.position.right;
    },
    get x1():number {
        return this.x2 - this.__option__.axis.length;
    },
    get y2():number {
        return this.__option__.position.top;
    },
    get y1():number {
        return this.y2 + this.__option__.axis.length;
    },
    get xTitlePositionX():number {
        return this.x2 + this.__option__.title.xTitlePosition.offSetX;
    },
    get xTitlePositionY():number {
        return this.y1 + this.__option__.title.xTitlePosition.offSetY;
    },
    get yTitlePositionX():number {
        return this.x1 + this.__option__.title.yTitlePosition.offSetX;
    },
    get yTitlePositionY():number {
        return this.y2 + this.__option__.title.yTitlePosition.offSetY;
    },
    set option(obj) {
        for(let p in obj){
            for(let p1 in obj[p]){
                this.__option__[p][p1] = obj[p][p1]
            }
        }
    }
};

export const GRAPH = {
    paintMap: PAINTMAP,
    __lines__: [],

    //通过鼠标指针获得的点，转化为svg的坐标点
    pointerPointToScreenPoint(point):POINT{
        let x = point.x - this.paintMap.left;
        let y = point.y - this.paintMap.top;
        return new POINT(x,y);
    },

    //将鼠标获得点直接转化为模型的点
    screenPointToModelPoint(point):POINT {
        let x = point.x - this.paintMap.left;
        let y = point.y - this.paintMap.top;
        let radio = this.paintMap.typicalLength / this.paintMap.paintMapWidth
        x = x * radio - 0.5 * this.paintMap.typicalLength;
        y = 0.5 * radio * this.paintMap.paintMapHeight - y  * radio;
        x = Math.round(100 * x) / 100;
        y = Math.round(100 * y) / 100;
        return new POINT(x,y);
    },

    //将模型的点转化为svg的点
    modelPointToScreenPoint(point):POINT {
        let radio = this.paintMap.paintMapWidth / this.paintMap.typicalLength
        let x = point.x * radio + 0.5 * this.paintMap.paintMapWidth;
        let y = -point.y  * radio + 0.5 * this.paintMap.paintMapHeight;
        x = Math.round(x);
        y = Math.round(y);
        return new POINT(x,y);
    },

    get lines():any {
        return this.__lines__.map(element => {
            let point1 = this.modelPointToScreenPoint(element.pointS);
            let point2 = this.modelPointToScreenPoint(element.pointE);
            return new LINE(point1,point2)
        });
    },

    set lines(line1:any) {
        let point1 = this.screenPointToModelPoint(line1.pointS);
        let point2 = this.screenPointToModelPoint(line1.pointE);
        this.__lines__.push(new LINE(point1,point2));
    }
}

export const CURRENTPOINT:POINT = new POINT(0,0);

export const GRAPHOPTION = {
    width: 3,
    color: 'black',
    sensitivity: 5
}