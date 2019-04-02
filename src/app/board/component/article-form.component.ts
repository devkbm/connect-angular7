import { Component, OnInit, ViewChild } from '@angular/core';
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
import { UploadChangeParam, NzUploadComponent } from 'ng-zorro-antd';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styles: ['']
})
export class ArticleFormComponent extends FormBase implements OnInit {

  //#region fields
  fileList = [
    /*{
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },

    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    },

    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png'
    },
    { 
      uid: "NiyNWPs6R-KYESIP58T46A==337768679545200",
      name:"20190402_정재원_2.PNG",
      status:"done",
      response:"success",
      url:"http://localhost:8090/common/file/NiyNWPs6R-KYESIP58T46A==337768679545200"
    }*/
  ];

  articleForm: FormGroup;
  imageUploadParam;

  @ViewChild('upload')
  upload: NzUploadComponent;

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 4;
  fromControlSm = 20;

  //#endregion

  constructor(private fb: FormBuilder,
              private boardService: BoardService) { super(); }

  ngOnInit() {
    this.imageUploadParam = {pgmId: 'board'};
    this.newForm();
  }

  //#region methods

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
            this.fileList = model.data.fileList;
          } else {
            this.newForm();
          }
        },
        (err) => {},
        () => {}
    );
  }

  private saveBoard() {

    let attachFileIdList = [];

    // tslint:disable-next-line: forin
    for (const val in this.fileList) {
      // console.log(this.fileList[val].response[0].uid);
      attachFileIdList.push(String(this.fileList[val].uid));
    }
    this.articleForm.get('attachFile').setValue(attachFileIdList);

    this.boardService
      .saveArticleJson(this.articleForm.getRawValue())
      .subscribe(
        (model: ResponseObject<Article>) => {
          console.log(model);
          this.formSaved.emit(this.articleForm.getRawValue());
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
    if (param.type === 'success') {
      //this.fileList = param.file.response;
      this.fileList.push(param.file.response[0]);
      console.log(param.file.response);
      //this.fileList.push(param.file.response[0]);
      //this.fileList = param.fileList;

      //console.log(param);
      //console.log(this.fileList);
      //console.log(param.file.response);
    }
  }

  //#endregion
}
