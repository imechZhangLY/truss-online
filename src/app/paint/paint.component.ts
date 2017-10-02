import { Component, OnChanges, OnInit, AfterViewInit} from '@angular/core';
import { POINT, LINE} from 'app/geometry'
import { TrussService } from 'app/truss.service'
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css'],
  providers: [TrussService]
})
export class PaintComponent implements OnInit {
  height: number;
  width: number;
  trussTree: LINE[];
  tempLine: LINE;
  currentPointerPoint: POINT;
  lastPointerPoint: POINT;
  currentPoint: POINT;
  paintMap;
  coordinate;
  graph;
  graphOption;
  menue;
  constructor(private trussService:TrussService) {
    this.paintMap = trussService.getPaintMap();
    this.coordinate = trussService.getCoorDinate();
    this.graph = trussService.getGraph();
    this.currentPoint = trussService.getCurrentPoint();
    this.menue = trussService.getMenue();
    this.graphOption = trussService.getGraphOption();
    this.tempLine = new LINE(new POINT(-100,-100),new POINT(-100,-100));
    this.currentPointerPoint = new POINT(0,0);
   };

  // @HostListener('mousemove', ['$event'])
  // mouseMove(event: MouseEvent) {
  //   if(this.menue.which){
  //     this.opetation(this)[this.menue.which].mouseMove(event);
  //   }else{
  //     this.lastPoint = undefined;
  //   }
  // };

  // @HostListener('click', ['$event'])
  // click(event: MouseEvent) {
  //   // if(this.menue.which){
  //   //   this.opetation(this)[this.menue.which].click(event);
  //   // }
  //   //console.log('hahhh');
  // };

  @HostListener('window:resize', ['$event'])
  onResize(event){
    const svg = <HTMLElement>document.getElementsByClassName('paint')[0];
    this.paintMap.paintMapWidth = svg.offsetWidth;
    this.paintMap.paintMapHeight = svg.offsetHeight;
  };

  ngOnInit() {
    const svg = <HTMLElement>document.getElementsByClassName('paint')[0];
    this.paintMap.paintMapWidth = svg.offsetWidth;
    this.paintMap.paintMapHeight = svg.offsetHeight;
  };

  opetation(self) {
    return {
      createLine: {
        mouseMove(event: MouseEvent) {
          let currentPointerPoint = new POINT(event.clientX,event.clientY);
          if(self.lastPointerPoint){

            //如果这次的点和上次的点的距离小于临界值，则不执行任何操作
            if(POINT.distanceBetweenTwoPoints(currentPointerPoint,self.currentPointerPoint) < self.graphOption.sensitivity){
              return undefined;
            }

            self.currentPointerPoint = currentPointerPoint;
            let currentScreenPoint = self.graph.pointerPointToScreenPoint(currentPointerPoint);
            let lastScreenPoint = self.graph.pointerPointToScreenPoint(self.lastPointerPoint)
            self.tempLine.pointS = lastScreenPoint;
            // self.tempLine.pointS.y = lastScreenPoint.y;
            self.tempLine.pointE = currentScreenPoint;
            // self.tempLine.pointE.y = currentScreenPoint.y;
          }
          let currentPoint = self.graph.screenPointToModelPoint(currentPointerPoint);
          self.currentPoint.x = currentPoint.x;
          self.currentPoint.y = currentPoint.y;
        },
        click(event:MouseEvent) {
          let currentPointerPoint:POINT = new POINT(event.clientX,event.clientY);
          if(self.lastPointerPoint){
            self.graph.lines = new LINE(self.lastPointerPoint,currentPointerPoint);
            self.lastPointerPoint.x = currentPointerPoint.x;
            self.lastPointerPoint.y = currentPointerPoint.y;
            console.log(self.graph.__lines__)
          }else{
            self.lastPointerPoint = currentPointerPoint;
          }
        }
      },
    };
  };

  oclick(event:MouseEvent) {
    if(this.menue.which){
      this.opetation(this)[this.menue.which].click(event);
      console.log(event.clientX)
      console.log(this.graph.lines)
    }
  };

  omouseMove(event:MouseEvent){
    if(this.menue.which){
      this.opetation(this)[this.menue.which].mouseMove(event);
    }else{
      this.lastPointerPoint = undefined;
      this.tempLine = new LINE(new POINT(-100,-100),new POINT(-100,-100));
    }
  };

}
