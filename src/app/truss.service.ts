import { Injectable } from '@angular/core';
import { TRUSSTREE,TEMPLINE } from './truss-tree';
import { LINE, POINT } from './geometry';
import { PAINTMAP, COORDINATE, GRAPH, CURRENTPOINT, GRAPHOPTION } from './paintmap'
import { MENUE } from './menue'

@Injectable()
export class TrussService {

  constructor() { }
  getTrussTree(): LINE[] {
    return TRUSSTREE;
  };
  getTempLine(): LINE {
    return TEMPLINE;
  };
  getPaintMap() {
    return PAINTMAP;
  };
  getCoorDinate() {
    return COORDINATE;
  };
  getGraph() {
    return GRAPH;
  };
  getCurrentPoint():POINT {
    return CURRENTPOINT;
  }
  getMenue() {
    return MENUE;
  }
  getGraphOption() {
    return GRAPHOPTION;
  }
}
