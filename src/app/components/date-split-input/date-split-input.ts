import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-split-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './date-split-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateSplitInput),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateSplitInput),
      multi: true,
    },
  ],
})
export class DateSplitInput implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  /** Inputs para integración / configuración */
  @Input() labelText: string = '';
  @Input() placeholder: string = 'Día';
  @Input() control: FormControl = new FormControl(); // puedes pasar tu control
  @Input() startYear: number = 1900;
  @Input() endYear: number = new Date().getFullYear();
  @Input() outputFormat: 'date' | 'iso' | 'string' = 'date';
  @Input() showLabel: boolean = true;
  @Input() isRequired: boolean = false;
  @Input() disabled: boolean = false;

  /** Emitimos cambio si quieres escuchar */
  @Output() dateChange = new EventEmitter<Date | string | null>();

  // FormGroup interno para los 3 selects (no es expuesto por defecto)
  internal = new FormGroup({
    day: new FormControl(''),
    month: new FormControl(''),
    year: new FormControl(''),
  });

  days: number[] = [];
  months = [
    { label: 'Ene', value: 1 },
    { label: 'Feb', value: 2 },
    { label: 'Mar', value: 3 },
    { label: 'Abr', value: 4 },
    { label: 'May', value: 5 },
    { label: 'Jun', value: 6 },
    { label: 'Jul', value: 7 },
    { label: 'Ago', value: 8 },
    { label: 'Sep', value: 9 },
    { label: 'Oct', value: 10 },
    { label: 'Nov', value: 11 },
    { label: 'Dic', value: 12 },
  ];
  years: number[] = [];

  private sub = new Subscription();

  // ControlValueAccessor callbacks
  onTouched = () => {};
  private onChangeFn: (v: any) => void = () => {};

  ngOnInit(): void {
    // build years array (descendente)
    const yrs: number[] = [];
    for (let y = this.endYear; y >= this.startYear; y--) {
      yrs.push(y);
    }
    this.years = yrs;

    // initial days (31 default)
    this.updateDays(31);

    // subscribe changes in internal selects
    this.sub.add(
      this.internal.valueChanges.subscribe((vals) => {
        const d = this.buildDateFromParts(vals);
        this.emitAndWriteValue(d);
      })
    );

    // If the user passed an external control, update it when our internal date changes
    // We will write value into that control instead of replacing it.
    if (this.control) {
      // if external control is disabled, disable internals
      if (this.control.disabled) {
        this.internal.disable({ emitEvent: false });
      }

      this.sub.add(
        this.control.valueChanges.subscribe((v) => {
          // if external control changed from outside (and is not same as internal) sync
          this.syncFromExternal(v);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /** Build JS Date or null from internal parts */
  private buildDateFromParts(parts: any): Date | null {
    const day = Number(parts.day);
    const month = Number(parts.month);
    const year = Number(parts.year);
    if (!day || !month || !year) return null;

    // JS Date uses monthIndex 0..11
    const date = new Date(year, month - 1, day);
    // validate (e.g., 31 Feb -> becomes March)
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }
    return date;
  }

  /** When internal selects change, write to external control & propagate CVA change */
  private emitAndWriteValue(d: Date | null) {
    let out: any = null;
    if (d) {
      if (this.outputFormat === 'date') out = d;
      else if (this.outputFormat === 'iso') out = d.toISOString();
      else out = d.toLocaleDateString(); // string
    }

    // write to external FormControl if passed
    if (this.control && this.control instanceof FormControl) {
      this.control.setValue(out, { emitEvent: false });
    }

    // propagate CVA change
    this.onChangeFn(out);

    // emit event
    this.dateChange.emit(out);

    // update days length if month/year changed
    const m = Number(this.internal.get('month')?.value);
    const y = Number(this.internal.get('year')?.value);
    if (m && y) {
      const maxDays = this.daysInMonth(m, y);
      this.updateDays(maxDays);
      // if selected day > maxDays -> clear day
      const curDay = Number(this.internal.get('day')?.value);
      if (curDay > maxDays) {
        this.internal.get('day')?.setValue('', { emitEvent: false });
      }
    }
  }

  /** CVA - writeValue (external writes to component) */
  writeValue(value: any): void {
    // accept Date, ISO string, or localized string
    if (!value) {
      this.internal.setValue({ day: '', month: '', year: '' }, { emitEvent: false });
      return;
    }

    let d: Date | null = null;
    if (value instanceof Date) d = value;
    else if (typeof value === 'string') {
      const temp = new Date(value);
      if (!isNaN(temp.getTime())) d = temp;
    }

    if (d) {
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      // set internal without emitting events
      this.internal.setValue(
        { day: String(day), month: String(month), year: String(year) },
        { emitEvent: false }
      );
      // ensure days array is correct
      this.updateDays(this.daysInMonth(month, year));
    } else {
      // not a valid date
      this.internal.setValue({ day: '', month: '', year: '' }, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.internal.disable({ emitEvent: false })
      : this.internal.enable({ emitEvent: false });
    if (this.control) {
      isDisabled
        ? this.control.disable({ emitEvent: false })
        : this.control.enable({ emitEvent: false });
    }
  }

  // Validator: if required and incomplete -> error
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isRequired) {
      const vals = this.internal.value;
      if (!vals.day || !vals.month || !vals.year) {
        return { required: true };
      }
    }
    // additional checks can be added
    return null;
  }

  // helper: days in month
  private daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  private updateDays(count: number) {
    this.days = Array.from({ length: count }, (_, i) => i + 1);
  }

  // sync when external control changed from outside
  private syncFromExternal(val: any) {
    if (!val) {
      this.internal.setValue({ day: '', month: '', year: '' }, { emitEvent: false });
      return;
    }
    let d: Date | null = null;
    if (val instanceof Date) d = val;
    else if (typeof val === 'string') {
      const tmp = new Date(val);
      if (!isNaN(tmp.getTime())) d = tmp;
    }
    if (d) {
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      this.internal.setValue(
        { day: String(day), month: String(month), year: String(year) },
        { emitEvent: false }
      );
      this.updateDays(this.daysInMonth(month, year));
    }
  }

  // Expose convenience getters for template
  get dayCtrl() {
    return this.internal.get('day') as FormControl;
  }
  get monthCtrl() {
    return this.internal.get('month') as FormControl;
  }
  get yearCtrl() {
    return this.internal.get('year') as FormControl;
  }
}
