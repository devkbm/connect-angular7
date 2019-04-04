import { Component, OnInit, ViewChild } from '@angular/core';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { CommonCodeFormComponent } from './common-code-form.component';
import { CommonCodeTreeComponent } from './common-code-tree.component';

@Component({
  selector: 'app-common-code',
  templateUrl: './common-code.component.html',
  styleUrls: ['./common-code.component.css']
})
export class CommonCodeComponent implements OnInit {

    queryKey = 'programCode';
    queryValue = '';

    @ViewChild('commonCodeTree')
    tree: CommonCodeTreeComponent;

    @ViewChild('commonCodeForm')
    form: CommonCodeFormComponent;

    constructor() { }

    ngOnInit() {
        this.tree.getCommonCodeHierarchy();
    }

    public getCommonCodeTree(): void {
        this.tree.getCommonCodeHierarchy();
    }

    public initForm(): void {
        this.form.newForm();
    }

    public saveCommonCode(): void {
        this.form.submitCommonCode();
    }

    public deleteCommonCode(): void {
        this.form.deleteCommonCode();
    }

    public selectedItem(item): void {
        this.form.getCommonCode(item.id);
    }

}
