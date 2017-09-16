export class BUTTON {
    index:number;
    title:string;
    src:string;
    selected:boolean; 
    clicked:boolean;
    parent;
    constructor(index:number,title:string, src:string,parent) {
        this.index = index;
        this.title = title;
        this.src = src;
        this.selected = false;
        this.clicked = false;
        this.parent = parent;
    }

    hover(): void {
        if(!this.clicked){
            this.selected = true 
        }
    }

    out(): void{
        if(!this.clicked){
            this.selected = false;
        }
    }

    click(): void{
        this.clicked = ! this.clicked;
        this.selected = this.clicked;
    }
}
let parent = {
    clicked: false,
    children: []
}
export let MENUE: BUTTON[] = [];
parent.children = MENUE;
MENUE = [
    new BUTTON(0,'create line','/assets/line.png',parent),
    new BUTTON(1,'create load','/assets/force.png',parent)
]