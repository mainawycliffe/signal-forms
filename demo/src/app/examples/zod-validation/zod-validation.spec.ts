import { TestBed } from '@angular/core/testing';
import { ZodValidation } from './zod-validation';

describe('Zod validation', () => {
  function create() {
    return TestBed.createComponent(ZodValidation).componentInstance as any;
  }

  it('is invalid until the Zod schema passes', () => {
    const c = create();
    expect(c.signupForm().invalid()).toBe(true);

    c.model.set({ email: 'ada@example.com', password: 'longenough', age: 21 });
    expect(c.signupForm().valid()).toBe(true);
  });

  it('surfaces Zod errors on the matching fields', () => {
    const c = create();
    c.model.set({ email: 'nope', password: 'short', age: 10 });

    expect(c.signupForm.email().errors().length).toBeGreaterThan(0);
    expect(c.signupForm.password().errors().length).toBeGreaterThan(0);
    expect(c.signupForm.age().errors().length).toBeGreaterThan(0);
  });
});
