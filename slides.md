---
theme: seriph
title: 'The Next Generation of State: Mastering Stable Signal Forms in Angular'
info: |
  ## The Next Generation of State
  Mastering Stable Signal Forms in Angular — production patterns for Angular v22+.
colorSchema: dark
layout: center
class: text-center angular-cover
transition: slide-left
mdc: true
highlighter: shiki
---

<div
  v-motion
  :initial="{ y: -20, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { delay: 75 } }">
  <span class="pill">Angular v22+ · Stable API</span>
</div>

<h1
  v-motion
  :initial="{ y: 40, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }">
  The Next Generation<br>of State
</h1>

<div
  v-motion
  :initial="{ opacity: 0 }"
  :enter="{ opacity: 0.75, transition: { delay: 500 } }"
  class="text-2xl -mt-2 angular-subtitle">
  Mastering Stable Signal Forms in Angular
</div>

<div
  v-motion
  :initial="{ opacity: 0 }"
  :enter="{ opacity: 1, transition: { delay: 750 } }"
  class="pt-10">
  <span class="pill">NgKenya 2026</span>
</div>

<div
  v-motion
  :initial="{ opacity: 0 }"
  :enter="{ opacity: 0.6, transition: { delay: 950 } }"
  class="pt-4 text-base">
  Maina Wycliffe · Chief Builder
</div>

<div
  v-motion
  :initial="{ opacity: 0 }"
  :enter="{ opacity: 0.72, transition: { delay: 1100 } }"
  class="pt-2 text-sm presenter-links">
  <a href="https://mainawycliffe.dev">mainawycliffe.dev</a>
  <span>·</span>
  <a href="https://www.linkedin.com/in/mainawycliffe/">LinkedIn /in/mainawycliffe</a>
</div>

<img
  v-motion
  :initial="{ x: 45, y: 25, opacity: 0, rotate: 5 }"
  :enter="{ x: 0, y: 0, opacity: 1, rotate: -3, transition: { delay: 900, duration: 550 } }"
  :src="'/assets/angular-angie.png'"
  alt="Angie, the Angular mascot"
  class="angie angie-cover"
/>

<!--
Welcome. Signal Forms are now stable, so this is no longer a preview of a new
syntax. It is a production conversation: how a synchronous field graph changes
form architecture, where strict typing and centralized validation pay off, and
how to migrate without destabilizing customer-facing flows.

[Sources]
- https://angular.dev/guide/forms/signals/comparison
- https://angular.dev/press-kit
- https://angular.dev/assets/images/v21-event/mascot.png
-->

---
layout: default
---

# What we will master

<v-clicks>

1. **The architectural shift** — from event streams to a synchronous field graph
2. **The stable core** — model signals, field trees, bindings, and state
3. **Production patterns** — strict types and centralized validation
4. **Custom controls** — `FormValueControl` instead of CVA ceremony
5. **Incremental migration** — modernize one boundary at a time

</v-clicks>

<div v-click class="mt-8 opacity-70">
The core APIs are backed by the runnable Angular 22 demo in this repository.
</div>

---

# Angular made state synchronous

Signals give Angular a predictable graph of writable and derived state.

```ts {1|3-4|6-7|9-10|all}
const count = signal(0);                    // writable state

// derived state — recomputes only when `count` changes
const double = computed(() => count() * 2);

// side effects react automatically
effect(() => console.log('count is', count()));

count.set(1);   // double() → 2, effect logs "count is 1"
count.update(n => n + 1);
```

<div v-click class="mt-4">
  <SignalFlow />
</div>

<div v-click class="mt-2 opacity-70 text-sm text-center">
Signal inputs · queries · <code>linkedSignal</code> · <code>resource()</code> · zoneless — the whole framework leaned in.
</div>

---

# Forms: the biggest holdout

<div class="grid grid-cols-2 gap-8 mt-6">
<div
  v-motion
  :initial="{ x: -40, opacity: 0 }"
  :enter="{ x: 0, opacity: 1, transition: { delay: 100 } }">

**Went signal-first**

<v-clicks>

- Component state → `signal()`
- Inputs → `input()`
- Router data → `toSignal()`
- HTTP → `httpResource()`

</v-clicks>

</div>
<div
  v-motion
  :initial="{ x: 40, opacity: 0 }"
  :enter="{ x: 0, opacity: 1, transition: { delay: 250 } }">

**Stayed behind**

<v-clicks>

- `FormControl` / `FormGroup`
- `valueChanges` as `Observable`
- `ControlValueAccessor`
- Validators returning `null`/errors

</v-clicks>

<div v-click class="mt-4 text-angular font-semibold">
Reach a form → switch mental models, wire subscriptions, and bridge back to signals.
</div>

</div>
</div>

---

# Template-driven forms

Simple to start — but logic lives in the template and typing is weak.

```ts {3-6|8-9|all}
@Component({
  imports: [FormsModule],
  template: `
    <input name="email" [(ngModel)]="email" required email #e="ngModel" />
    <span *ngIf="e.invalid && e.touched">Invalid email</span>
  `,
})
export class Login {
  email = '';   // no derived state, validation lives in the template
}
```

<v-clicks>

- ❌ Weakly typed · ❌ validation scattered in the template
- ❌ Hard to unit-test · ❌ no clean derived/computed state

</v-clicks>

---

# Reactive Forms introduced an event boundary

Explicit and proven — but changes arrive as streams instead of synchronous state.

```ts {3-6|9-10|12|all}
export class Login {
  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  // changes arrive as an Observable — not a signal
  changes$ = this.form.controls.email.valueChanges;

  value = toSignal(this.form.valueChanges); // manual glue to reach signals
}
```

<v-clicks>

- More control-tree ceremony and subscription lifecycle decisions
- `valueChanges` is RxJS, so signal-based consumers need adapter code

</v-clicks>

---
layout: statement
class: angular-statement
transition: fade-out
---

<h1
  v-motion
  :initial="{ scale: 0.92, opacity: 0 }"
  :enter="{ scale: 1, opacity: 1, transition: { duration: 450 } }">
  Signals everywhere.<br>Except forms.
</h1>

<div v-click class="mt-6 opacity-70 text-xl">
Your component graph is synchronous — then a form reintroduces event streams and adapters.
</div>

<div v-click class="mt-10 max-w-3xl mx-auto">
  <SignalGap />
</div>

---
transition: slide-up
---

# Enter Signal Forms

<div
  v-motion
  :initial="{ y: 20, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { delay: 150 } }"
  class="text-2xl mt-4 mb-4 text-center">
A form is just a <code>signal()</code> model + a schema.
</div>

<div class="grid grid-cols-2 gap-6 items-center">
<div>

```ts {1-2|4-5|7-10|all}
import { form, required, email }
  from '@angular/forms/signals';

const model =
  signal({ name: '', email: '' });      // data

const userForm = form(model, (path) => {// + schema
  required(path.name);
  email(path.email);
});
```

</div>
<div v-click>
  <FormMentalModel />
</div>
</div>

<div v-click class="mt-3 opacity-70 text-sm text-center">
<code>form()</code> derives a <b>reactive field tree</b> — stable in Angular 22. Native inputs and new custom controls need no RxJS bridge.
</div>

<!--
[Sources]
- https://angular.dev/api/forms/signals/form
- https://angular.dev/guide/forms/signals/overview
-->

---
layout: two-cols-header
layoutClass: migration-slide
---

# Simple example

::left::

<div class="pr-6">

```ts {1-3|5-7|9-16|all}
import { Component, signal } from '@angular/core';
import { form, FormField, required, email }
  from '@angular/forms/signals';

// model = single source of truth
protected readonly model =
  signal({ name: '', email: '' });

protected readonly userForm = form(
  this.model,
  (path) => {
    required(path.name);
    required(path.email);
    email(path.email);
  },
);
```

</div>

::right::

<div class="pl-6">

```html {1|3-4|6|all}
<input [formField]="userForm.name" />

<input type="email"
       [formField]="userForm.email" />

<p>Valid: {{ userForm().valid() }}</p>
```

<v-click>

- `[formField]` binds an input to a field — **not** `[control]`
- Add `FormField` to the component's `imports`
- The model stays a plain signal you can read anywhere

</v-click>

</div>

---

# The model becomes the type contract

```ts {1-5|7-9|11-15|all}
type Signup = {
  name: string;
  email: string;
  plan: 'starter' | 'enterprise';
};

const model = signal<Signup>({
  name: '', email: '', plan: 'starter',
});

const signupForm = form(model, (path) => {
  required(path.email);       // path is typed as string
  required(path.plan);        // union is preserved
  // min(path.email, 18);      // compile-time type error
});
```

<div v-click class="takeaway mt-4">
Rename or reshape the model and TypeScript exposes every stale field path at build time.
</div>

<!--
[Sources]
- https://angular.dev/guide/forms/signals/models
- https://angular.dev/guide/forms/signals/comparison
-->

---

# Field state is readable, derived state

Call the field like a function → read its state signals.

```ts {2-3|4-8|all}
// every field exposes signals:
userForm.email().value()      // WritableSignal — current value
userForm.email().valid()      // boolean
userForm.email().touched()    // boolean
userForm.email().dirty()
userForm.email().errors()     // { kind, message }[]
userForm.email().pending()    // async validation in flight
userForm.email().submitting() // submit in progress
```

```html {all}
@if (userForm.email().touched() && userForm.email().errors().length) {
  <p class="error">{{ userForm.email().errors()[0].message }}</p>
}
```

---

# Validation belongs in the schema

Built-in, custom, cross-field — all inside the schema function.

```ts {1-5|7-12|all}
form(this.model, (path) => {
  required(path.email, { message: 'Email is required' });
  email(path.email);
  min(path.age, 18, { message: 'You must be at least 18' });
  minLength(path.password, 8);

  // custom + cross-field: read siblings with valueOf()
  validate(path.confirmPassword, ({ value, valueOf }) =>
    value() !== valueOf(path.password)
      ? { kind: 'passwordMismatch', message: 'Passwords do not match' }
      : null,
  );
});
```

<div v-click class="mt-2 opacity-70">
The schema function is <b>not reactive</b> — branch with <code>applyWhen()</code>, not <code>if</code>.
</div>

---

# Centralize rules as reusable schemas

```ts {1-6|8-9|11-14|16-18|all}
// Reusable: define validation once, apply it anywhere
const addressSchema = schema<Address>((a) => {
  required(a.street);
  required(a.city);
  required(a.zip);
});

form(this.model, (path) => {
  apply(path.billing, addressSchema);              // mount at a path

  applyEach(path.items, (item) => {                // every array item
    required(item.product);
    min(item.quantity, 1);
  });

  applyWhen(path, ({ valueOf }) =>                 // conditional rules
    valueOf(path.country) === 'US', (p) => required(p.zipCode));
});
```

---

# Validation with Zod

Zod implements the **Standard Schema** spec — Angular speaks it natively.

```ts {1-2|4-8|10-12|all}
import { validateStandardSchema } from '@angular/forms/signals';
import * as z from 'zod';

const signupSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
  age: z.number().min(18, 'You must be at least 18'),
});

protected readonly signupForm = form(this.model, (path) => {
  validateStandardSchema(path, signupSchema);   // one line wires it in
});
```

<div v-click class="mt-4 opacity-70">
Same one-liner works with Valibot, ArkType — anything Standard-Schema compatible.
</div>

---

# Async validation

`validateAsync()` runs a `resource()` — only after sync validators pass.

```ts {1|2-3|5-11|13-16|all}
validateAsync(path.username, {
  // what value to validate
  params: ({ value }) => value(),

  // a resource() drives the async work; pending() is true while it runs
  factory: (username) =>
    resource({
      params: username,
      loader: async ({ params }) =>
        params ? isUsernameTaken(params) : false,
    }),

  // map the result → an error (or null for success)
  onSuccess: (taken) =>
    taken ? { kind: 'usernameTaken', message: 'Username is taken' } : null,
  onError: () => ({ kind: 'checkFailed', message: 'Could not verify' }),
});
```

<div v-click class="opacity-70">
<code>pending()</code> → show a spinner. <code>validateHttp()</code> is the HTTP-specific shorthand.
</div>

---

# Submitting

`submit()` tracks `submitting()` and maps server errors back onto fields.

```ts {1-3|5-12|13-14|all}
submit(this.loginForm, async () => {
  const value = this.model();
  await api.register(value);

  if (value.email === takenEmail) {
    // return errors → attached to a specific field
    return {
      kind: 'server',
      message: 'That email is already registered',
      fieldTree: this.loginForm.email,
    };
  }
  return undefined; // success
});
```

```html {all}
<button [disabled]="loginForm().invalid() || loginForm().submitting()">
  {{ loginForm().submitting() ? 'Signing up…' : 'Sign up' }}
</button>
```

---

# Custom controls lose the CVA ceremony

```ts {1-2|4-7|8-12|all}
import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-star-rating',
  template: `<!-- stars update value.set(...) -->`,
})
export class StarRating implements FormValueControl<number> {
  readonly value = model(0);           // required contract
  readonly disabled = input(false);    // optional field state
  readonly errors =
    input<readonly ValidationError.WithOptionalFieldTree[]>([]);
}
```

```html
<app-star-rating [formField]="reviewForm.rating" />
```

<div v-click class="takeaway mt-3">
One model signal is enough for binding; opt into only the state your component needs.
</div>

<!--
Custom signal controls also work in Reactive and Template-Driven forms, which
makes this a useful first migration seam.

[Sources]
- https://angular.dev/guide/forms/signals/custom-controls
- https://angular.dev/api/forms/signals/FormValueControl
-->

---

# Testing forms

No HTTP mocks, no RxJS, no `detectChanges()` — drive the model, read the state.

```ts {1-2|4-7|9-13|15-19|all}
import { TestBed } from '@angular/core/testing';
import { BasicForm } from './basic-form';

it('is invalid when empty', () => {
  const cmp = TestBed.createComponent(BasicForm).componentInstance as any;
  expect(cmp.userForm().valid()).toBe(false);
});

it('becomes valid once filled', () => {
  const cmp = TestBed.createComponent(BasicForm).componentInstance as any;
  cmp.model.set({ name: 'Ada', email: 'ada@example.com' });
  expect(cmp.userForm().valid()).toBe(true);
});

it('rejects a bad email', () => {
  const cmp = TestBed.createComponent(BasicForm).componentInstance as any;
  cmp.model.set({ name: 'Ada', email: 'nope' });
  expect(cmp.userForm.email().errors().length).toBeGreaterThan(0);
});
```

---
layout: two-cols-header
---

# Migrate one boundary at a time

::left::

**Bottom-up: modernize a leaf**

```ts {1-3|5-8|all}
email = new SignalFormControl('', (p) => {
  required(p);
});

form = new FormGroup({
  name: new FormControl(''),
  email: this.email,
});
```

```html
<input [formField]="email.fieldTree" />
```

::right::

**Top-down: preserve a complex island**

```ts {1-4|6-9|11|all}
const address = new FormGroup({
  street: new FormControl(''),
  city: new FormControl(''),
});

const model = signal({
  customerName: '',
  shippingAddress: address,
});

const checkout = compatForm(model);
```

::bottom::

<div class="migration-path">
<span>New features</span><b>→</b>
<span><code>FormValueControl</code> seams</span><b>→</b>
<span>Compatibility adapters for complex islands</span>
<strong>Modernize without a rewrite.</strong>
</div>

<!--
SignalFormControl and compatForm live under @angular/forms/signals/compat.
Do not implement both ControlValueAccessor and FormValueControl on one component.

[Sources]
- https://angular.dev/guide/forms/signals/migration
-->

---
layout: default
class: text-center angular-finale
---

<div class="finale-grid">
<section class="finale-copy text-left">
<span class="pill">One idea to take home</span>

<h1>Make your next form the migration seam.</h1>

<p class="finale-lede">
Adopt the signal model where it creates value now—without rewriting the architecture around it.
</p>

<div class="finale-steps">
<div class="finale-step">
<span>01</span>
<p><strong>Model first</strong><small>Let strict types define the field graph.</small></p>
</div>
<div class="finale-step">
<span>02</span>
<p><strong>Schema once</strong><small>Centralize validation and reuse the rules.</small></p>
</div>
<div class="finale-step">
<span>03</span>
<p><strong>Migrate safely</strong><small>Use control and compatibility boundaries.</small></p>
</div>
</div>

<div class="finale-links">
<a href="https://mainawycliffe.dev">mainawycliffe.dev</a>
<a href="https://www.linkedin.com/in/mainawycliffe/">LinkedIn /in/mainawycliffe</a>
<a href="https://angular.dev/guide/forms/signals/overview">Angular docs</a>
</div>
</section>

<aside class="finale-visual">
<img
:src="'/assets/angular-angie.png'"
alt="Angie, the Angular mascot"
class="finale-angie"
/>

<a class="repo-qr" href="https://github.com/mainawycliffe/signal-forms">
<img :src="'/assets/signal-forms-repository-qr.png'" alt="QR code for the Signal Forms repository" />
<strong>Run the demo</strong>
<span>github.com/mainawycliffe/<br>signal-forms</span>
</a>
</aside>
</div>

<!--
All code in this deck compiles against Angular 22 — see the runnable demo/ app.

[Sources]
- https://angular.dev/press-kit
- https://angular.dev/assets/images/v21-event/mascot.png
- https://github.com/mainawycliffe/signal-forms
-->
