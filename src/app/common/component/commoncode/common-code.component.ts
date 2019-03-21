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
    
    queryKey: string = 'programCode';
    queryValue: string = '';    
    
    @ViewChild('commonCodeTree')
    tree: CommonCodeTreeComponent;

    @ViewChild('commonCodeForm')
    form: CommonCodeFormComponent;

    constructor() { }

    ngOnInit() {
        this.tree.getCommonCodeHierarchy();
    }
    
    getCommonCodeTree() {         
        this.tree.getCommonCodeHierarchy();
    }

    initForm() {

    }

    saveCommonCode() {
        this.form.submitCommonCode();
    }

    deleteCommonCode() {
        this.form.deleteCommonCode();
    }

    selectedItem(item) {
        console.log(item.id);        
        this.form.getCommonCode(item.id);
        //this.form.getCommonCode(item.id);
    }  
    
}
