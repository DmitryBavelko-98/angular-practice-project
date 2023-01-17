import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit  {
  @Input() address!: AbstractControl;

  subscribe: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.addressGroup.addControl('addressLine', this.fb.control(null, Validators.required));
      this.addressGroup.addControl('city', this.fb.control(null));
      this.addressGroup.addControl('zip', new FormControl({value: null, disabled: true}, Validators.required));
  
      this.subscribe.add(
        this.addressGroup.get('city')?.valueChanges
          .pipe(take(1))
          .subscribe(value => {
            if (value) {
              this.addressGroup.get('zip')?.enable();
              return;
            }
        
            this.addressGroup.get('zip')?.disable();
          })
      );
  }

  get addressGroup() {
    return this.address as FormGroup;
  }
}
