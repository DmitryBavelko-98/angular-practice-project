import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit {
  @Input() parentForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  userFormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    age: [''],
    email: [''],
    company: [''],
    department: [''],
    gender: [true]
  });

  ngOnInit(): void {
    this.parentForm.addControl('newUser', this.userFormGroup);
  }
}
