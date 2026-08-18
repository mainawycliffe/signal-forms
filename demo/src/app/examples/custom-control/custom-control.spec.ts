import { TestBed } from '@angular/core/testing';
import { CustomControl } from './custom-control';

// The custom control participates in validation exactly like a native input.
describe('CustomControl (star rating in a form)', () => {
  function create() {
    return TestBed.createComponent(CustomControl).componentInstance as any;
  }

  it('is invalid until a rating and a long-enough comment are provided', () => {
    const c = create();
    expect(c.reviewForm().valid()).toBe(false);

    c.model.set({ rating: 4, comment: 'Really enjoyed this session!' });
    expect(c.reviewForm().valid()).toBe(true);
  });

  it('flags a missing rating on the custom control field', () => {
    const c = create();
    c.model.set({ rating: 0, comment: 'A sufficiently long comment here' });
    expect(c.reviewForm.rating().valid()).toBe(false);
    expect(c.reviewForm.rating().errors().length).toBeGreaterThan(0);
  });
});
