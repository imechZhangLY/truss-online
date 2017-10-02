export class BUTTON {
    index:number;
    name:string;
    title:string;
    src:string;
    selected:boolean; 
    clicted:boolean;
    parent;
    constructor(index:number,name:string,title:string, src:string,parent) {
        this.index = index;
        this.name = name;
        this.title = title;
        this.src = src;
        this.selected = false;
        this.clicted = false;
        this.parent = parent;
    }

    hover(): void {
        if(!this.clicted){
            this.selected = true 
        }
    }

    out(): void{
        if(!this.clicted){
            this.selected = false;
        }
    }

    click(): void{
        if(this.clicted){
            this.clicted = false;
            this.parent.which = '';
        }else{
            this.parent.children.forEach((element,index) => {
                this.parent.children[index].clicted = false;
                this.parent.children[index].selected = false;
            });
            this.clicted = true;
            this.selected = true;
            this.parent.which = this.name;
        }
    }
}
export const MENUE = {
    children:[],
    which:''
}
MENUE.children = [
    new BUTTON(0,'createLine','create line','/assets/line.png',MENUE),
    new BUTTON(1,'createLoad','create load','/assets/force.png',MENUE)
]
