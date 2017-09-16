export class POINT {
    x:number;
    y:number;

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    static add(point1:POINT,point2:POINT):POINT {
        return new POINT(point1.x + point2.x,point1.y + point2.y);
    }
}

export class LINE {
    pointS:POINT;
    pointE:POINT;

    constructor(point1:POINT,point2:POINT){
        this.pointS = new POINT(point1.x,point2.y)
        this.pointE = new POINT(point2.x,point2.y)
    }

    get length(): number{
        return Math.sqrt((this.pointE.x - this.pointS.x)**2 + (this.pointE.y - this.pointS.y)**2);
    }

    get cosTheta(): number{
        return (this.pointE.x - this.pointS.x) / this.length;
    }

    get sinTheta(): number{
        return (this.pointE.y - this.pointS.y) / this.length;
    }

}

export class COORDINATE {
    pointO:POINT;
    pointX:POINT;
    pointY:POINT;
    private _textXLocation: POINT;
    private _textYLocation: POINT;
    private _fontColor: string;
    private _fontSize: number;
    constructor(point1:POINT,point2:POINT,point3:POINT) {
        this.pointO = new POINT(point1.x,point1.y);
        this.pointX = new POINT(point2.x,point2.y);
        this.pointY = new POINT(point3.x,point3.y);

        let offSetX:POINT = new POINT(25,9);

        this._textXLocation = POINT.add(this.pointX,offSetX);

        let offSetY:POINT = new POINT(-9,-25);

        this._textYLocation = POINT.add(this.pointY,offSetY);

        this._fontColor = "red";
        
        this._fontSize = 25;

    };
    get textXLocation():POINT {
        return this._textXLocation;
    }

    set textXLocation(point:POINT) {
        this._textXLocation = POINT.add(this.pointX,point)
    }

    get textYLocation():POINT {
        return this._textYLocation;
    }

    set textYLocation(point:POINT) {
        this._textYLocation = POINT.add(this.pointY,point)
    }

    get fontColor():string {
        return this._fontColor;
    }

    set fontColor(color:string) {
        this._fontColor = color;
    }

    get fontSize():number {
        return this._fontSize;
    }

    set fontSize(size:number) {
        this._fontSize = size;
    }
}