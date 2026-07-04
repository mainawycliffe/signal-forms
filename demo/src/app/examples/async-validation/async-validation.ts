import { ChangeDetectionStrategy, Component, resource, signal } from '@angular/core';
import { form, FormField, required, minLength, validateAsync } from '@angular/forms/signals';

// Pretend this hits your backend.
async function isUsernameTaken(username: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return ['admin', 'root', 'angular'].includes(username.toLowerCase());
}

@Component({
  selector: 'app-async-validation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
  template: `
    <h2>Async validation</h2>

    <form>
      <label>
        Username
        <input [formField]="signupForm.username" />
      </label>

      @if (signupForm.username().pending()) {
        <p class="pending">Checking availability…</p>
      } @else if (signupForm.username().errors().length) {
        <p class="error">{{ signupForm.username().errors()[0].message }}</p>
      } @else if (signupForm.username().valid() && signupForm.username().dirty()) {
        <p class="ok">Username is available ✓</p>
      }
    </form>

    <p>Try "admin", "root" or "angular" to see it rejected.</p>
  `,
})
export class AsyncValidation {
  protected readonly model = signal({ username: '' });

  protected readonly signupForm = form(this.model, (path) => {
    // Sync validators run first — async only runs once they all pass.
    required(path.username);
    minLength(path.username, 3);

    validateAsync(path.username, {
      // What value to validate.
      params: ({ value }) => value(),
      // A resource() drives the async work; pending() is true while it runs.
      factory: (username) =>
        resource({
          params: username,
          loader: async ({ params }) => (params ? isUsernameTaken(params) : false),
        }),
      // Map the result to an error (or null for success).
      onSuccess: (taken) =>
        taken ? { kind: 'usernameTaken', message: 'Username is already taken' } : null,
      // onError is REQUIRED.
      onError: () => ({ kind: 'checkFailed', message: 'Could not verify username' }),
    });
  });
}
