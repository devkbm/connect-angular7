import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { BoardService } from '.././service/board.service';

import { ResponseObject } from '../../../common/model/response-object';
import { Article } from '.././model/article';
import { FormBase, FormType } from 'src/app/common/form/form-base';
import { UploadChangeParam, NzUploadComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
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
  imageUploadParam = {pgmId: 'board'};
  public Editor = ClassicEditor;
  //contents = new FormControl(null, {});

  textData;

  @ViewChild('upload') upload: NzUploadComponent;
  @ViewChild('ckEditor') ckEditor; //: CKEditorComponent;

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  fromControlSm = 24;

  //#endregion

  constructor(private fb: FormBuilder,
              private boardService: BoardService) { super(); }

  ngOnInit() {
    this.newForm(null);
  }

  //#region public methods

  public newForm(fkBoard): void {
    this.formType = FormType.NEW;

    this.fileList = [];
    this.textData = null;
    // console.log(this.ckEditor.editorInstance);
    this.ckEditor.writeValue(null);

    this.articleForm = this.fb.group({
      fkBoard       : [ fkBoard, [ Validators.required ] ], //new FormControl(fkBoard, {validators: Validators.required}),
      pkArticle     : [ null, [ Validators.required ] ],
      ppkArticle    : [ null],
      title         : [ null],
      contents      :  new FormControl(null, {}),
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
      contents      :  new FormControl(null, {}),
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

            this.ckEditor.writeValue(model.data.contents);
          } else {
            this.newForm(null);
          }
        },
        (err) => {},
        () => {}
    );
  }

  public deleteArticle(id): void {
    console.log(id);
    this.boardService.deleteArticle(id)
      .subscribe(
        (model: ResponseObject<Article>) => {
            this.formDeleted.emit(this.articleForm.getRawValue());
        },
        (err) => {},
        () => {}
    );
  }

  fileDown() {
    // this.boardService.downloadFile(this.article.attachFile[0].fileId, this.article.attachFile[0].fileName);
  }

  fileUploadChange(param: UploadChangeParam) {
    if (param.type === 'success') {
      // this.fileList = param.file.response;
      this.fileList.push(param.file.response[0]);
    }
  }

  public textChange( {editor}: ChangeEvent) {
    const data = editor.getData();
    console.log(editor);
    this.articleForm.get('contents').setValue(data);
  }

  public closeForm() {
    this.formClosed.emit(this.articleForm.getRawValue());
  }

  //#endregion

  //#region private method

  private saveBoard(): void {

    const attachFileIdList = [];

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
  //#endregion
}
