import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() id!: string;
  @Input() showLabel: boolean = false;
  @Input() options: Array<any> = [];
  @Input() optionLabel: string = '';
  @Input() optionValue: string = '';
  @Input() disabled: boolean = false;
  @Input() isOneLabel: boolean = false;
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
    if (this.control) {
      this.control.valueChanges.subscribe(fn);
    }
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
