import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, ko_KR } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import ko from '@angular/common/locales/ko';
import { CommonLayoutModule } from './common-layout/common-layout.module';
import { CommonFuncModule } from './common/common-func.module';
import { BoardModule } from './board/board.module';

registerLocaleData(ko);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    CommonLayoutModule,
    CommonFuncModule,
    BoardModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [{ provide: NZ_I18N, useValue: ko_KR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
