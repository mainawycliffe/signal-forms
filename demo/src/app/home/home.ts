import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXAMPLES } from '../app.routes';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header class="hero">
      <p class="eyebrow">Stable since Angular 22</p>
      <h1>Signal Forms</h1>
      <p class="lede">
        Angular's reactive model finally reaches forms. A form is just a
        <code>signal()</code> model plus a schema — fully typed, reactive, and testable
        without RxJS.
      </p>
    </header>

    <section class="cards">
      @for (ex of examples; track ex.path) {
        <a class="card" [routerLink]="ex.path">
          <h3>{{ ex.title }}</h3>
          <p>{{ ex.blurb }}</p>
          <span class="go">Open demo →</span>
        </a>
      }
    </section>
  `,
})
export class Home {
  protected readonly examples = EXAMPLES;
}
