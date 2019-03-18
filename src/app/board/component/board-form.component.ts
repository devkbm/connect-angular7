import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { BoardService } from '.././service/board.service';

import { ResponseObject } from '../../common/model/response-object';
import { Board } from '.././model/board';
import { BoardHierarchy } from '../model/board-hierarchy';
import { ResponseList } from 'src/app/common/model/response-list';

@Component({
  selector: 'app-board',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {

  boardForm: FormGroup;

  parentBoardItems: BoardHierarchy[];

  boardTypeList;

  constructor(private fb: FormBuilder,
              private boardService: BoardService) { }

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

    this.getboardHierarchy();
    this.getBoardTypeList();
  }

  getBoardTypeList() {
    this.boardService
        .getBoardTypeList()
        .subscribe(
          (model: ResponseObject<any>) => {
            if (model.data) {
              this.boardTypeList = model.data;
            } else {
              this.boardTypeList = null;
            }
          },
          (err) => {},
          () => {}
        )
  }

  getBoard() {
    this.boardService.getBoard(this.boardForm.get('pkBoard').value)
      .subscribe(
        (model: ResponseObject<Board>) => {
          if (model.data) {
            this.boardForm.patchValue(model.data);
          } else {
            this.boardForm.reset();
          }
        },
        (err) => {},
        () => {}
    );
  }

  private saveBoard() {

    this.boardService
      .saveBoard(this.boardForm.value)
      .subscribe(
        (model: ResponseObject<Board>) => {
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

  private deleteBoard() {
    this.boardService
      .deleteBoard(this.boardForm.value)
      .subscribe(
        (model: ResponseObject<Board>) => {
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

  getboardHierarchy() {
    this.boardService
      .getBoardHierarchy()
      .subscribe(
        (model: ResponseList<BoardHierarchy>) => {
            if ( model.total > 0 ) {
              this.parentBoardItems = model.data;
            } else {
              this.parentBoardItems = null;
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

}
