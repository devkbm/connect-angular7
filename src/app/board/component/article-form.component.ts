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

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styles: ['']
})
export class ArticleFormComponent implements OnInit {

  article: Article;

  articleForm: FormGroup;

  constructor(private fb: FormBuilder,
              private boardService: BoardService) { }

  ngOnInit() {
    this.article = new Article();

  this.articleForm = this.fb.group({
      fkBoard       : [ null, [ Validators.required ] ],
      pkArticle     : [ null, [ Validators.required ] ],
      ppkArticle    : [ null],
      title         : [ null],
      contents      : [ null],
      attachFile    : [ null]
    });
  }

  getArticle() {
    this.boardService.getArticle(this.articleForm.get('pkArticle').value)
      .subscribe(
        (model: ResponseObject<Article>) => {
          if (model.data) {
            this.articleForm.patchValue(model.data);
          } else {
            this.articleForm.reset();
          }
        },
        (err) => {},
        () => {}
    );
  }

  private saveBoard() {

    this.boardService
      .saveArticle(this.articleForm.value)
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

  onFileChange(files: FileList) {
    if (files && files.length > 0) {
      // For Preview
      const file = files[0];
      const reader = new FileReader();
      this.article.file = file;

      console.log(files[0]);

      /* 브라우저는 보안 문제로 인해 파일 경로의 참조를 허용하지 않는다.
        따라서 파일 경로를 img 태그에 바인딩할 수 없다.
        FileReader.readAsDataURL 메소드를 사용하여 이미지 파일을 읽어
        base64 인코딩된 스트링 데이터를 취득한 후, img 태그에 바인딩한다. */
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.imageSrc = reader.result;
      };

      /* reactive form에서 input[type="file"]을 지원하지 않는다.
        즉 파일 선택 시에 값이 폼컨트롤에 set되지 않는다
        https://github.com/angular/angular.io/issues/3466
        form validation을 위해 file.name을 폼컨트롤에 set한다. */
      // this.avatar.setValue(file.name);
    }
  }

  fileDown() {
    this.boardService.downloadFile(this.article.attachFile[0].fileId, this.article.attachFile[0].fileName);
  }

}
