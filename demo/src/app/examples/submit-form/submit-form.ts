import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  form,
  FormField,
  submit,
  required,
  email,
  minLength,
} from '@angular/forms/signals';

@Component({
  selector: 'app-submit-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
  template: `
    <h2>Submitting</h2>

    <form (submit)="onSubmit($event)">
      <label>Email <input type="email" [formField]="loginForm.email" /></label>
      <label>Password <input type="password" [formField]="loginForm.password" /></label>

      <!-- Server errors are mapped straight back onto the field. -->
      @if (loginForm.email().errors().length) {
        <p class="error">{{ loginForm.email().errors()[0].message }}</p>
      }

      <button [disabled]="loginForm().invalid() || loginForm().submitting()">
        {{ loginForm().submitting() ? 'Signing up…' : 'Sign up' }}
      </button>
    </form>

    @if (result()) {
      <p class="ok">{{ result() }}</p>
    }
    <p>Tip: use "taken@example.com" to see a server-side error.</p>
  `,
})
export class SubmitForm {
  protected readonly model = signal({ email: '', password: '' });
  protected readonly result = signal('');

  protected readonly loginForm = form(this.model, (path) => {
    required(path.email);
    email(path.email);
    required(path.password);
    minLength(path.password, 8);
  });

  onSubmit(event: Event) {
    event.preventDefault();

    // submit() blocks concurrent submits and tracks submitting() for you.
    submit(this.loginForm, async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const value = this.model();
      if (value.email === 'taken@example.com') {
        // Return errors to attach them to specific fields.
        return {
          kind: 'server',
          message: 'That email is already registered',
          fieldTree: this.loginForm.email,
        };
      }

      this.result.set(`Welcome, ${value.email}!`);
      return undefined; // success
    });
  }
}
