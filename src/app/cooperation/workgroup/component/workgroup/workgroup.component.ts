import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkScheduleFormComponent } from './work-schedule-form.component';

@Component({
  selector: 'app-workgroup',
  templateUrl: './workgroup.component.html',
  styleUrls: ['./workgroup.component.css']
})
export class WorkgroupComponent implements OnInit {

  scheduleDrawerVisible = false;

  @ViewChild('workScheduleForm') workScheduleForm: WorkScheduleFormComponent;

  constructor() { }

  ngOnInit() {
  }

  closeDrawer() {
    this.scheduleDrawerVisible = false;
  }

  openDrawer() {
    this.scheduleDrawerVisible = true;
  }

  itemSelect(id) {
    console.log(id);
    this.workScheduleForm.getWorkGroupSchedule(id);
    this.openDrawer();
  }

}
