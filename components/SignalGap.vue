<template>
  <svg viewBox="0 0 780 130" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; display: block; max-width: 780px; margin: 0 auto">
    <defs>
      <linearGradient id="ag-gap" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#e23dae" />
        <stop offset="100%" stop-color="#8f2cd8" />
      </linearGradient>
    </defs>

    <text x="215" y="24" text-anchor="middle" fill="#8f2cd8" style="font-size: 13px; font-weight: 600">all-in on signals</text>
    <text x="676" y="24" text-anchor="middle" fill="#dd0031" style="font-size: 13px; font-weight: 600">the holdout</text>

    <!-- connected signal adopters -->
    <g fill="#fff" style="font-family: ui-monospace, monospace; font-size: 14px; font-weight: 600">
      <rect x="10" y="48" width="112" height="44" rx="11" fill="url(#ag-gap)" />
      <text x="66" y="75" text-anchor="middle" fill="#fff">Components</text>

      <rect x="132" y="48" width="92" height="44" rx="11" fill="url(#ag-gap)" />
      <text x="178" y="75" text-anchor="middle" fill="#fff">Inputs</text>

      <rect x="234" y="48" width="96" height="44" rx="11" fill="url(#ag-gap)" />
      <text x="282" y="75" text-anchor="middle" fill="#fff">Router</text>

      <rect x="340" y="48" width="84" height="44" rx="11" fill="url(#ag-gap)" />
      <text x="382" y="75" text-anchor="middle" fill="#fff">HTTP</text>
    </g>

    <!-- solid links -->
    <line x1="122" y1="70" x2="132" y2="70" stroke="#8f2cd8" stroke-width="3" />
    <line x1="224" y1="70" x2="234" y2="70" stroke="#8f2cd8" stroke-width="3" />
    <line x1="330" y1="70" x2="340" y2="70" stroke="#8f2cd8" stroke-width="3" />

    <!-- broken gap -->
    <line x1="430" y1="70" x2="610" y2="70" stroke="#dd0031" stroke-width="3" stroke-dasharray="7 8" />
    <text x="520" y="60" text-anchor="middle" fill="#dd0031" style="font-size: 20px; font-weight: 700">✕</text>

    <!-- the holdout: forms, disconnected -->
    <rect x="616" y="48" width="120" height="44" rx="11" fill="#fff" stroke="#dd0031" stroke-width="2" stroke-dasharray="6 5" />
    <text x="676" y="75" text-anchor="middle" fill="#dd0031" style="font-family: ui-monospace, monospace; font-size: 14px; font-weight: 700">Forms</text>

    <text x="676" y="112" text-anchor="middle" fill="#6b6b7b" style="font-size: 12px">still RxJS + CVA</text>
  </svg>
</template>
