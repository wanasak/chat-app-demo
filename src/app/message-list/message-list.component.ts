import { Message } from './../../../shared/model/message';
import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnChanges {

  @Input() messages: Message[];

  @ViewChild('list') list: ElementRef;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      const previousMessages = changes['messages'].previousValue;
      const newMessages = changes['messages'].currentValue;

      if (newMessages.length > previousMessages.length) {
        setTimeout(() => this.scrolllLastMessageIntoView());
      }
    }
  }

  private scrolllLastMessageIntoView() {
    const items = this.list.nativeElement.querySelectorAll('li');
    const lastItem: any = _.last(items);
    if (lastItem) {
      lastItem.scrollIntoView();
    }
  }
}
