import { ThreadSummaryVM } from './../thread-section/thread-summary.vm';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input() threads: ThreadSummaryVM[];
  @Input() currentThreadId: number;
  @Output() threadSelected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
