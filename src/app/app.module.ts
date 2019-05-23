import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, ko_KR } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import ko from '@angular/common/locales/ko';
import { CommonLayoutModule } from './common-layout/common-layout.module';
import { CommonFuncModule } from './common/common-func.module';

import { BoardModule } from './cooperation/board/board.module';
import { CommunicationModule } from './cooperation/communication/communication.module';

registerLocaleData(ko);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN', headerName: "X-XSRF-TOKEN"}),
    NgZorroAntdModule,
    AppRoutingModule,
    CommonLayoutModule,
    CommonFuncModule,
    BoardModule,
    CommunicationModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: NZ_I18N, useValue: ko_KR
    },
    {
      provide: COMPOSITION_BUFFER_MODE,
      useValue: false
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
