import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput {
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() id!: string;
  @Input() showLabel: boolean = true;
  @Input() type: string = 'text';
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
