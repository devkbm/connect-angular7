import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamGridComponent } from './team-grid.component';
import { TeamFormComponent } from './team-form.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  drawerVisible = false;

  queryKey = 'teamId';
  queryValue = '';

  @ViewChild('teamGrid')
  grid: TeamGridComponent;

  @ViewChild('teamForm')
  form: TeamFormComponent;

  constructor() { }

  ngOnInit() {
    this.getTeamList();
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  openDrawer() {
    this.drawerVisible = true;
  }

  selectedItem(item) {
    // this.form.authorityForm.patchValue(item);
  }

  editDrawOpen(item) {
    this.form.getTeam(item.teamId);

    this.openDrawer();
  }

  getTeamList() {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getTeamList(params);
  }

  deleteTeam() {
    this.form.deleteTeam(this.form.form.get('teamId').value);
  }

  initForm() {
    this.form.newForm();
    this.openDrawer();
  }

}
