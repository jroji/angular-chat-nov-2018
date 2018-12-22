import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  tryedToSubmit: boolean = false;
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private contacts: ContactsService) { }
  ngOnInit() {
  }

  addUser(form) {
    console.log(form.value);
    this.tryedToSubmit = true;
    if (form.valid) {
      this.contacts.add(form.value);
      form.reset();
    }
    
  }
}
