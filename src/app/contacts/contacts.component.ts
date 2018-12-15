import { MessagesService } from './../messages.service';
import { ContactsService } from './../contacts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html', 
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  users = [];

  constructor (private contacts: ContactsService, private messages: MessagesService) { }

  ngOnInit() {
    this.contacts.getUser().subscribe(users => {
      this.users = users['results'];
    })
  }

   getLastMessage(user) {
    const array = this.messages.getMessages(user);
    return array ? array[array.length - 1].message : '';
  }

}
