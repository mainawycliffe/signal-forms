---
theme: seriph
title: 'Kill the Boilerplate: Moving from Reactive Event Trees to Angular Signal Forms'
info: |
  ## Kill the Boilerplate
  Moving from Reactive Event Trees to Angular Signal Forms — stable since v22.
colorSchema: light
layout: center
class: text-center
background: '#ffffff'
transition: slide-left
mdc: true
highlighter: shiki
---

<div
  v-motion
  :initial="{ y: -20, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { delay: 75 } }">
  <span class="pill">Stable since Angular v22</span>
</div>

<h1
  v-motion
  :initial="{ y: 40, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }">
  Kill the Boilerplate
</h1>

<div
  v-motion
  :initial="{ opacity: 0 }"
  :enter="{ opacity: 0.75, transition: { delay: 500 } }"
  class="text-xl -mt-2">
  Moving from Reactive Event Trees to Angular Signal Forms
</div>

<div
  v-motion
  :initial="{ opacity: 0 }"
  :enter="{ opacity: 0.6, transition: { delay: 800 } }"
  class="pt-12 text-base">
  Wycliffe Maina · 2026
</div>

<!--
Welcome. Today: how Angular got signals everywhere — except forms — and how
Signal Forms finally close that gap. Everything you'll see is real, compiling
Angular 22 code from the demo app in this repo.
-->

---
layout: default
---

# The journey

<v-clicks>

1. **Angular went all-in on signals** — a new reactivity model
2. **Forms were the biggest holdout** — still RxJS + `ControlValueAccessor`
3. **The old options fall short** — template-driven & reactive forms
4. **The gap** — signals everywhere, but forms weren't signal-native
5. **Signal Forms** — a model signal + a schema. Fully typed, reactive, testable.

</v-clicks>

<div v-click class="mt-8 opacity-70">
Then: validation, Zod, async, testing — with live, compiling examples.
</div>

---

# Angular's signal reactivity

Signals became the framework's core reactive primitive.

```ts {1|3-4|6-9|all}
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
Reach a form → drop out of signals, back into RxJS.
</div>

</div>
</div>

---

# Template-driven forms

Simple to start — but logic lives in the template and typing is weak.

```ts {all|7-9}
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

# Reactive forms

Typed-ish and explicit — but verbose, and reactivity is RxJS, not signals.

```ts {all|3-6|8-9|11}
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

- ❌ Verbose · ❌ `.value` vs `.getRawValue()` typing gaps
- ❌ `valueChanges` is RxJS · ❌ constant `toSignal()` glue

</v-clicks>

---
layout: statement
transition: fade-out
---

<h1
  v-motion
  :initial="{ scale: 0.92, opacity: 0 }"
  :enter="{ scale: 1, opacity: 1, transition: { duration: 450 } }">
  Signals everywhere.<br>Except forms.
</h1>

<div v-click class="mt-6 opacity-70 text-xl">
Your whole app is signals — then a form drops you into Observables and untyped glue.
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

```ts {1|3-6|all}
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
<code>form()</code> derives a <b>reactive field tree</b> — from <code>@angular/forms/signals</code>, stable in v22. No RxJS, no <code>ControlValueAccessor</code>.
</div>

---
layout: two-cols-header
---

# Simple example

::left::

<div class="pr-6">

```ts {1-3|5|7-11|all}
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

```html {1-3|5|all}
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

# Field state & errors

Call the field like a function → read its state signals.

```ts {all|2|4-9}
// every field exposes signals:
userForm.email().value()      // WritableSignal — current value
userForm.email().valid()      // boolean
userForm.email().touched()    // boolean
userForm.email().dirty()
userForm.email().errors()     // { kind, message }[]
userForm.email().pending()    // async validation in flight
userForm.email().submitting() // submit in progress
```

```html {all|1-3}
@if (userForm.email().touched() && userForm.email().errors().length) {
  <p class="error">{{ userForm.email().errors()[0].message }}</p>
}
```

---

# Validation

Built-in, custom, cross-field — all inside the schema function.

```ts {1-5|7-8|10-15|all}
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

# Conditional & reusable schemas

```ts {1-6|8-13|all}
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

```ts {1-2|4-8|10-13|all}
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

```ts {1|3-4|6-11|13-16|all}
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

```ts {1|3-4|6-12|14|all}
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

# Testing forms

No HTTP mocks, no RxJS, no `detectChanges()` — drive the model, read the state.

```ts {1-2|4-6|8-11|13-17|all}
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

# Migration: Reactive → Signal

::left::

**Reactive forms**

```ts
form = new FormGroup({
  name: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  }),
});

// value
this.form.getRawValue();
// changes — RxJS
this.form.valueChanges;
```

```html
<input [formControl]="form.controls.name" />
```

::right::

**Signal forms**

```ts
model = signal({ name: '' });

userForm = form(this.model, (p) => {
  required(p.name);
});

// value — a signal
this.model();
// changes — just derive
computed(() => this.model());
```

```html
<input [formField]="userForm.name" />
```

<div class="col-span-2 mt-4 opacity-70 text-sm">
⚠️ Schema fn isn't reactive · needs non-null defaults · best for signal-based / new apps · still maturing.
</div>

---
layout: center
class: text-center
---

# Recap

<div class="text-left inline-block mt-4">

<v-clicks>

- Angular went signal-first — **forms were the last holdout**
- Template-driven & reactive forms fought the signal model
- **Signal Forms = a signal model + a schema** — typed, reactive, testable
- Validation, **Zod**, async, submit, testing — no RxJS glue

</v-clicks>

</div>

<div class="mt-10 text-sm opacity-80">

**Resources** —
[Signal Forms guide](https://angular.dev/guide/forms/signals/overview) ·
[Validation](https://angular.dev/guide/forms/signals/validation) ·
[Schemas](https://angular.dev/guide/forms/signals/schemas) ·
[Migration](https://angular.dev/guide/forms/signals/migration) ·
[API](https://angular.dev/api/forms/signals/form)

</div>

<div
  v-motion
  :initial="{ scale: 0.8, opacity: 0 }"
  :enter="{ scale: 1, opacity: 1, transition: { delay: 400 } }"
  class="mt-8 text-2xl text-angular font-semibold">
Thank you <span class="heartbeat inline-block">💜</span>
</div>

<!--
All code in this deck compiles against Angular 22 — see the runnable demo/ app.
-->
