import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent {
  @Output() addUser = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  userFormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    age: [''],
    email: [''],
    company: [''],
    department: [''],
    gender: ['male']
  });

  submitUserData() {
    this.addUser.emit(this.userFormGroup.value);
  }
}
