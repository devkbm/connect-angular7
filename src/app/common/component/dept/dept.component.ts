import { Component, OnInit, ViewChild } from '@angular/core';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { DeptTreeComponent } from './dept-tree.component';
import { DeptFormComponent } from './dept-form.component';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent implements OnInit {

    queryKey = 'programCode';
    queryValue = '';

    @ViewChild('deptTree')
    tree: DeptTreeComponent;

    @ViewChild('deptForm')
    form: DeptFormComponent;

    constructor() { }

    ngOnInit() {
        this.getDeptTree();
    }

    public getDeptTree(): void {
        this.tree.getDeptHierarchy();
    }

    public initForm(): void {
        this.form.newForm();
    }

    public saveCommonCode(): void {
        this.form.submitDept();
    }

    public deleteCommonCode(): void {
        this.form.deleteDept();
    }

    public selectedItem(item): void {
        this.form.getDept(item.deptCode);
    }

}
