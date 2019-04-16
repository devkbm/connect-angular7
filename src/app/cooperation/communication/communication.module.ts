import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonFuncModule } from '../../common/common-func.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../common/grid/renderer/button-renderer.component';
import { TeamService } from './service/team.service';
import { TeamFormComponent } from './component/team-form.component';
import { TeamGridComponent } from './component/team-grid.component';
import { TeamComponent } from './component/team.component';

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
    TeamFormComponent,
    TeamGridComponent,
    TeamComponent
  ],
  providers: [
    TeamService
  ],
  exports: [
    TeamComponent,
    TeamFormComponent
  ]
})
export class CommunicationModule { }
