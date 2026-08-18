import { Routes } from '@angular/router';

export const EXAMPLES = [
  { path: 'basic', title: 'Basic form', blurb: 'A signal model + form() + [formField]' },
  { path: 'field-state', title: 'Field state & errors', blurb: 'value / valid / touched / errors signals' },
  { path: 'validation', title: 'Validation', blurb: 'Built-in, custom, cross-field & conditional' },
  { path: 'schemas', title: 'Reusable schemas', blurb: 'schema(), apply() & applyEach()' },
  { path: 'zod', title: 'Zod validation', blurb: 'validateStandardSchema() with Zod' },
  { path: 'async', title: 'Async validation', blurb: 'validateAsync() with resource()' },
  { path: 'submit', title: 'Submitting', blurb: 'submit(), submitting() & server errors' },
  { path: 'custom-control', title: 'Custom controls', blurb: 'Build your own FormValueControl' },
] as const;

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
    title: 'Signal Forms — Demos',
  },
  {
    path: 'basic',
    loadComponent: () => import('./examples/basic-form/basic-form').then((m) => m.BasicForm),
  },
  {
    path: 'field-state',
    loadComponent: () => import('./examples/field-state/field-state').then((m) => m.FieldState),
  },
  {
    path: 'validation',
    loadComponent: () => import('./examples/validation/validation').then((m) => m.Validation),
  },
  {
    path: 'schemas',
    loadComponent: () => import('./examples/schemas/schemas').then((m) => m.Schemas),
  },
  {
    path: 'zod',
    loadComponent: () => import('./examples/zod-validation/zod-validation').then((m) => m.ZodValidation),
  },
  {
    path: 'async',
    loadComponent: () => import('./examples/async-validation/async-validation').then((m) => m.AsyncValidation),
  },
  {
    path: 'submit',
    loadComponent: () => import('./examples/submit-form/submit-form').then((m) => m.SubmitForm),
  },
  {
    path: 'custom-control',
    loadComponent: () =>
      import('./examples/custom-control/custom-control').then((m) => m.CustomControl),
  },
  { path: '**', redirectTo: '' },
];
