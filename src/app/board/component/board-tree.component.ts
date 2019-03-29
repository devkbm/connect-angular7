import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BoardService } from '../service/board.service';
import { ResponseList } from '../../common/model/response-list';
import { BoardHierarchy } from '../model/board-hierarchy';

import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';

@Component({
  selector: 'app-board-tree',
  templateUrl: './board-tree.component.html',
  styles: ['']
})
export class BoardTreeComponent implements OnInit {

  @ViewChild('treeCom') treeCom;

  boardItems: BoardHierarchy[];

  @Output()
  itemSelected = new EventEmitter();

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    console.log('BoardTreeComponent init');
  }

  getboardHierarchy() {
    this.boardService
      .getBoardHierarchy()
      .subscribe(
        (model: ResponseList<BoardHierarchy>) => {
            if ( model.total > 0 ) {
              this.boardItems = model.data;
            } else {
              this.boardItems = null;
            }

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

  nzClick(event: NzFormatEmitEvent): void {
    const node = event.node.origin;    
     
    this.itemSelected.emit(node.key);
  }

}
