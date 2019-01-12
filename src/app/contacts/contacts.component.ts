import { MessagesService } from './../messages.service';
import { ContactsService } from './../contacts.service';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html', 
  styleUrls: ['./contacts.component.css'],
  animations: [
    trigger('cardState', [
      state('seleccionada', style({
        backgroundColor: '#eee',
        transform: 'rotate(360deg)scale(1)'
      })),
      state('noSeleccionada', style({
        backgroundColor: '#ff0000',
        transform: 'rotate(0deg)scale(0.5)'
      })),
      state('destacada', style({
        backgroundColor: '#00ffff',
      })),
      transition('* => seleccionada', animate('1000ms ease-in'))
  ])],
})
export class ContactsComponent implements OnInit {
  users = [];
  customContacts = [];
  state = 'noSeleccionada';

  constructor (private contacts: ContactsService, private messages: MessagesService) { }

  ngOnInit() {
    this.contacts.getUser().subscribe(users => {
      this.users = users['results'];
    });

    this.customContacts = this.contacts.customUsers;
    console.log(this.customContacts);
  }

  toggleState() {
    this.state = 'seleccionada';
  }

   getLastMessage(user) {
    const array = this.messages.getMessages(user);
    if (array) {
      return array[array.length - 1].message
    } else {
      return ''
    }
  }

}
