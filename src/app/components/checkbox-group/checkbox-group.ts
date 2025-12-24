import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {
  FormControl,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export type Option = { label: string; value: boolean };

@Component({
  selector: 'app-checkbox-group',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkbox-group.html',
  styleUrl: './checkbox-group.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroup),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxGroup),
      multi: true,
    },
  ],
})
export class CheckboxGroup {
  @Input() labelText: string = '';

  @Input() control: FormControl = new FormControl();

  @Input() options: Option[] = [
    { label: 'Sí', value: true },
    { label: 'No', value: false },
  ];

  @Input() isRequired: boolean = false;

  @Output() change = new EventEmitter<any>();

  selected: any = null;

  private onChangeFn: (v: any) => void = () => {};
  private onTouched = () => {};

  ngOnInit(): void {
    if (this.control && this.control.value !== undefined) {
      this.selected = this.control.value;
    }

    if (this.control) {
      this.control.valueChanges.subscribe((v) => {
        this.selected = v;
      });
    }
  }

  select(val: any) {
    if (this.control?.disabled) return;
    this.selected = val;

    if (this.control && this.control instanceof FormControl) {
      this.control.setValue(val, { emitEvent: false });
    }

    this.onChangeFn(val);
    this.change.emit(val);
  }

  onKey(e: KeyboardEvent, val: any) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.select(val);
    }
  }

  writeValue(obj: any): void {
    this.selected = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isRequired && (this.selected === null || this.selected === undefined)) {
      return { required: true };
    }
    return null;
  }
}
