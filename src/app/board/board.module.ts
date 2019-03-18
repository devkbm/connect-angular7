import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonFuncModule } from '../common/common-func.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { BoardService } from './service/board.service';

import { BoardTreeComponent } from './component/board-tree.component';
import { BoardFormComponent } from './component/board-form.component';
import { ArticleFormComponent } from './component/article-form.component';
import { BoardComponent } from './component/board.component';
import { ArticleGridComponent } from './component/article-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../common/grid/renderer/button-renderer.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    NgZorroAntdModule,
    AgGridModule.withComponents([ButtonRendererComponent])
  ],
  declarations: [
    BoardTreeComponent,
    BoardFormComponent,
    ArticleFormComponent,
    ArticleGridComponent,
    BoardComponent
  ],
  providers: [
    BoardService
  ],
  exports: [
    BoardFormComponent,
    BoardTreeComponent
  ]
})
export class BoardModule { }
