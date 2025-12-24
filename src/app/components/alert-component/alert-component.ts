import { Component, inject } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Alert } from '../../models/alert';
import { AlerService } from '../../services/alert-service/aler-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-component',
  imports: [CommonModule],
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.css',
})
export class AlertComponent {
  alerts: Alert[] = [];
  private sub = new Subscription();
  private maxVisible = 4;
  private leaveDuration = 500;

  constructor(private alertService: AlerService) {
    this.sub.add(
      this.alertService.alerts$.subscribe((a) => {
        if (!a) return;
        if (a.id === '' && a.message === '') {
          // clearAll special
          this.alerts = [];
          return;
        }
        this.pushAlert(a);
      })
    );
  }

  private pushAlert(alert: Alert) {
    if (this.alerts.length >= this.maxVisible) {
      const oldest = this.alerts[0];
      this.startClosing(oldest.id);
      setTimeout(() => {
        this.alerts = this.alerts.filter((x) => x.id !== oldest.id);
      }, this.leaveDuration);
    }

    this.alerts.push(alert);

    if (alert.autoClose && alert.autoClose > 0) {
      const t = timer(alert.autoClose).subscribe(() => {
        this.closeWithDelay(alert.id, this.leaveDuration);
        t.unsubscribe();
      });
    }
  }

  closeWithDelay(id: string, delay = 300) {
    this.startClosing(id);
    setTimeout(() => this.remove(id), delay);
  }

  startClosing(id: string) {
    const a = this.alerts.find((x) => x.id === id);
    if (a) a.closing = true;
  }

  remove(id: string) {
    this.alerts = this.alerts.filter((a) => a.id !== id);
  }

  trackById(_: number, a: Alert) {
    return a.id;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
