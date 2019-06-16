import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workgroup',
  templateUrl: './workgroup.component.html',
  styleUrls: ['./workgroup.component.css']
})
export class WorkgroupComponent implements OnInit {

  scheduleDrawerVisible = false;

  constructor() { }

  ngOnInit() {
  }

  closeDrawer() {
    this.scheduleDrawerVisible = false;
  }

  openDrawer() {
    this.scheduleDrawerVisible = true;
  }

}
