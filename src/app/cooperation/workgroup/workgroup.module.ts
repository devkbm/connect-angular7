import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonFuncModule } from '../../common/common-func.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../common/grid/renderer/button-renderer.component';



import { WorkGroupService } from './service/workgroup.service';
import { WorkgroupComponent } from './component/workgroup/workgroup.component';
import { WorkGroupFormComponent } from './component/workgroup/workgroup-form.component';
import { WorkScheduleFormComponent } from './component/workgroup/work-schedule-form.component';
import { WorkCalendarComponent } from './component/workgroup/work-calendar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    NgZorroAntdModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    CKEditorModule,
    FullCalendarModule,
    ColorPickerModule
  ],
  declarations: [
    WorkgroupComponent,
    WorkGroupFormComponent,
    WorkScheduleFormComponent,
    WorkCalendarComponent
  ],
  providers: [
    DatePipe,
    WorkGroupService
  ],
  exports: [
    WorkgroupComponent
  ]
})
export class WorkgroupModule { }
