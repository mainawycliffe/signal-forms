import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField, required, email } from '@angular/forms/signals';

@Component({
  selector: 'app-basic-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, JsonPipe],
  template: `
    <h2>Basic form</h2>

    <form>
      <label>
        Name
        <input [formField]="userForm.name" />
      </label>

      <label>
        Email
        <input type="email" [formField]="userForm.email" />
      </label>
    </form>

    <p>Valid: {{ userForm().valid() }}</p>
    <pre>{{ model() | json }}</pre>
  `,
})
export class BasicForm {
  // 1. The model is a plain writable signal — the single source of truth.
  protected readonly model = signal({ name: '', email: '' });

  // 2. form() derives a reactive field tree from the model + a schema.
  protected readonly userForm = form(this.model, (path) => {
    required(path.name);
    required(path.email);
    email(path.email);
  });
}
