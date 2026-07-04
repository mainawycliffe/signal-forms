import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EXAMPLES } from './app.routes';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="shell">
      <aside class="sidebar">
        <a class="brand" routerLink="/">
          <span class="brand-mark">▲</span>
          <span>
            <strong>Signal Forms</strong>
            <small>Angular 22 · live demos</small>
          </span>
        </a>

        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            Overview
          </a>
          @for (ex of examples; track ex.path) {
            <a [routerLink]="ex.path" routerLinkActive="active">
              {{ ex.title }}
            </a>
          }
        </nav>

        <footer>
          <a href="https://angular.dev/guide/forms/signals/overview" target="_blank" rel="noopener">
            angular.dev docs ↗
          </a>
        </footer>
      </aside>

      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {
  protected readonly examples = EXAMPLES;
}
