import { Component, inject } from '@angular/core';
import { AlerService } from '../../services/alert-service/aler-service';
import { FormService } from '../../services/form-service/form-service';
import { Subject, takeUntil } from 'rxjs';
import { FormModel } from '../../models/form';

@Component({
  selector: 'app-list-submisions',
  imports: [],
  templateUrl: './list-submisions.html',
  styleUrl: './list-submisions.css',
})
export class ListSubmisions {
  isLoading: boolean = false;
  isLoadingDownload: boolean = false;

  allSubmisions: FormModel[] = [];

  private unsubscribe$ = new Subject<void>();

  private formService = inject(FormService);
  private alertService = inject(AlerService);

  ngOnInit(): void {
    this.getAllSubmisions();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAllSubmisions(): void {
    this.isLoading = true;

    this.formService
      .getAllSubmisions()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          const responseData = response.data as FormModel[];

          console.log(response);

          this.allSubmisions = responseData;

          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.alertService.error('Se ha presentado un error.');
        },
      });
  }

  downloadCsv(): void {
    this.isLoadingDownload = true;

    this.formService
      .downloadCSV()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (blob: Blob) => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);

          a.href = objectUrl;
          a.download = 'comfenalcoEmpresarios_2025.csv';
          a.click();

          URL.revokeObjectURL(objectUrl);

          this.isLoadingDownload = false;
        },
        error: (err) => {
          this.alertService.error('Error al descargar CSV.');
          this.isLoadingDownload = false;
        },
      });
  }
}
