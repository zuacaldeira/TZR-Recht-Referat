import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PresentationComponent } from './shared/presentation/presentation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, PresentationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
