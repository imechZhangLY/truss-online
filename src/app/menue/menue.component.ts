import { Component, OnInit } from '@angular/core';
import { MENUE, BUTTON } from 'app/menue'

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.css']
})
export class MenueComponent implements OnInit {
  menue: BUTTON[] = MENUE;
  constructor() { }

  ngOnInit() {
  }

}
