import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, validateStandardSchema } from '@angular/forms/signals';
import * as z from 'zod';

// A Zod schema (Zod implements the Standard Schema spec, so Angular understands it).
const signupSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'At least 8 characters'),
  age: z.number().min(18, 'You must be at least 18'),
});

@Component({
  selector: 'app-zod-validation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
  template: `
    <h2>Validation with Zod</h2>

    <form>
      <label>Email <input type="email" [formField]="signupForm.email" /></label>
      @if (signupForm.email().errors().length) {
        <p class="error">{{ signupForm.email().errors()[0].message }}</p>
      }

      <label>Password <input type="password" [formField]="signupForm.password" /></label>
      @if (signupForm.password().errors().length) {
        <p class="error">{{ signupForm.password().errors()[0].message }}</p>
      }

      <label>Age <input type="number" [formField]="signupForm.age" /></label>
      @if (signupForm.age().errors().length) {
        <p class="error">{{ signupForm.age().errors()[0].message }}</p>
      }
    </form>

    <p>Form valid: {{ signupForm().valid() }}</p>
  `,
})
export class ZodValidation {
  protected readonly model = signal({ email: '', password: '', age: 0 });

  // One line wires the entire Zod schema into the field tree.
  protected readonly signupForm = form(this.model, (path) => {
    validateStandardSchema(path, signupSchema);
  });
}
