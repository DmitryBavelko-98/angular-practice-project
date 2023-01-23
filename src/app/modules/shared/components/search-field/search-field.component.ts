import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit, OnDestroy  {
  @Output() valueChange = new EventEmitter();

  form!: FormGroup;
  valueSubscription!: Subscription;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      search: '',
    })
  }

  ngOnInit(): void {
    this.valueSubscription = this.form.get('search')!.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(value => this.sendInput(value));
  }

  ngOnDestroy(): void {
    this.valueSubscription.unsubscribe();
  }

  sendInput(value: string): void {
    this.valueChange.emit(value);
  }

  clearValue(): void {
    this.form.get('search')!.setValue('');
  }
}
