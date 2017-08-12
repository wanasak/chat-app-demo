import { ThreadSummaryVM } from './../thread-selection/thread-summary.vm';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input() threads: ThreadSummaryVM[];

  constructor() { }

  ngOnInit() {
  }

}
