import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';

@Component({
  selector: 'app-field-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
  template: `
    <h2>Field state &amp; errors</h2>

    <form>
      <label>
        Email
        <input type="email" [formField]="userForm.email" />
      </label>

      <!-- Show the error only once the user has touched the field. -->
      @if (userForm.email().touched() && userForm.email().errors().length) {
        <p class="error">{{ userForm.email().errors()[0].message }}</p>
      }
    </form>

    <!-- Every piece of field state is a signal you can read anywhere. -->
    <ul>
      <li>value: "{{ userForm.email().value() }}"</li>
      <li>valid: {{ userForm.email().valid() }}</li>
      <li>touched: {{ userForm.email().touched() }}</li>
      <li>dirty: {{ userForm.email().dirty() }}</li>
      <li>errors: {{ userForm.email().errors().length }}</li>
    </ul>
  `,
})
export class FieldState {
  protected readonly model = signal({ email: '' });

  protected readonly userForm = form(this.model, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'That is not a valid email' });
  });
}
