import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  form,
  FormField,
  schema,
  required,
  min,
  apply,
  applyEach,
} from '@angular/forms/signals';

interface Address {
  street: string;
  city: string;
  zip: string;
}

// A reusable schema — define validation once, apply it anywhere.
const addressSchema = schema<Address>((address) => {
  required(address.street, { message: 'Street is required' });
  required(address.city, { message: 'City is required' });
  required(address.zip, { message: 'ZIP is required' });
});

@Component({
  selector: 'app-schemas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
  template: `
    <h2>Reusable schemas</h2>

    <form>
      <label>Name <input [formField]="orderForm.name" /></label>

      <fieldset>
        <legend>Billing address</legend>
        <input [formField]="orderForm.billing.street" placeholder="Street" />
        <input [formField]="orderForm.billing.city" placeholder="City" />
        <input [formField]="orderForm.billing.zip" placeholder="ZIP" />
      </fieldset>

      <fieldset>
        <legend>Items</legend>
        @for (item of model().items; track $index) {
          <div>
            <input [formField]="orderForm.items[$index].product" placeholder="Product" />
            <input type="number" [formField]="orderForm.items[$index].quantity" />
          </div>
        }
        <button type="button" (click)="addItem()">Add item</button>
      </fieldset>
    </form>

    <p>Form valid: {{ orderForm().valid() }}</p>
  `,
})
export class Schemas {
  protected readonly model = signal({
    name: '',
    billing: { street: '', city: '', zip: '' } as Address,
    items: [] as Array<{ product: string; quantity: number }>,
  });

  protected readonly orderForm = form(this.model, (path) => {
    required(path.name);

    // Mount the reusable schema at a nested path.
    apply(path.billing, addressSchema);

    // Apply rules to every array item — including ones added later.
    applyEach(path.items, (item) => {
      required(item.product, { message: 'Product is required' });
      min(item.quantity, 1, { message: 'Quantity must be at least 1' });
    });
  });

  addItem() {
    this.model.update((m) => ({
      ...m,
      items: [...m.items, { product: '', quantity: 1 }],
    }));
  }
}
