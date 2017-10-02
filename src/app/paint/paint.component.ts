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
  currentScreenPoint: POINT;
  lastScreenPoint: POINT;
  currentPoint: POINT;
  currentIndex: number;
  lastIndex: number;
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
    this.currentScreenPoint = new POINT(0,0);
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
          if(self.lastScreenPoint){
            let currentScreenPoint = self.graph.pointerPointToScreenPoint(currentPointerPoint);
            //如果这次的点和上次的点的距离小于临界值，则不执行任何操作
            if(POINT.distanceBetweenTwoPoints(currentScreenPoint, self.currentScreenPoint) < self.graphOption.sensitivity){
              return undefined;
            }
            self.currentIndex = undefined;
            let index = self.graph.captureEndPoint(currentScreenPoint);
            console.log(index);
            if(index !== undefined){
              self.currentIndex = index;
              console.log(index);
              currentScreenPoint.x = self.graph.points[index].x;
              currentScreenPoint.y = self.graph.points[index].y;           
            }
            let currentPoint = self.graph.screenPointToModelPoint(currentScreenPoint);
            self.currentPoint.x = currentPoint.x;
            self.currentPoint.y = currentPoint.y;
            self.currentScreenPoint = currentScreenPoint;
            self.tempLine.pointS = self.lastScreenPoint;
            // self.tempLine.pointS.y = lastScreenPoint.y;
            self.tempLine.pointE = currentScreenPoint;
            // self.tempLine.pointE.y = currentScreenPoint.y;
          }
        },
        click(event:MouseEvent) {
          let currentPointerPoint = new POINT(event.clientX,event.clientY);
          let currentScreenPoint = self.graph.pointerPointToScreenPoint(currentPointerPoint);
          let currentPoint = self.graph.screenPointToModelPoint(currentScreenPoint);
          if(self.lastScreenPoint){
            if(self.currentIndex){
              self.graph.lines = [self.lastIndex, self.currentIndex];
              self.lastIndex = self.currentIndex;
            }else{
              self.graph.points = currentPoint;
              self.graph.lines = [self.lastIndex, self.graph.pointNumber];
              self.lastIndex = self.graph.pointNumber;
            };
            self.lastScreenPoint = self.currentScreenPoint;
          }else{
            self.graph.points = currentPoint;
            self.lastIndex = self.graph.pointNumber;
            self.lastScreenPoint = currentScreenPoint;
          }
        }
      },
    };
  };

  oclick(event:MouseEvent) {
    if(this.menue.which){
      this.opetation(this)[this.menue.which].click(event);
    }
  };

  omouseMove(event:MouseEvent){
    if(this.menue.which){
      this.opetation(this)[this.menue.which].mouseMove(event);
    }else{
      this.lastScreenPoint = undefined;
      this.tempLine = new LINE(new POINT(-100,-100),new POINT(-100,-100));
    }
  };

}
