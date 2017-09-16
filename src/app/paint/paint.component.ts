import { Component, OnInit, AfterViewInit} from '@angular/core';
import { POINT, LINE, COORDINATE} from 'app/geometry'

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {
  height: number;
  width: number;
  coordinate: COORDINATE;
  constructor() {
    this.height = this.getHeight()
    this.width = this.getWidth()

    let point1: POINT = new POINT(this.width - 150,150);
    let point2: POINT = new POINT(this.width - 70,150);
    let point3: POINT = new POINT(this.width - 150,70);

    this.coordinate = new COORDINATE(point1,point2,point3);
    console.log(this.coordinate);
   }

  getHeight():number {
    let result:number;
    result = window.innerHeight-60;
    console.log(window.innerHeight);
    return result;
  }
  getWidth() {
    let result;
    result = Math.floor(0.8*window.innerWidth)
    return result;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(document.getElementsByClassName('paint')[0]);
  }

}
