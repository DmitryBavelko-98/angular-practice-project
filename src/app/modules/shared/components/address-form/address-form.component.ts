import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit, OnDestroy  {
  @Input() address!: AbstractControl;

  subscribtion!: Subscription | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.addressGroup.addControl('addressLine', this.fb.control(null, Validators.required));
      this.addressGroup.addControl('city', this.fb.control(null));
      this.addressGroup.addControl('zip', new FormControl({value: null, disabled: true}, Validators.required));
  
      this.subscribtion = this.addressGroup.get('city')?.valueChanges
        .subscribe(value => {
          if (value) {
            this.addressGroup.get('zip')?.enable();
            return;
          }
      
          this.addressGroup.get('zip')?.setValue('');
          this.addressGroup.get('zip')?.disable();
        });
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }

  get addressGroup() {
    return this.address as FormGroup;
  }
}
