import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from '../../models/alert';

@Injectable({
  providedIn: 'root',
})
export class AlerService {
  private newAlert$ = new Subject<Alert>();
  alerts$ = this.newAlert$.asObservable();

  private defaultAutoClose = 2000;
  private generateId() {
    return Math.random().toString(36).slice(2, 9);
  }

  show(message: string, type: AlertType = 'info', autoClose?: number) {
    const alert: Alert = {
      id: this.generateId(),
      type,
      message,
      autoClose: autoClose === undefined ? this.defaultAutoClose : autoClose,
      createdAt: Date.now(),
    };
    this.newAlert$.next(alert);
    return alert.id;
  }

  success(msg: string, autoClose?: number) {
    return this.show(msg, 'success', autoClose);
  }
  error(msg: string, autoClose?: number) {
    return this.show(msg, 'error', autoClose ?? 5000);
  }
  info(msg: string, autoClose?: number) {
    return this.show(msg, 'info', autoClose);
  }
  warning(msg: string, autoClose?: number) {
    return this.show(msg, 'warning', autoClose);
  }

  // Para limpiar por completo desde fuera si lo necesitas
  clearAll() {
    // envío un mensaje especial con id='' y message='' para que componente borre todo
    this.newAlert$.next({ id: '', type: 'info', message: '', autoClose: 0 });
  }
}
