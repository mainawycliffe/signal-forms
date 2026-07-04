<template>
  <svg viewBox="0 0 660 150" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; display: block; max-width: 680px; margin: 0 auto">
    <defs>
      <linearGradient id="ag-flow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#e23dae" />
        <stop offset="100%" stop-color="#8f2cd8" />
      </linearGradient>
      <marker id="ag-arrow" markerWidth="10" markerHeight="8" refX="7" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6 Z" fill="#8f2cd8" />
      </marker>
    </defs>

    <text x="330" y="20" text-anchor="middle" fill="#dd0031" style="font-size: 14px; font-weight: 600">
      dependencies auto-tracked
    </text>

    <rect x="10" y="50" width="170" height="52" rx="13" fill="url(#ag-flow)" />
    <text x="95" y="82" text-anchor="middle" fill="#fff" style="font-family: ui-monospace, monospace; font-size: 19px; font-weight: 700">signal()</text>
    <text x="95" y="128" text-anchor="middle" fill="#6b6b7b" style="font-size: 13px">writable state</text>

    <line x1="184" y1="76" x2="240" y2="76" stroke="#8f2cd8" stroke-width="2.5" marker-end="url(#ag-arrow)" />

    <rect x="245" y="50" width="170" height="52" rx="13" fill="url(#ag-flow)" />
    <text x="330" y="82" text-anchor="middle" fill="#fff" style="font-family: ui-monospace, monospace; font-size: 19px; font-weight: 700">computed()</text>
    <text x="330" y="128" text-anchor="middle" fill="#6b6b7b" style="font-size: 13px">derived · cached</text>

    <line x1="419" y1="76" x2="475" y2="76" stroke="#8f2cd8" stroke-width="2.5" marker-end="url(#ag-arrow)" />

    <rect x="480" y="50" width="170" height="52" rx="13" fill="url(#ag-flow)" />
    <text x="565" y="82" text-anchor="middle" fill="#fff" style="font-family: ui-monospace, monospace; font-size: 19px; font-weight: 700">effect()</text>
    <text x="565" y="128" text-anchor="middle" fill="#6b6b7b" style="font-size: 13px">side effects</text>
  </svg>
</template>
