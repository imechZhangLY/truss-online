import { Component, OnInit } from '@angular/core';
import { MENUE, BUTTON } from 'app/menue';
import { TrussService } from 'app/truss.service';
import { LINE, POINT } from 'app/geometry'

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.css'],
  providers: [TrussService]
})
export class MenueComponent implements OnInit {
  menue = MENUE;
  tempLine:LINE;
  currentPoint:POINT;
  constructor(private trussService:TrussService) { 
    this.currentPoint = trussService.getCurrentPoint()
  }

  ngOnInit() {
    console.log(MENUE)
  }

}
