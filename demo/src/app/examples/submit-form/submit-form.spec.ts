import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { SubmitForm } from './submit-form';

describe('SubmitForm', () => {
  function create() {
    return TestBed.createComponent(SubmitForm).componentInstance as any;
  }

  it('completes a successful submission', fakeAsync(() => {
    const c = create();
    c.model.set({ email: 'ada@example.com', password: 'longenough' });

    c.onSubmit(new Event('submit'));
    tick(1000); // resolve the fake server call
    expect(c.result()).toContain('ada@example.com');
  }));

  it('maps a server error back onto the email field', fakeAsync(() => {
    const c = create();
    c.model.set({ email: 'taken@example.com', password: 'longenough' });

    c.onSubmit(new Event('submit'));
    tick(1000);
    expect(c.loginForm.email().errors().some((e: any) => e.kind === 'server')).toBe(true);
    expect(c.result()).toBe('');
  }));
});
