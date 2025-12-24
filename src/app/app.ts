import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './components/alert-component/alert-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class App {
  protected readonly title = signal('FormularioGeneraciones');
}
