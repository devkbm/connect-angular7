import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button nz-button nzSize='small' (click)="onClick($event)">
      <i nz-icon [type]="iconType"></i>
      {{label}}
    </button>
  `,
  styles: []
})
export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;
  iconType: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
    this.iconType = this.params.iconType || null;
  }

  refresh(params: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
      };

      this.params.onClick(params);
    }
  }


}
