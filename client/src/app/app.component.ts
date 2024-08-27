import {Component} from '@angular/core';
import {RetirementComponent} from './retirement/retirement.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RetirementComponent],
  template: `
    <main>
        <div class="header">
          <span>&#128100;</span>
          <span>&#9881;</span>
        </div>

        <div class="main-container">
          <h1>{{ title }}</h1>
          <app-retirement></app-retirement>
          <div class="footer">
            <button class="primary-button">Back to Home</button>
          </div>
        </div>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'My retirement';
}
