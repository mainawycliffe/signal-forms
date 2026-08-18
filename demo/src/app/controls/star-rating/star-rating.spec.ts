import { TestBed } from '@angular/core/testing';
import { StarRating } from './star-rating';

describe('StarRating custom control', () => {
  it('renders five stars and updates value() on click', () => {
    const fixture = TestBed.createComponent(StarRating);
    fixture.detectChanges();

    const stars = fixture.nativeElement.querySelectorAll('button.star') as NodeListOf<HTMLButtonElement>;
    expect(stars.length).toBe(5);

    stars[2].click();
    expect(fixture.componentInstance.value()).toBe(3);
  });

  it('disables the buttons when the disabled input is set', () => {
    const fixture = TestBed.createComponent(StarRating);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const first = fixture.nativeElement.querySelector('button.star') as HTMLButtonElement;
    expect(first.disabled).toBe(true);
  });
});
