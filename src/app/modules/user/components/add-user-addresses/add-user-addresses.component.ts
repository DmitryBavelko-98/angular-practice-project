import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user-addresses',
  templateUrl: './add-user-addresses.component.html',
  styleUrls: ['./add-user-addresses.component.scss'],
})
export class AddUserAddressesComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  isAddresRemovable = false;

  constructor(private fb: FormBuilder) { };

  ngOnInit(): void {
    this.addAddress();
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

  addAddress(): void {
    const addressForm = this.fb.group({
      addressLine: ['', Validators.required],
      city: [''],
      zip: [{value: '', disabled: true}, Validators.required]
    });

    this.addresses.push(addressForm);

    this.isAddresRemovable = true;
  }

  removeAddress(index: number): void {
    if (this.addresses.length === 1) {
      this.isAddresRemovable = false;
      return;
    } 

    this.addresses.removeAt(index);              
  }

  checkZipDisability(index: number): void {
    if (this.addresses.at(index).get('city')?.value) {
      this.addresses.at(index).get('zip')?.enable();
      return;
    }

    this.addresses.at(index).get('zip')?.disable();
  }
}
