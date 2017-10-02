import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenueComponent } from './menue/menue.component';
import { PaintComponent } from './paint/paint.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  declarations: [
    AppComponent,
    MenueComponent,
    PaintComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    MenueComponent,
    PaintComponent,
    TreeComponent
  ]
})
export class AppModule { }
