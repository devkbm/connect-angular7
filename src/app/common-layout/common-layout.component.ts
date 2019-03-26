import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';

import { AppAlarmService } from '../common/service/app-alarm.service';
import { MenuService } from '../common/service/menu.service';

import { MenuGroup } from '../common/model/menu-group';
import { MenuHierarchy } from '../common/model/menu-hierarchy';
import { ResponseList } from '../common/model/response-list';


@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css']
})
export class CommonLayoutComponent implements OnInit {

  isCollapsed: Boolean = false;
  triggerTemplate: TemplateRef<void> | null = null;
  selectedValue: string;
  message: string;
  menuGroupCode: string;

  menuGroupList: MenuGroup[];
  menuItems: MenuHierarchy[];

  @ViewChild('treeCom') treeCom;

  constructor(private appAlarmService: AppAlarmService,
              private menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.appAlarmService.currentMessage.subscribe(message => this.message = message);

    this.setInitMenuGroup();
  }

  /**
   * 초기 메뉴 그룹을 설정한다.
   */
  private setInitMenuGroup(): void {
    const stringMenuGroupList = sessionStorage.getItem('menuGroupList');
    const selectedMenuGroup   = sessionStorage.getItem('selectedMenuGroup');

    this.menuGroupList = JSON.parse(stringMenuGroupList);

    if ( selectedMenuGroup != null ) {
      this.selectedValue = selectedMenuGroup;
    } else {
      this.selectedValue = this.menuGroupList[0].menuGroupCode;
    }

    if (this.selectedValue != null) {
      this.selectMenuGroup(this.selectedValue);
    }
  }

  sendMen(mess) {
    this.menuGroupCode = mess;
  }

  selectMenuGroup(value: string): void {

    sessionStorage.setItem('selectedMenuGroup', value);

    this.menuService
      .getMenuHierarchy(value)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          if ( model.total > 0 ) {
            this.menuItems = model.data;
          } else {
            this.menuItems = null;
          }

          const seledtedMenu = sessionStorage.getItem('selectedMenu');
          // console.log(this.treeCom);
          // this.treeCom.nzSelectedKeys = [seledtedMenu];
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('메뉴 조회 완료');
        }
      );
  }

  selectMenu(event: NzFormatEmitEvent): void {
    // console.log(event, event.selectedKeys, event.keys, event.nodes);
    // console.log(event.nodes[0].origin);
    const node = event.nodes[0].origin;
    sessionStorage.setItem('selectedMenu', node.key);

    this.router.navigate([node.url]);
  }

  selectMenuItem(url: string): void {
    sessionStorage.setItem('selectedMenu', url);
    // '/home/' + 
    this.router.navigate([url]);
  }

}
