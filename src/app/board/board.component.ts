import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() user;

  messages;

  constructor(
    private messageService: MessagesService,
    private firebase: AngularFirestore
  ) { }

  ngOnInit() {
    this.firebase.collection('messages').valueChanges().subscribe(messages => {
      this.messages = messages;
    })
    // this.messages = this.messageService.getMessages(this.user);
    // this.messageService.messages$.subscribe(messages => {
    //   this.messages = messages;
    // });
  }

}
