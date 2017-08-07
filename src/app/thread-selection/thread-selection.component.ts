import { ThreadService } from './../services/thread.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread-selection',
  templateUrl: './thread-selection.component.html',
  styleUrls: ['./thread-selection.component.css']
})
export class ThreadSelectionComponent implements OnInit {

  constructor(private threadService: ThreadService) { }

  ngOnInit() {
    this.threadService.loadUserThreads()
      .subscribe(console.log);
  }

}
