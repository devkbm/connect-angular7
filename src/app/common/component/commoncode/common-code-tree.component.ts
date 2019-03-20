import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ResponseList } from '../../../common/model/response-list';
import { CommonCodeHierarchy } from '../../model/common-code-hierarchy';

import { CommonCodeService } from '../../service/common-code.service';

import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';


@Component({
  selector: 'app-common-code-tree',
  templateUrl: './common-code-tree.component.html',
  styles: ['']
})
export class CommonCodeTreeComponent implements OnInit {

  @ViewChild('treeComponent') treeComponent;
  
  nodeItems: CommonCodeHierarchy[];

  @Output()
  itemSelected = new EventEmitter();

  constructor(private commonCodeService: CommonCodeService) { }

  ngOnInit() {
    console.log('CommonCodeTreeComponent init');
  }

  getCommonCodeHierarchy() {
    this.commonCodeService
        .getCommonCodeHierarchy()
        .subscribe(
            (model: ResponseList<CommonCodeHierarchy>) => {
                if ( model.total > 0 ) {
                this.nodeItems = model.data;
                } else {
                this.nodeItems = null;
                }            
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
     const node = event.nodes[0].origin;
    // console.log(event, event.selectedKeys, event.keys, event.nodes);
     console.log(node);
    //console.log(event.nodes[0]);

    this.itemSelected.emit(node.key);
  }

}
