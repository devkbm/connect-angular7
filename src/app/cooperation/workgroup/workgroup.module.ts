import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonFuncModule } from '../../common/common-func.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../common/grid/renderer/button-renderer.component';

import { WorkGroupService } from './service/workgroup.service';
import { WorkgroupComponent } from './component/workgroup/workgroup.component';
import { WorkGroupFormComponent } from './component/workgroup/workgroup-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    NgZorroAntdModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    CKEditorModule
  ],
  declarations: [
    WorkgroupComponent,
    WorkGroupFormComponent
  ],
  providers: [
    WorkGroupService
  ],
  exports: [
    WorkgroupComponent
  ]
})
export class WorkgroupModule { }