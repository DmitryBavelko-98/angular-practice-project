import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.scss'],
})
export class AddressesListComponent implements OnInit {
  @Input() addressesLength!: number;
  @Output() formReady = new EventEmitter<FormGroup>();

  isAddresRemovable = false;

  constructor(private fb: FormBuilder) { };

  ngOnInit(): void {
    this.addAddress(this.addressesLength);
    this.formReady.emit(this.addressesFormGroup);
  }

  addressesFormGroup= this.fb.group({
    addresses: this.fb.array([])
  });

  get addresses(): FormArray {   
    return this.addressesFormGroup.controls["addresses"] as FormArray;
  }

  getArrayControl(index: number, controlName: string): FormControl {
    return <FormControl>this.addressesFormGroup.controls["addresses"].at(index).get(controlName);
  }

  addAddress(addresses: number = 1): void {
    for (let i = 0; i < addresses; i++) {
      const addressForm = this.fb.group({
        addressLine: ['', Validators.required],
        city: [''],
        zip: [{value: '', disabled: true}, Validators.required]
      });
  
      addressForm.get('city')?.valueChanges.subscribe(value => {
        if (value) {
          addressForm.get('zip')?.enable();
          return;
        }
    
        addressForm.get('zip')?.disable();
      });
  
      this.addresses.push(addressForm);
    }
    this.isAddresRemovable = true;
  }

  removeAddress(index: number): void {
    if (this.addresses.length === 1) {
      this.isAddresRemovable = false;
      return;
    } 

    this.addresses.removeAt(index);              
  }
}
