import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './phone-input.html',
  styleUrl: './phone-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInput),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneInput),
      multi: true,
    },
  ],
})
export class PhoneInput {
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() id!: string;
  @Input() showLabel: boolean = true;
  @Input() isRequired: boolean = false;

  @Output() change = new EventEmitter<string>();

  private onTouched = () => {};

  writeValue(value: any): void {
    if (value) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
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
