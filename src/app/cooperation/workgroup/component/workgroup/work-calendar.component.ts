import { Component, OnInit, ViewChild } from '@angular/core';

import { ResponseList } from '../../../../common/model/response-list';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroupSchedule } from '../../model/workgroup-schedule';

import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
selector: 'app-work-calendar',
templateUrl: './work-calendar.component.html',
styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

    calEvent = [
        { title: 'event 1', start: '2019-06-06T14:13:29Z' }
    ];

    calendarPlugins = [dayGridPlugin];

    constructor(private workGroupService: WorkGroupService) { 
        // this.getScheduleList();
    }

    ngOnInit() {
        this.getScheduleList();
    }

    //#region public methods

    public getScheduleList(): void {
        const param = {
            fkWorkGroup : 1,
            queryYm: '2019-02-07T00:00:00Z'
        };

        this.workGroupService.getWorkScheduleList(param)
        .subscribe(
            (model: ResponseList<WorkGroupSchedule>) => {
                if (model.data) {
                    this.calEvent = model.data;
                }
            },
            (err) => {},
            () => {}
        );
    }

    //#endregion

}
