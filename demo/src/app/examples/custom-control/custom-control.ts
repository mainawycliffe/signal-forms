import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, min, minLength } from '@angular/forms/signals';
import { StarRating } from '../../controls/star-rating/star-rating';

@Component({
  selector: 'app-custom-control',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Just add the custom control to imports and bind it with [formField].
  imports: [FormField, StarRating],
  template: `
    <h2>Custom controls</h2>

    <form>
      <label>
        Your rating
        <app-star-rating [formField]="reviewForm.rating" />
      </label>
      @if (reviewForm.rating().touched() && reviewForm.rating().errors().length) {
        <p class="error">{{ reviewForm.rating().errors()[0].message }}</p>
      }

      <label>
        Review
        <textarea rows="3" [formField]="reviewForm.comment"></textarea>
      </label>
      @if (reviewForm.comment().touched() && reviewForm.comment().errors().length) {
        <p class="error">{{ reviewForm.comment().errors()[0].message }}</p>
      }
    </form>

    <p>Form valid: {{ reviewForm().valid() }}</p>
    <p class="muted">
      <code>&lt;app-star-rating&gt;</code> is a plain component implementing
      <code>FormValueControl</code> — no ControlValueAccessor.
    </p>
  `,
})
export class CustomControl {
  protected readonly model = signal({ rating: 0, comment: '' });

  protected readonly reviewForm = form(this.model, (path) => {
    required(path.rating, { message: 'Please pick a rating' });
    min(path.rating, 1, { message: 'Pick at least one star' });
    minLength(path.comment, 10, { message: 'Tell us a little more (10+ chars)' });
  });
}
