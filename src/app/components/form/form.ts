import { Component, inject } from '@angular/core';
import { TextInput } from '../text-input/text-input';
import { Select } from '../select/select';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NumberInput } from '../number-input/number-input';
import { PhoneInput } from '../phone-input/phone-input';
import { SelectOptionModel } from '../../models/options';
import { DOCUMENT_TYPES, MUNICIPALITIES, SECTOR_TYPES } from '../../utils/data';
import { FormService } from '../../services/form-service/form-service';
import { firstValueFrom, Subject, take, takeUntil } from 'rxjs';
import {
  DiagnosticFormModel,
  DiagnosticResultModel,
  FormModel,
  ModuleQuestionsForm,
} from '../../models/form';
import { AlerService } from '../../services/alert-service/aler-service';
import { CommonModule } from '@angular/common';
import { StepperModel } from '../../models/steps';
import { CheckboxGroup } from '../checkbox-group/checkbox-group';
import { StepperComponent } from '../stepper-component/stepper-component';

@Component({
  selector: 'app-form',
  imports: [
    TextInput,
    Select,
    ReactiveFormsModule,
    NumberInput,
    PhoneInput,
    CommonModule,
    StepperComponent,
    CheckboxGroup,
  ],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  private unsubscribe$ = new Subject<void>();

  private fb = inject(FormBuilder);
  private formService = inject(FormService);
  private alertService = inject(AlerService);

  isLoading: boolean = false;

  municipalities: SelectOptionModel[] = MUNICIPALITIES;
  documentTypes: SelectOptionModel[] = DOCUMENT_TYPES;
  economicSectorTypes: SelectOptionModel[] = SECTOR_TYPES;

  currentStep: StepperModel[] = [];

  steps: StepperModel[] = [
    { label: 'Registro' },
    { label: 'Diagnóstico', disabled: true },
    { label: 'Resultados', disabled: true },
  ];

  form1: FormGroup = this.fb.group({});
  form2: FormGroup = this.fb.group({});

  showExtraFields: boolean = false;

  saving = false;

  resultDiagnosis!: DiagnosticResultModel;

  module1Total: number = 0;
  module2Total: number = 0;
  module3Total: number = 0;
  module4Total: number = 0;
  module5Total: number = 0;
  module6Total: number = 0;
  module7Total: number = 0;
  module8Total: number = 0;
  module9Total: number = 0;
  module10Total: number = 0;

  // PASO 1
  get fullNameControl(): FormControl {
    return this.form1.get('fullName') as FormControl;
  }

  get documentTypeControl(): FormControl {
    return this.form1.get('documentType') as FormControl;
  }

  get documentNumberControl(): FormControl {
    return this.form1.get('documentNumber') as FormControl;
  }

  get emailControl(): FormControl {
    return this.form1.get('email') as FormControl;
  }

  get phoneControl(): FormControl {
    return this.form1.get('phone') as FormControl;
  }

  get nitNumberControl(): FormControl {
    return this.form1.get('nitNumber') as FormControl;
  }

  get cityControl(): FormControl {
    return this.form1.get('city') as FormControl;
  }

  get economicSectorControl(): FormControl {
    return this.form1.get('economicSector') as FormControl;
  }

  get numberEmployeesControl(): FormControl {
    return this.form1.get('numberEmployees') as FormControl;
  }

  get addressControl(): FormControl {
    return this.form1.get('address') as FormControl;
  }

  get acceptsPolicyControl(): FormControl {
    return this.form1.get('acceptsPolicy') as FormControl;
  }

  // PASO 2

  // MÓDULO 1
  // get module1(): FormGroup {
  //   return this.form2.get('module1') as FormGroup;
  // }
  // get module1Question1(): FormControl {
  //   return this.module1.get('question1') as FormControl;
  // }
  // get module1Question2(): FormControl {
  //   return this.module1.get('question2') as FormControl;
  // }
  // get module1Question3(): FormControl {
  //   return this.module1.get('question3') as FormControl;
  // }
  // get module1Question4(): FormControl {
  //   return this.module1.get('question4') as FormControl;
  // }
  // get module1Question5(): FormControl {
  //   return this.module1.get('question5') as FormControl;
  // }
  // get module1Question6(): FormControl {
  //   return this.module1.get('question6') as FormControl;
  // }

  // MÓDULO 2
  // get module2(): FormGroup {
  //   return this.form2.get('module2') as FormGroup;
  // }
  // get module2Question1(): FormControl {
  //   return this.module2.get('question1') as FormControl;
  // }
  // get module2Question2(): FormControl {
  //   return this.module2.get('question2') as FormControl;
  // }
  // get module2Question3(): FormControl {
  //   return this.module2.get('question3') as FormControl;
  // }
  // get module2Question4(): FormControl {
  //   return this.module2.get('question4') as FormControl;
  // }
  // get module2Question5(): FormControl {
  //   return this.module2.get('question5') as FormControl;
  // }
  // get module2Question6(): FormControl {
  //   return this.module2.get('question6') as FormControl;
  // }

  // MÓDULO 3
  // get module3(): FormGroup {
  //   return this.form2.get('module3') as FormGroup;
  // }
  // get module3Question1(): FormControl {
  //   return this.module3.get('question1') as FormControl;
  // }
  // get module3Question2(): FormControl {
  //   return this.module3.get('question2') as FormControl;
  // }
  // get module3Question3(): FormControl {
  //   return this.module3.get('question3') as FormControl;
  // }
  // get module3Question4(): FormControl {
  //   return this.module3.get('question4') as FormControl;
  // }
  // get module3Question5(): FormControl {
  //   return this.module3.get('question5') as FormControl;
  // }
  // get module3Question6(): FormControl {
  //   return this.module3.get('question6') as FormControl;
  // }

  // MÓDULO 4
  // get module4(): FormGroup {
  //   return this.form2.get('module4') as FormGroup;
  // }
  // get module4Question1(): FormControl {
  //   return this.module4.get('question1') as FormControl;
  // }
  // get module4Question2(): FormControl {
  //   return this.module4.get('question2') as FormControl;
  // }
  // get module4Question3(): FormControl {
  //   return this.module4.get('question3') as FormControl;
  // }
  // get module4Question4(): FormControl {
  //   return this.module4.get('question4') as FormControl;
  // }
  // get module4Question5(): FormControl {
  //   return this.module4.get('question5') as FormControl;
  // }
  // get module4Question6(): FormControl {
  //   return this.module4.get('question6') as FormControl;
  // }

  // MÓDULO 5
  // get module5(): FormGroup {
  //   return this.form2.get('module5') as FormGroup;
  // }
  // get module5Question1(): FormControl {
  //   return this.module5.get('question1') as FormControl;
  // }
  // get module5Question2(): FormControl {
  //   return this.module5.get('question2') as FormControl;
  // }
  // get module5Question3(): FormControl {
  //   return this.module5.get('question3') as FormControl;
  // }
  // get module5Question4(): FormControl {
  //   return this.module5.get('question4') as FormControl;
  // }
  // get module5Question5(): FormControl {
  //   return this.module5.get('question5') as FormControl;
  // }
  // get module5Question6(): FormControl {
  //   return this.module5.get('question6') as FormControl;
  // }

  // MÓDULO 6
  // get module6(): FormGroup {
  //   return this.form2.get('module6') as FormGroup;
  // }
  // get module6Question1(): FormControl {
  //   return this.module6.get('question1') as FormControl;
  // }
  // get module6Question2(): FormControl {
  //   return this.module6.get('question2') as FormControl;
  // }
  // get module6Question3(): FormControl {
  //   return this.module6.get('question3') as FormControl;
  // }
  // get module6Question4(): FormControl {
  //   return this.module6.get('question4') as FormControl;
  // }
  // get module6Question5(): FormControl {
  //   return this.module6.get('question5') as FormControl;
  // }
  // get module6Question6(): FormControl {
  //   return this.module6.get('question6') as FormControl;
  // }

  // MÓDULO 7
  // get module7(): FormGroup {
  //   return this.form2.get('module7') as FormGroup;
  // }
  // get module7Question1(): FormControl {
  //   return this.module7.get('question1') as FormControl;
  // }
  // get module7Question2(): FormControl {
  //   return this.module7.get('question2') as FormControl;
  // }
  // get module7Question3(): FormControl {
  //   return this.module7.get('question3') as FormControl;
  // }
  // get module7Question4(): FormControl {
  //   return this.module7.get('question4') as FormControl;
  // }
  // get module7Question5(): FormControl {
  //   return this.module7.get('question5') as FormControl;
  // }
  // get module7Question6(): FormControl {
  //   return this.module7.get('question6') as FormControl;
  // }

  // MÓDULO 8
  // get module8(): FormGroup {
  //   return this.form2.get('module8') as FormGroup;
  // }
  // get module8Question1(): FormControl {
  //   return this.module8.get('question1') as FormControl;
  // }
  // get module8Question2(): FormControl {
  //   return this.module8.get('question2') as FormControl;
  // }
  // get module8Question3(): FormControl {
  //   return this.module8.get('question3') as FormControl;
  // }
  // get module8Question4(): FormControl {
  //   return this.module8.get('question4') as FormControl;
  // }
  // get module8Question5(): FormControl {
  //   return this.module8.get('question5') as FormControl;
  // }
  // get module8Question6(): FormControl {
  //   return this.module8.get('question6') as FormControl;
  // }

  // MÓDULO 9
  // get module9(): FormGroup {
  //   return this.form2.get('module9') as FormGroup;
  // }
  // get module9Question1(): FormControl {
  //   return this.module9.get('question1') as FormControl;
  // }
  // get module9Question2(): FormControl {
  //   return this.module9.get('question2') as FormControl;
  // }
  // get module9Question3(): FormControl {
  //   return this.module9.get('question3') as FormControl;
  // }
  // get module9Question4(): FormControl {
  //   return this.module9.get('question4') as FormControl;
  // }
  // get module9Question5(): FormControl {
  //   return this.module9.get('question5') as FormControl;
  // }
  // get module9Question6(): FormControl {
  //   return this.module9.get('question6') as FormControl;
  // }

  // MÓDULO 10
  // get module10(): FormGroup {
  //   return this.form2.get('module10') as FormGroup;
  // }
  // get module10Question1(): FormControl {
  //   return this.module10.get('question1') as FormControl;
  // }
  // get module10Question2(): FormControl {
  //   return this.module10.get('question2') as FormControl;
  // }
  // get module10Question3(): FormControl {
  //   return this.module10.get('question3') as FormControl;
  // }
  // get module10Question4(): FormControl {
  //   return this.module10.get('question4') as FormControl;
  // }
  // get module10Question5(): FormControl {
  //   return this.module10.get('question5') as FormControl;
  // }
  // get module10Question6(): FormControl {
  //   return this.module10.get('question6') as FormControl;
  // }

  // get progressInfo() {
  //   const formValue = this.form2.getRawValue();
  //   let total = 0;
  //   let answered = 0;

  //   for (const moduleKey of Object.keys(formValue)) {
  //     const module = formValue[moduleKey];
  //     for (const questionKey of Object.keys(module)) {
  //       total++;
  //       if (module[questionKey] !== null && module[questionKey] !== undefined) {
  //         answered++;
  //       }
  //     }
  //   }

  //   const percentage = Math.round((answered / total) * 100);
  //   return { answered, total, percentage };
  // }

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(): void {
    this.form1 = this.fb.group({
      fullName: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: [''],
      phone: [''],
      nitNumber: [''],
      city: [''],
      economicSector: [''],
      numberEmployees: [''],
      address: [''],
      acceptsPolicy: [''],
    });

    this.form2 = this.fb.group({
      module1: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
      module2: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
      module3: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
      module4: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
      module5: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
      module6: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
      module7: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
      module8: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
      module9: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
      module10: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
    });
  }

  canProceedFn = (index: number): boolean => {
    if (!this.form1 || !this.form2) return false;
    if (index === 0) return this.form1.valid;
    if (index === 1) return this.form2.valid;
    return true;
  };

  onStepChanged(newIndex: number) {}

  onCompleted(index: number) {}

  onBlocked(index: number) {
    if (index === 0) {
      this.form1.markAllAsDirty();
      this.form1.markAllAsTouched();
      if (this.documentNumberControl.valid && this.form1.valid) {
        this.alertService.error(
          `No se encontraron registros con el número de cédula ${this.documentNumberControl.getRawValue()}.`
        );
      } else {
        this.alertService.error('Debe completar todos los datos obligatorios del formulario.');
      }
    }
    if (index === 1) {
      this.form2.markAllAsDirty();
      this.form2.markAllAsTouched();

      this.alertService.error('Debe completar todos los datos obligatorios del formulario.');
    } else {
      this.alertService.error('Completa los campos requeridos del paso ' + (index + 1));
    }
  }

  onBeforeNextFn = async (index: number): Promise<boolean> => {
    //if (index !== 0) return true;

    if (index === 0) {
      const documentNumber = this.documentNumberControl.getRawValue();
      if (!documentNumber) return false;

      if (!this.showExtraFields) {
        try {
          const exists = await firstValueFrom(
            this.formService.existsByDocumentNumber(documentNumber).pipe(take(1))
          );
          if (exists) {
            return true;
          } else {
            this.showExtraFields = true;
            this.addExtraValidators();

            return false;
          }
        } catch (err) {
          console.error('Error verificando existencia:', err);
          return false;
        }
      } else {
        this.form1.markAllAsDirty();
        this.form1.markAllAsTouched();

        if (this.form1.valid) {
          const payload: FormModel = {
            ...this.form1.value,
          };

          this.saving = true;
          try {
            await firstValueFrom(this.formService.postForm(payload));
            this.showExtraFields = false;
            this.saving = false;
            // opcional: this.extraForm.reset(); // si quieres limpiar
            this.alertService.success('Formulario enviado correctamente.');
            return true;
          } catch (err: any) {
            console.error('Error guardando persona:', err);
            this.saving = false;
            this.alertService.error('Se ha presentado un error.');
            // mantener los campos extra visibles para corrección/reintento
            return false;
          }
        } else {
          this.alertService.error('Debe completar todos los datos obligatorios del formulario.');
          return false;
        }
      }
    } else if (index === 1) {
      // DIAGNOSTICO
      this.form2.markAllAsDirty();
      this.form2.markAllAsTouched();

      if (this.form2.valid) {
        const formData = this.form2.getRawValue() as DiagnosticFormModel;

        const results = this.formatDiagosticData(formData);
        console.log(results);

        this.resultDiagnosis = results;

        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  formatDiagosticData(dataToFormat: DiagnosticFormModel): DiagnosticResultModel {
    const results = {
      module1: {
        question1: dataToFormat.module1.question1 ? 1 : 0,
        question2: dataToFormat.module1.question2 ? 0 : 1,
        question3: dataToFormat.module1.question2 ? 0 : 1,
        question4: dataToFormat.module1.question3 ? 0 : 1,
        question5: dataToFormat.module1.question4 ? 1 : 0,
        question6: dataToFormat.module1.question5 ? 1 : 0,
      },
      module2: {
        question1: dataToFormat.module2.question1 ? 0 : 1,
        question2: dataToFormat.module2.question2 ? 1 : 0,
        question3: dataToFormat.module2.question3 ? 0 : 1,
        question4: dataToFormat.module2.question4 ? 1 : 0,
        question5: dataToFormat.module2.question5 ? 1 : 0,
        question6: dataToFormat.module2.question6 ? 1 : 0,
      },
      module3: {
        question1: dataToFormat.module3.question1 ? 1 : 0,
        question2: dataToFormat.module3.question2 ? 1 : 0,
        question3: dataToFormat.module3.question3 ? 1 : 0,
        question4: dataToFormat.module3.question4 ? 0 : 1,
        question5: dataToFormat.module3.question5 ? 0 : 1,
        question6: dataToFormat.module3.question6 ? 0 : 1,
      },
      module4: {
        question1: dataToFormat.module4.question1 ? 0 : 1,
        question2: dataToFormat.module4.question2 ? 1 : 0,
        question3: dataToFormat.module4.question3 ? 1 : 0,
        question4: dataToFormat.module4.question4 ? 1 : 0,
        question5: dataToFormat.module4.question5 ? 0 : 1,
        question6: dataToFormat.module4.question6 ? 1 : 0,
      },
      module5: {
        question1: dataToFormat.module5.question1 ? 1 : 0,
        question2: dataToFormat.module5.question2 ? 0 : 1,
        question3: dataToFormat.module5.question3 ? 1 : 0,
        question4: dataToFormat.module5.question4 ? 1 : 0,
        question5: dataToFormat.module5.question5 ? 0 : 1,
        question6: dataToFormat.module5.question6 ? 1 : 0,
      },
      module6: {
        question1: dataToFormat.module6.question1 ? 1 : 0,
        question2: dataToFormat.module6.question2 ? 0 : 1,
        question3: dataToFormat.module6.question3 ? 1 : 0,
        question4: dataToFormat.module6.question4 ? 0 : 1,
        question5: dataToFormat.module6.question5 ? 0 : 1,
        question6: dataToFormat.module6.question6 ? 1 : 0,
      },
      module7: {
        question1: dataToFormat.module7.question1 ? 1 : 0,
        question2: dataToFormat.module7.question2 ? 0 : 1,
        question3: dataToFormat.module7.question3 ? 0 : 1,
        question4: dataToFormat.module7.question4 ? 1 : 0,
        question5: dataToFormat.module7.question5 ? 0 : 1,
        question6: dataToFormat.module7.question6 ? 1 : 0,
      },
      module8: {
        question1: dataToFormat.module8.question1 ? 1 : 0,
        question2: dataToFormat.module8.question2 ? 1 : 0,
        question3: dataToFormat.module8.question3 ? 0 : 1,
        question4: dataToFormat.module8.question4 ? 0 : 1,
        question5: dataToFormat.module8.question5 ? 0 : 1,
        question6: dataToFormat.module8.question6 ? 1 : 0,
      },
      module9: {
        question1: dataToFormat.module9.question1 ? 1 : 0,
        question2: dataToFormat.module9.question2 ? 0 : 1,
        question3: dataToFormat.module9.question3 ? 1 : 0,
        question4: dataToFormat.module9.question4 ? 1 : 0,
        question5: dataToFormat.module9.question5 ? 0 : 1,
        question6: dataToFormat.module9.question6 ? 1 : 0,
      },
      module10: {
        question1: dataToFormat.module10.question1 ? 1 : 0,
        question2: dataToFormat.module10.question2 ? 0 : 1,
        question3: dataToFormat.module10.question3 ? 1 : 0,
        question4: dataToFormat.module10.question4 ? 0 : 1,
        question5: dataToFormat.module10.question5 ? 1 : 0,
        question6: dataToFormat.module10.question6 ? 0 : 1,
      },
    };

    this.module1Total = Object.values(results.module1).reduce((acc, curr) => acc + curr, 0);
    this.module2Total = Object.values(results.module2).reduce((acc, curr) => acc + curr, 0);
    this.module3Total = Object.values(results.module3).reduce((acc, curr) => acc + curr, 0);
    this.module4Total = Object.values(results.module4).reduce((acc, curr) => acc + curr, 0);
    this.module5Total = Object.values(results.module5).reduce((acc, curr) => acc + curr, 0);
    this.module6Total = Object.values(results.module6).reduce((acc, curr) => acc + curr, 0);
    this.module7Total = Object.values(results.module7).reduce((acc, curr) => acc + curr, 0);
    this.module8Total = Object.values(results.module8).reduce((acc, curr) => acc + curr, 0);
    this.module9Total = Object.values(results.module9).reduce((acc, curr) => acc + curr, 0);
    this.module10Total = Object.values(results.module10).reduce((acc, curr) => acc + curr, 0);

    return results;
  }

  addExtraValidators(): void {
    this.emailControl.addValidators(Validators.required);
    this.phoneControl.addValidators(Validators.required);
    this.nitNumberControl.addValidators(Validators.required);
    this.cityControl.addValidators(Validators.required);
    this.economicSectorControl.addValidators(Validators.required);
    this.numberEmployeesControl.addValidators(Validators.required);
    this.addressControl.addValidators(Validators.required);
    this.acceptsPolicyControl.addValidators(Validators.required);
    this.emailControl.updateValueAndValidity();
    this.phoneControl.updateValueAndValidity();
    this.nitNumberControl.updateValueAndValidity();
    this.cityControl.updateValueAndValidity();
    this.economicSectorControl.updateValueAndValidity();
    this.numberEmployeesControl.updateValueAndValidity();
    this.addressControl.updateValueAndValidity();
    this.acceptsPolicyControl.updateValueAndValidity();
  }
}
