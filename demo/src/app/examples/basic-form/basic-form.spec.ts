import { TestBed } from '@angular/core/testing';
import { BasicForm } from './basic-form';

// Signal forms are just signals — no HTTP mocks, no RxJS, no detectChanges()
// needed to read state. Drive the model, read the derived field state.
describe('BasicForm (signal form)', () => {
  function create() {
    const fixture = TestBed.createComponent(BasicForm);
    // model & userForm are protected; reach them for the test.
    return fixture.componentInstance as unknown as {
      model: { set: (v: { name: string; email: string }) => void };
      userForm: any;
    };
  }

  it('is invalid when empty', () => {
    const cmp = create();
    expect(cmp.userForm().valid()).toBe(false);
    expect(cmp.userForm.name().valid()).toBe(false);
  });

  it('becomes valid once required fields are filled', () => {
    const cmp = create();
    cmp.model.set({ name: 'Ada', email: 'ada@example.com' });

    expect(cmp.userForm().valid()).toBe(true);
    expect(cmp.userForm.name().value()).toBe('Ada');
  });

  it('rejects a malformed email', () => {
    const cmp = create();
    cmp.model.set({ name: 'Ada', email: 'not-an-email' });

    expect(cmp.userForm.email().valid()).toBe(false);
    expect(cmp.userForm.email().errors().length).toBeGreaterThan(0);
  });
});
