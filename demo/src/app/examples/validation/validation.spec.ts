import { TestBed } from '@angular/core/testing';
import { Validation } from './validation';

// Signal forms are pure signals: drive the model, read the derived state.
describe('Validation form', () => {
  function create() {
    return TestBed.createComponent(Validation).componentInstance as any;
  }

  it('requires a valid email', () => {
    const c = create();
    expect(c.userForm.email().valid()).toBe(false);

    c.model.update((m: any) => ({ ...m, email: 'not-an-email' }));
    expect(c.userForm.email().valid()).toBe(false);

    c.model.update((m: any) => ({ ...m, email: 'ada@example.com' }));
    expect(c.userForm.email().valid()).toBe(true);
  });

  it('enforces a minimum age of 18', () => {
    const c = create();
    c.model.update((m: any) => ({ ...m, age: 16 }));
    expect(c.userForm.age().valid()).toBe(false);

    c.model.update((m: any) => ({ ...m, age: 21 }));
    expect(c.userForm.age().valid()).toBe(true);
  });

  it('cross-field: confirmPassword must match password', () => {
    const c = create();
    c.model.update((m: any) => ({ ...m, password: 'longenough', confirmPassword: 'different' }));
    expect(
      c.userForm.confirmPassword().errors().some((e: any) => e.kind === 'passwordMismatch'),
    ).toBe(true);

    c.model.update((m: any) => ({ ...m, confirmPassword: 'longenough' }));
    expect(
      c.userForm.confirmPassword().errors().some((e: any) => e.kind === 'passwordMismatch'),
    ).toBe(false);
  });

  it('conditional: ZIP is required only when country is US', () => {
    const c = create();

    // Non-US → no ZIP rule applies
    c.model.update((m: any) => ({ ...m, country: 'KE' }));
    expect(c.userForm.zipCode().errors().length).toBe(0);

    // US → ZIP becomes required, then must match the pattern
    c.model.update((m: any) => ({ ...m, country: 'US' }));
    expect(c.userForm.zipCode().valid()).toBe(false);

    c.model.update((m: any) => ({ ...m, zipCode: '90210' }));
    expect(c.userForm.zipCode().valid()).toBe(true);
  });
});
