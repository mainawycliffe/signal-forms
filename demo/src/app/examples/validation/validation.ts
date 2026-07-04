import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  form,
  FormField,
  required,
  email,
  min,
  minLength,
  pattern,
  validate,
  applyWhen,
} from '@angular/forms/signals';

@Component({
  selector: 'app-validation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
  template: `
    <h2>Validation</h2>

    <form>
      <label>Email <input type="email" [formField]="userForm.email" /></label>
      <label>Age <input type="number" [formField]="userForm.age" /></label>
      <label>Password <input type="password" [formField]="userForm.password" /></label>
      <label>Confirm <input type="password" [formField]="userForm.confirmPassword" /></label>

      @if (userForm.confirmPassword().errors().length) {
        <p class="error">{{ userForm.confirmPassword().errors()[0].message }}</p>
      }

      <label>
        Country
        <select [formField]="userForm.country">
          <option value="">–</option>
          <option value="US">United States</option>
          <option value="KE">Kenya</option>
        </select>
      </label>

      <!-- zipCode is only required when country === 'US' -->
      <label>ZIP <input [formField]="userForm.zipCode" /></label>
      @if (userForm.zipCode().errors().length) {
        <p class="error">{{ userForm.zipCode().errors()[0].message }}</p>
      }
    </form>

    <p>Form valid: {{ userForm().valid() }}</p>
  `,
})
export class Validation {
  protected readonly model = signal({
    email: '',
    age: 0,
    password: '',
    confirmPassword: '',
    country: '',
    zipCode: '',
  });

  protected readonly userForm = form(this.model, (path) => {
    // Built-in validators
    required(path.email, { message: 'Email is required' });
    email(path.email);
    min(path.age, 18, { message: 'You must be at least 18' });
    minLength(path.password, 8, { message: 'At least 8 characters' });

    // Custom + cross-field: compare against a sibling with valueOf()
    validate(path.confirmPassword, ({ value, valueOf }) =>
      value() !== valueOf(path.password)
        ? { kind: 'passwordMismatch', message: 'Passwords do not match' }
        : null,
    );

    // Conditional rules — the schema function is NOT reactive, so branch with applyWhen()
    applyWhen(
      path,
      ({ valueOf }) => valueOf(path.country) === 'US',
      (usPath) => {
        required(usPath.zipCode, { message: 'ZIP is required in the US' });
        pattern(usPath.zipCode, /^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code' });
      },
    );
  });
}
