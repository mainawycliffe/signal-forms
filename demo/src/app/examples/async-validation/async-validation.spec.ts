import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { AsyncValidation } from './async-validation';

describe('AsyncValidation', () => {
  it('rejects a taken username after the async check resolves', fakeAsync(() => {
    const fixture = TestBed.createComponent(AsyncValidation);
    const c = fixture.componentInstance as any;

    c.model.set({ username: 'admin' });
    fixture.detectChanges(); // kick off the resource-backed async validator
    tick(1000); // resolve the simulated 800ms lookup
    fixture.detectChanges();

    expect(c.signupForm.username().errors().some((e: any) => e.kind === 'usernameTaken')).toBe(true);
  }));

  it('accepts an available username', fakeAsync(() => {
    const fixture = TestBed.createComponent(AsyncValidation);
    const c = fixture.componentInstance as any;

    c.model.set({ username: 'wycliffe' });
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(c.signupForm.username().valid()).toBe(true);
  }));
});
