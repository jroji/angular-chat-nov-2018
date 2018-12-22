import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  tryedToSubmit: boolean = false;
  lat: number = 51.678418;
  lng: number = 7.809007;
  userForm: FormGroup;

  constructor(private contacts: ContactsService, private form: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.form.group({

      personal: this.form.group({
        name: ['', Validators.required, Validators.minLength(3)],
        lastname: [''],
      }),

      image: [''],

      address: this.form.group({
        coordinates: this.form.group({
          latitude: [51.67],
          longitude: [7.8],
        }),
        street: ['']
      })
    });

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
