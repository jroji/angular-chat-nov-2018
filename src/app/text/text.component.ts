import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Output() onMessage = new EventEmitter();

  @Input() username: string;
  message: string;

  constructor() { }

  ngOnInit() {}

  sendMessage() {
    this.onMessage.emit({ username: this.username, message: this.message });
  }
}
