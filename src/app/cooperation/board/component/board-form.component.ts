import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { BoardService } from '.././service/board.service';

import { ResponseObject } from '../../../common/model/response-object';
import { Board } from '.././model/board';
import { BoardHierarchy } from '../model/board-hierarchy';
import { ResponseList } from '../../../common/model/response-list';
import { FormBase, FormType } from 'src/app/common/form/form-base';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent extends FormBase implements OnInit {

  boardForm: FormGroup;

  parentBoardItems: BoardHierarchy[] = [];

  boardTypeList;

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 4;
  formControlSm = 20;

  constructor(private fb: FormBuilder,
              private boardService: BoardService) {
    super();

    this.getboardHierarchy();
    this.getBoardTypeList();
  }

  ngOnInit() {

    this.boardForm = this.fb.group({
      pkBoard         : [ null ],
      ppkBoard        : [ null ],
      boardName       : [ null, [ Validators.required ] ],
      boardType       : [ null, [ Validators.required ] ],
      boardDescription: [ null ],
      fromDate        : [ new Date() ],
      toDate          : [ new Date(9999, 11, 31) ]
    });

  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.boardForm = this.fb.group({
      pkBoard         : [ null ],
      ppkBoard        : [ null ],
      boardName       : [ null, [ Validators.required ] ],
      boardType       : [ null, [ Validators.required ] ],
      boardDescription: [ null ],
      fromDate        : [ new Date() ],
      toDate          : [ new Date(9999, 11, 31) ]
    });
  }

  public modifyForm(formData: Board): void {
    this.formType = FormType.MODIFY;

    this.boardForm = this.fb.group({
      pkBoard         : new FormControl({value: null, disabled: true}, {validators: Validators.required}),
      ppkBoard        : [ null ],
      boardName       : [ null, [ Validators.required ] ],
      boardType       : [ null, [ Validators.required ] ],
      boardDescription: [ null ],
      fromDate        : [ new Date() ],
      toDate          : [ new Date(9999, 11, 31) ]
    });

    this.boardForm.patchValue(formData);
  }

  public getBoardTypeList(): void {
    this.boardService
        .getBoardTypeList()
        .subscribe(
          (model: ResponseObject<any>) => {
            if (model.data) {
              this.boardTypeList = model.data;
            } else {
              this.boardTypeList = [];
            }
          },
          (err) => {},
          () => {}
        );
  }

  public getBoard(id: string): void {
    this.boardService.getBoard(id)
      .subscribe(
        (model: ResponseObject<Board>) => {
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

  public saveBoard(): void {

    this.boardService
      .saveBoard(this.boardForm.getRawValue())
      .subscribe(
        (model: ResponseObject<Board>) => {
          console.log(model);
          this.formSaved.emit(this.boardForm.getRawValue());
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  public deleteBoard(): void {
    this.boardService
      .deleteBoard(this.boardForm.getRawValue())
      .subscribe(
        (model: ResponseObject<Board>) => {
          console.log(model);
          this.formDeleted.emit(this.boardForm.getRawValue());
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  public getboardHierarchy(): void {
    this.boardService
      .getBoardHierarchy()
      .subscribe(
        (model: ResponseList<BoardHierarchy>) => {
            if ( model.total > 0 ) {
              this.parentBoardItems = model.data;
            } else {
              this.parentBoardItems = [];
            }
            //this.appAlarmService.changeMessage(model.message);
            // title 노드 텍스트
            // key   데이터 키
            // isLeaf 마지막 노드 여부
            // checked 체크 여부
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  public closeForm() {
    this.formClosed.emit(this.boardForm.getRawValue());
  }

}
