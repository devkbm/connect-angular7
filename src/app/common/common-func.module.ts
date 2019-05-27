import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { NgZorroAntdModule, NZ_I18N, en_US, ko_KR } from 'ng-zorro-antd';

import { AppRoutingModule } from '../app-routing.module';

import { LoginService } from './service/login.service';
import { UserService } from './service/user.service';

import { LoginComponent } from './component/login/login.component';
import { MenuFormComponent } from './component/menu/menu-form.component';
import { MenuGroupFormComponent } from './component/menu/menu-group-form.component';
import { AuthorityFormComponent } from './component/authority/authority-form.component';
import { AuthorityGridComponent } from './component/authority/authority-grid.component';
import { AuthorityComponent } from './component/authority/authority.component';
import { UserGridComponent } from './component/user/user-grid.component';
import { UserFormComponent } from './component/user/user-form.component';
import { UserComponent } from './component/user/user.component';
import { ProgramFormComponent } from './component/program/program-form.component';
import { ProgramGridComponent } from './component/program/program-grid.component';
import { ProgramComponent } from './component/program/program.component';
import { MenuGroupGridComponent } from './component/menu/menu-group-grid.component';
import { MenuGridComponent } from './component/menu/menu-grid.component';
import { MenuComponent } from './component/menu/menu.component';
import { TermComponent } from './component/terms/term.component';
import { TermGridComponent } from './component/terms/term-grid.component';
import { TermFormComponent } from './component/terms/term-form.component';
import { CommonCodeFormComponent } from './component/commoncode/common-code-form.component';
import { CommonCodeService } from './service/common-code.service';
import { CommonCodeGridComponent } from './component/commoncode/common-code-grid.component';
import { CommonCodeComponent } from './component/commoncode/common-code.component';
import { CommonCodeTreeComponent } from './component/commoncode/common-code-tree.component';

import { UserDuplicationValidatorDirective } from './validator/user-duplication-validator.directive';
import { ButtonRendererComponent } from './grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from './grid/renderer/checkbox-renderer.component';
import { DeptFormComponent } from './component/dept/dept-form.component';
import { DeptTreeComponent } from './component/dept/dept-tree.component';
import { DeptComponent } from './component/dept/dept.component';
import { MenuService } from './service/menu.service';
import { DeptService } from './service/dept.service';
import { CustomHttpInterceptor } from './interceptor/custom-http-interceptor';
import { ResponseList } from './model/response-list';
import { ResponseObject } from './model/response-object';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    NgZorroAntdModule,
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent]),
    AppRoutingModule
  ],
  declarations: [
    UserDuplicationValidatorDirective,
    LoginComponent,
    ButtonRendererComponent,
    CheckboxRendererComponent,
    UserFormComponent,
    UserGridComponent,
    UserComponent,
    MenuFormComponent,
    MenuGridComponent,
    MenuGroupFormComponent,
    MenuGroupGridComponent,
    MenuComponent,
    ProgramFormComponent,
    ProgramGridComponent,
    ProgramComponent,
    AuthorityFormComponent,
    AuthorityGridComponent,
    AuthorityComponent,
    TermGridComponent,
    TermFormComponent,
    TermComponent,
    CommonCodeFormComponent,
    CommonCodeGridComponent,
    CommonCodeTreeComponent,
    CommonCodeComponent,
    DeptFormComponent,
    DeptTreeComponent,
    DeptComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    LoginService,
    UserService,
    CommonCodeService,
    MenuService,
    DeptService
  ],
  exports: [    
    LoginComponent,
    UserFormComponent,
    UserGridComponent,
    UserComponent,
    MenuFormComponent,
    MenuGroupFormComponent,
    ProgramFormComponent,
    ProgramGridComponent,
    ProgramComponent,
    AuthorityFormComponent,
    AuthorityGridComponent,
    AuthorityComponent,
    TermComponent,
    CommonCodeFormComponent,
    CommonCodeGridComponent,
    CommonCodeTreeComponent,
    CommonCodeComponent
  ]
})
export class CommonFuncModule { }
