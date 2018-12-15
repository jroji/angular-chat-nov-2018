import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Output() onMessage = new EventEmitter();

  username: string;
  message: string;

  constructor() { }

  ngOnInit() {}

  sendMessage() {
    this.onMessage.emit({ username: this.username, message: this.message });
  }
}
