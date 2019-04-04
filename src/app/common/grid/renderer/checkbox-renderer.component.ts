import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-checkbox-renderer',
  template: `
    <label nz-checkbox [(ngModel)]="value" [nzDisabled]="disabled" (click)="onClick($event)" (change)="onChange($event)">
      {{label}}
    </label>
  `,
  styles: []
})
export class CheckboxRendererComponent implements ICellRendererAngularComp {

  params;
  disabled;
  label: string;
  value;

  agInit(params: ICellRendererParams): void {
    this.params = params;

    this.label = this.params.label || null;
    this.disabled = this.params.disabled;
    this.value = params.data[this.params.colDef.field];
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

  onChange(event) {
    this.params.data[this.params.colDef.field] = this.value;
  }


}
