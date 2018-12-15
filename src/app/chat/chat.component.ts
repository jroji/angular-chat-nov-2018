import { MessagesService } from './../messages.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  target;

  constructor(
    private router: ActivatedRoute, 
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.target = params.name;
    });
  }

  addMessage(event) {
    this.messageService.saveMessage(event, this.target);
  }
}
