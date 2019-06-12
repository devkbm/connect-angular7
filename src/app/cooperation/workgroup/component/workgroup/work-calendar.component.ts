import { Component, OnInit, ViewChild } from '@angular/core';

import { ResponseList } from '../../../../common/model/response-list';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroupSchedule } from '../../model/workgroup-schedule';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatePipe } from '@angular/common';
import { FullCalendarComponent } from '@fullcalendar/angular';


@Component({
selector: 'app-work-calendar',
templateUrl: './work-calendar.component.html',
styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

    calEvent = [
        { title: 'event 1', start: '2019-06-06T14:13:29Z' }
    ];

    selectedDate: Date;
    toDate: Date;

    calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
    calendarHeader = {
        left: 'prev,next today',
        center: 'title',
        //right: ''
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    };

    @ViewChild('calendar') calendarComponent: FullCalendarComponent;

    constructor(private workGroupService: WorkGroupService, private datePipe: DatePipe) {
        // this.getScheduleList();
    }

    ngOnInit() {
        this.getScheduleList();
    }

    onChange(result: Date): void {
        console.log('onChange: ', result.toLocaleString());
        console.log(this.datePipe.transform(result, 'yyyyMM'));
        this.getScheduleList();
    }

    //#region public methods

    public getScheduleList(): void {
        const param = {
            fkWorkGroup : 1,
            fromDate: this.datePipe.transform(this.selectedDate, 'yyyyMMdd'),
            toDate: this.datePipe.transform(this.toDate, 'yyyyMMdd')
        };
        console.log('getScheduleList');
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

    onEventClick(param) {
        console.log(param);
    }

    onDatesRender(param) {
        const endDate: Date = param.view.currentEnd;
        endDate.setDate(endDate.getDate() - 1);

        this.selectedDate = param.view.currentStart;
        this.toDate = endDate;
        // console.log(param.view.currentStart);
        // console.log(param.view.currentEnd);
        // console.log(endDate);
        this.getScheduleList();
    }

    //#endregion

}
