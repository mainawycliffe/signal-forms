<template>
  <svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; display: block; max-width: 720px; margin: 0 auto">
    <defs>
      <linearGradient id="ag-mm" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#e23dae" />
        <stop offset="100%" stop-color="#8f2cd8" />
      </linearGradient>
      <marker id="mm-arrow" markerWidth="10" markerHeight="8" refX="7" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,6 Z" fill="#8f2cd8" />
      </marker>
    </defs>

    <!-- inputs: model signal + schema -->
    <rect x="8" y="45" width="190" height="56" rx="13" fill="#fff" stroke="#8f2cd8" stroke-width="2" />
    <text x="103" y="70" text-anchor="middle" fill="#1b1b28" style="font-family: ui-monospace, monospace; font-size: 16px; font-weight: 700">signal(model)</text>
    <text x="103" y="90" text-anchor="middle" fill="#6b6b7b" style="font-size: 12px">your data</text>

    <rect x="8" y="150" width="190" height="56" rx="13" fill="#fff" stroke="#e23dae" stroke-width="2" />
    <text x="103" y="175" text-anchor="middle" fill="#1b1b28" style="font-family: ui-monospace, monospace; font-size: 16px; font-weight: 700">schema</text>
    <text x="103" y="195" text-anchor="middle" fill="#6b6b7b" style="font-size: 12px">validation rules</text>

    <!-- arrows into form() -->
    <path d="M202,73 C240,73 240,110 270,120" fill="none" stroke="#8f2cd8" stroke-width="2.5" marker-end="url(#mm-arrow)" />
    <path d="M202,178 C240,178 240,140 270,130" fill="none" stroke="#8f2cd8" stroke-width="2.5" marker-end="url(#mm-arrow)" />

    <!-- form() -->
    <rect x="278" y="99" width="118" height="54" rx="27" fill="url(#ag-mm)" />
    <text x="337" y="132" text-anchor="middle" fill="#fff" style="font-family: ui-monospace, monospace; font-size: 20px; font-weight: 700">form()</text>

    <line x1="398" y1="126" x2="452" y2="126" stroke="#8f2cd8" stroke-width="2.5" marker-end="url(#mm-arrow)" />

    <!-- reactive field tree -->
    <rect x="460" y="42" width="252" height="168" rx="14" fill="#faf5fe" stroke="#e6d9f5" stroke-width="1.5" />
    <text x="478" y="70" fill="#8f2cd8" style="font-size: 14px; font-weight: 700">reactive field tree</text>

    <rect x="478" y="84" width="216" height="52" rx="9" fill="#fff" stroke="#e6e6ef" />
    <text x="492" y="105" fill="#1b1b28" style="font-family: ui-monospace, monospace; font-size: 14px">userForm.name</text>
    <text x="492" y="124" fill="#0f9d58" style="font-size: 12px">valid() · touched() · errors()</text>

    <rect x="478" y="144" width="216" height="52" rx="9" fill="#fff" stroke="#e6e6ef" />
    <text x="492" y="165" fill="#1b1b28" style="font-family: ui-monospace, monospace; font-size: 14px">userForm.email</text>
    <text x="492" y="184" fill="#dd0031" style="font-size: 12px">errors() · value() · dirty()</text>
  </svg>
</template>
