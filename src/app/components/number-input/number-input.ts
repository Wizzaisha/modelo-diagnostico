import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-number-input',
  imports: [NgxMaskDirective, CommonModule, ReactiveFormsModule],
  providers: [provideNgxMask()],
  templateUrl: './number-input.html',
  styleUrl: './number-input.css',
})
export class NumberInput {
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() id!: string;
  @Input() showLabel: boolean = false;
  @Input() readonly: boolean = false;
  @Input() isRequired: boolean = false;

  @Output() change = new EventEmitter<Event>();

  onChange(event: Event) {
    this.change.emit(event);
  }
  private onTouched = () => {};

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: any): void {
    if (value) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.control.errors;
  }

  onBlur(): void {
    this.onTouched();
  }
}
