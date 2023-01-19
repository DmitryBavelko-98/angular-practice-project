import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.scss'],
})
export class AddressesListComponent implements OnInit {
  @Input() initialAddresses?: FormArray;
  @Output() formReady = new EventEmitter<FormGroup>();

  isAddresRemovable = true;
  addressesForm!: FormGroup;

  constructor(private fb: FormBuilder) {};

  ngOnInit(): void {
    this.addressesForm= this.fb.group({
      addresses: this.initialAddresses || this.fb.array([this.fb.group({})])
    });
    this.formReady.emit(this.addressesForm);
  }

  get addresses(): FormArray {   
    return this.addressesForm.controls["addresses"] as FormArray;
  }

  addAddress(): void {
    this.isAddresRemovable = true;
    this.addresses.push(this.fb.group({}));
  }

  removeAddress(index: number): void {
    if (this.addresses.length === 1) {
      this.isAddresRemovable = false;
      return;
    } 

    this.addresses.removeAt(index);              
  }
}
