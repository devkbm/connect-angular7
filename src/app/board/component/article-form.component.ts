import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { BoardService } from '.././service/board.service';

import { ResponseObject } from '../../common/model/response-object';
import { Article } from '.././model/article';
import { FormBase, FormType } from 'src/app/common/form/form-base';
import { UploadChangeParam } from 'ng-zorro-antd';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styles: ['']
})
export class ArticleFormComponent extends FormBase implements OnInit {

  fileList = Array<any>();

  articleForm: FormGroup;
  imageUploadParam;
  
  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 4;
  fromControlSm = 20;

  constructor(private fb: FormBuilder,
              private boardService: BoardService) { super(); }

  ngOnInit() {
    this.imageUploadParam = {pgmId: 'board'};
    this.newForm();  
  }

  public newForm(): void {
    this.formType = FormType.NEW;
    this.articleForm = this.fb.group({
      fkBoard       : [ null, [ Validators.required ] ],
      pkArticle     : [ null, [ Validators.required ] ],
      ppkArticle    : [ null],
      title         : [ null],
      contents      : [ null],
      attachFile    : [ null]
    });
  }

  public modifyForm(formData: Article): void {
    this.formType = FormType.MODIFY;
    this.articleForm = this.fb.group({
      fkBoard       : [ null, [ Validators.required ] ],
      pkArticle     : [ null, [ Validators.required ] ],
      ppkArticle    : [ null],
      title         : [ null],
      contents      : [ null],
      attachFile    : [ null]
    });

    this.articleForm.patchValue(formData);
  }

  public getArticle(id): void {
    this.boardService.getArticle(id)
      .subscribe(
        (model: ResponseObject<Article>) => {
          if (model.data) {      
            this.modifyForm(model.data);            
          } else {
            this.newForm();
          }
        },
        (err) => {},
        () => {}
    );
  }

  private saveBoard() {

    //console.log(this.fileList);
    //console.log(this.fileList[0].response[0].uid);
    let fileList = new Array<string>();
    for (let val in this.fileList) {
      console.log(this.fileList[val].response[0].uid);
      fileList.push(this.fileList[val].response[0].uid);
    }
    
    this.articleForm.get('attachFile').setValue(fileList);
    this.boardService
      .saveArticleJson(this.articleForm.getRawValue())
      .subscribe(
        (model: ResponseObject<Article>) => {
          console.log(model);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }  

  fileDown() {
    //this.boardService.downloadFile(this.article.attachFile[0].fileId, this.article.attachFile[0].fileName);
  }

  fileUploadChange(param: UploadChangeParam) {
    if (param.type == 'success') {      
      //this.fileList = param.file.response;
      //this.fileList = param.fileList;
      
      console.log(param);
      console.log(this.fileList);
      console.log(param.file.response);

    } 
  }

}
