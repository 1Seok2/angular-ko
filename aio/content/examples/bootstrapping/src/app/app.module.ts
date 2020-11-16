// #docplaster
// #docregion whole-ngmodule

// imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
// #docregion directive-import
import { ItemDirective } from './item.directive';
// #enddocregion directive-import


// @NgModule 데코레이터에 메타데이터를 지정합니다.
@NgModule({
// #docregion declarations
  declarations: [
    AppComponent,
    ItemDirective
  ],
  // #enddocregion declarations
  // #docregion imports
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  // #enddocregion imports
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// #enddocregion whole-ngmodule
