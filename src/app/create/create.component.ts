import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

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
  isAvailable;

  constructor(private contacts: ContactsService, private form: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.form.group({

      personal: this.form.group({
        name: ['', [ Validators.required, Validators.minLength(3) ]],
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

    this.userForm.get('personal').get('name').valueChanges.pipe(debounceTime(500)).subscribe(username => {
      this.isAvailable = this.contacts.validateUser(username);
    });

    this.userForm.get('address').get('coordinates').valueChanges.pipe(debounceTime(500)).subscribe(data => { 
      this.lat = data.latitude;
      this.lng = data.longitude;
    });
  }

  addUser() {
    this.tryedToSubmit = true;
    if (this.userForm.valid) {
      this.contacts.add(this.userForm.value);
    }
    
  }
}
