import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponseModel } from '../../models/apiResponse';
import { FormModel } from '../../models/form';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private http = inject(HttpClient);

  url: string = environment.apiUrl1;

  postForm(dataToSave: FormModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(`${this.url}/public/guardar-formulario`, dataToSave);
  }

  getAllSubmisions(): Observable<ApiResponseModel> {
    console.log(this.url);
    return this.http.get<ApiResponseModel>(`${this.url}/public/listar`);
  }

  downloadCSV(): Observable<Blob> {
    return this.http.get(`${this.url}/public/descargar`, { responseType: 'blob' });
  }

  existsByDocumentNumber(numeroDocumento: string): Observable<boolean> {
    return this.http
      .get<ApiResponseModel>(`${this.url}/public/verificar/${encodeURIComponent(numeroDocumento)}`)
      .pipe(map((r) => r.data as boolean));
  }
}
