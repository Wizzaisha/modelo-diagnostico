import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { StepperModel } from '../../models/steps';
import { CommonModule } from '@angular/common';
import { catchError, firstValueFrom, Observable, of, take, timeout } from 'rxjs';

@Component({
  selector: 'app-stepper-component',
  imports: [CommonModule],
  templateUrl: './stepper-component.html',
  styleUrl: './stepper-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  @Input() steps: StepperModel[] = [];
  @Input() startIndex = 0;

  @Input() canProceed: (index: number) => boolean = () => true;
  @Input() onBeforeNext?: (index: number) => boolean | Promise<boolean> | Observable<boolean>;

  @Output() stepChanged = new EventEmitter<number>();

  @Output() stepCompleted = new EventEmitter<number>();

  @Output() blocked = new EventEmitter<number>();

  currentIndex = 0;
  completed: boolean[] = [];
  loading = false;

  ngOnInit() {
    this.currentIndex = Math.max(0, Math.min(this.startIndex, Math.max(0, this.steps.length - 1)));
    this.completed = new Array(this.steps.length).fill(false);
    for (let i = 0; i < this.currentIndex; i++) {
      this.completed[i] = true;
    }
  }

  getStepClass(i: number): string {
    if (!this.completed || this.completed.length <= i) {
      return 'step';
    }

    if (i === this.currentIndex || this.completed[i]) {
      return 'step step-primary';
    }

    if (this.steps[i]?.disabled) {
      return 'step opacity-50 cursor-not-allowed';
    }

    return 'step';
  }

  goTo(i: number) {
    if (i < 0 || i >= this.steps.length) return;
    if (this.steps[i]?.disabled) return;
    this.currentIndex = i;
    this.stepChanged.emit(this.currentIndex);
  }

  async next() {
    if (this.loading) return;

    const okSync = this.safeCallCanProceed(this.currentIndex);
    if (!okSync) {
      this.blocked.emit(this.currentIndex);
      return;
    }

    if (this.onBeforeNext) {
      this.loading = true;
      try {
        const result = this.onBeforeNext(this.currentIndex);
        let okAsync = true;

        if (result instanceof Observable) {
          okAsync = await firstValueFrom(
            result.pipe(
              take(1),
              timeout(8000),
              catchError(() => of(false))
            )
          );
        } else if (result instanceof Promise) {
          okAsync = await result;
        } else {
          okAsync = !!result;
        }

        if (!okAsync) {
          this.blocked.emit(this.currentIndex);
          this.loading = false;
          return;
        }
      } catch (err) {
        console.error('Error en onBeforeNext:', err);
        this.blocked.emit(this.currentIndex);
        this.loading = false;
        return;
      } finally {
        this.loading = false;
      }
    }

    this.completed[this.currentIndex] = true;
    this.stepCompleted.emit(this.currentIndex);

    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++;
      this.stepChanged.emit(this.currentIndex);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.completed[this.currentIndex + 1] = false;
      this.stepChanged.emit(this.currentIndex);
    }
  }

  isLast(): boolean {
    return this.currentIndex === this.steps.length - 1;
  }

  private safeCallCanProceed(index: number): boolean {
    try {
      return this.canProceed ? !!this.canProceed(index) : true;
    } catch (e) {
      console.error('canProceed threw an error', e);
      return false;
    }
  }

  public setCompleted(index: number, value: boolean) {
    if (index >= 0 && index < this.completed.length) {
      this.completed[index] = value;
    }
  }
}
