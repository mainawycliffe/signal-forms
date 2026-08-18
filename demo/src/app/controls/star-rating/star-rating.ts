import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

/**
 * A reusable custom form control.
 *
 * Implementing `FormValueControl<number>` is the entire contract: expose a
 * `value` model signal and you can bind it with `[formField]` exactly like a
 * native `<input>`. The optional `disabled` / `errors` inputs are populated by
 * the `FormField` directive from the field's state.
 */
@Component({
  selector: 'app-star-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stars" role="radiogroup" [attr.aria-invalid]="errors().length > 0">
      @for (star of stars; track star) {
        <button
          type="button"
          class="star"
          [class.filled]="star <= value()"
          [attr.aria-label]="star + ' stars'"
          [disabled]="disabled()"
          (click)="value.set(star)">
          ★
        </button>
      }
    </div>
  `,
})
export class StarRating implements FormValueControl<number> {
  /** REQUIRED by FormValueControl — the two-way value bound to the field. */
  readonly value = model(0);

  /** Optional — the FormField directive drives these from field state. */
  readonly disabled = input(false);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);

  protected readonly stars = [1, 2, 3, 4, 5] as const;
}
