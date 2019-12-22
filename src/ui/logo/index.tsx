import React from "react";

type Props = {
  size?: number;
};

export const Logo: React.FC<Props> = ({ size = 82 }) => (
  <svg fill="none" height={size} viewBox="0 0 82 89" width={size}>
    <filter
      id="a"
      color-interpolation-filters="sRGB"
      filterUnits="userSpaceOnUse"
      height="66"
      width="66"
      x="8"
      y="23"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
      />
      <feOffset dy="8" />
      <feGaussianBlur stdDeviation="5.5" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.215686 0 0 0 0 0.407843 0 0 0 0 0.556863 0 0 0 0.25 0"
      />
      <feBlend
        in2="BackgroundImageFix"
        mode="normal"
        result="effect1_dropShadow"
      />
      <feBlend
        in="SourceGraphic"
        in2="effect1_dropShadow"
        mode="normal"
        result="shape"
      />
    </filter>
    <filter
      id="b"
      color-interpolation-filters="sRGB"
      filterUnits="userSpaceOnUse"
      height="82"
      width="82"
      x="0"
      y="0"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
      />
      <feOffset dy="1" />
      <feGaussianBlur stdDeviation="5.5" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.215686 0 0 0 0 0.407843 0 0 0 0 0.556863 0 0 0 0.3 0"
      />
      <feBlend
        in2="BackgroundImageFix"
        mode="normal"
        result="effect1_dropShadow"
      />
      <feBlend
        in="SourceGraphic"
        in2="effect1_dropShadow"
        mode="normal"
        result="shape"
      />
    </filter>
    <mask
      id="c"
      height="60"
      maskUnits="userSpaceOnUse"
      width="60"
      x="11"
      y="10"
    >
      <path
        clip-rule="evenodd"
        d="m41 70c16.5685 0 30-13.4315 30-30s-13.4315-30-30-30-30 13.4315-30 30 13.4315 30 30 30z"
        fill="#fff"
        fill-rule="evenodd"
      />
    </mask>
    <mask
      id="d"
      height="51"
      maskUnits="userSpaceOnUse"
      width="50"
      x="16"
      y="13"
    >
      <path
        clip-rule="evenodd"
        d="m51.1946 29.0278c.2-.1155.4205-.1872.651-.2017 1.0165-.064 3.9524-.1481 4.5891.9548.6368 1.1029-.9049 3.6028-1.4687 4.4505-.1277.1921-.3.347-.4998.4624l-6.0758 3.5078.8439 17.1004c.0118.2394-.1093.4659-.315.5891l-1.2493.7482c-.1645.0986-.3643.1193-.5456.0567l-.9468-.327c-.1586-.0547-.2899-.1688-.3662-.3182l-6.458-12.6316-6.3691 3.6772-.6869 4.6714c-.0476.3234-.3281.561-.6548.5548l-.498-.0094c-.2519-.0048-.4783-.1549-.5808-.385l-1.7897-4.016c-1.2302.0393-2.385-.0816-2.6949-.6182-.3095-.5361.1637-1.5919.8138-2.6329l-2.5635-3.531c-.148-.2038-.1647-.4749-.0429-.6954l.2408-.436c.158-.2861.504-.4101.8078-.2897l4.3622 1.7302 6.3805-3.6837-7.6587-11.8288c-.0912-.1409-.1244-.3115-.0925-.4763l.1903-.9835c.0364-.1883.1542-.3509.3219-.4441l1.2726-.7078c.2095-.1166.4662-.1082.6676.0218l14.2977 9.2231z"
        fill="#fff"
        fill-rule="evenodd"
      />
    </mask>
    <g filter="url(#a)">
      <path
        clip-rule="evenodd"
        d="m41 70c12.1503 0 22-9.8497 22-22s-9.8497-22-22-22-22 9.8497-22 22 9.8497 22 22 22z"
        fill="#000"
        fill-opacity=".01"
        fill-rule="evenodd"
      />
    </g>
    <g filter="url(#b)">
      <path
        clip-rule="evenodd"
        d="m41 70c16.5685 0 30-13.4315 30-30s-13.4315-30-30-30-30 13.4315-30 30 13.4315 30 30 30z"
        fill="#2196f3"
        fill-rule="evenodd"
      />
      <path
        d="m69 40c0 15.464-12.536 28-28 28s-28-12.536-28-28 12.536-28 28-28 28 12.536 28 28z"
        stroke="#42a5f5"
        stroke-width="4"
      />
    </g>
    <g mask="url(#c)" stroke="#42a5f5" stroke-width="4">
      <path d="m13.714 32.875h53.822" stroke-linecap="square" />
      <path d="m13.714 48.625h53.822" stroke-linecap="square" />
      <g stroke-linecap="round" stroke-linejoin="round">
        <path d="m40.25 14.5s-9.9622 11.5775-9.7465 26.25c.2156 14.6725 9.7465 24.75 9.7465 24.75" />
        <path d="m41 14.5s9.9622 11.5775 9.7465 26.25c-.2156 14.6725-9.7465 24.75-9.7465 24.75" />
      </g>
    </g>
    <path
      clip-rule="evenodd"
      d="m51.1946 29.0278c.2-.1155.4205-.1872.651-.2017 1.0165-.064 3.9524-.1481 4.5891.9548.6368 1.1029-.9049 3.6028-1.4687 4.4505-.1277.1921-.3.347-.4998.4624l-6.0758 3.5078.8439 17.1004c.0118.2394-.1093.4659-.315.5891l-1.2493.7482c-.1645.0986-.3643.1193-.5456.0567l-.9468-.327c-.1586-.0547-.2899-.1688-.3662-.3182l-6.458-12.6316-6.3691 3.6772-.6869 4.6714c-.0476.3234-.3281.561-.6548.5548l-.498-.0094c-.2519-.0048-.4783-.1549-.5808-.385l-1.7897-4.016c-1.2302.0393-2.385-.0816-2.6949-.6182-.3095-.5361.1637-1.5919.8138-2.6329l-2.5635-3.531c-.148-.2038-.1647-.4749-.0429-.6954l.2408-.436c.158-.2861.504-.4101.8078-.2897l4.3622 1.7302 6.3805-3.6837-7.6587-11.8288c-.0912-.1409-.1244-.3115-.0925-.4763l.1903-.9835c.0364-.1883.1542-.3509.3219-.4441l1.2726-.7078c.2095-.1166.4662-.1082.6676.0218l14.2977 9.2231z"
      fill="#fff"
      fill-rule="evenodd"
    />
    <g mask="url(#d)">
      <path
        d="m45.536 30.7839h1.30853v12.4084h-1.30853z"
        fill="#ebecf2"
        transform="matrix(.5 .8660254 -.8660254 .5 49.427639 -24.043383)"
      />
      <g clip-rule="evenodd" fill-rule="evenodd">
        <path
          d="m48.9193 55.8911c.2057-.1232.3268-.3496.315-.5891l-.8715-17.6594-9.2364 5.3326 6.685 13.0756c.0763.1494.2076.2635.3662.3182l.9468.327c.1813.0627.3811.0419.5456-.0567z"
          fill="#dee1e3"
        />
        <path
          d="m28.8366 47.8013-.089.0514 1.8162 4.0755c.1026.2302.3289.3802.5808.385l.498.0094c.3267.0062.6072-.2314.6548-.5548l.7256-4.9344-.463.2673c-.1433.0827-.2974.1445-.4589.1806-.5502.1228-1.9464.4138-3.2645.52z"
          fill="#dee1e3"
          opacity=".4"
        />
        <path
          d="m39.2482 43.2134 9.1294-5.2708.0993 2.0113-7.5209 6.5999z"
          fill="#c5c6cc"
        />
        <path
          d="m57.4822 32.9524-29.7909 17.1999s-.8791-1.5887-1.6121-2.8584c-.0089-.0153-.0172-.0309-.0251-.0466 1.3515.0977 4.0727-.0122 6.7119-1.5359l20.6246-11.9076c2.2916-1.3231 2.8529-3.0364 3.162-3.7729.4785 1.2851.9296 2.9215.9296 2.9215z"
          fill="#dee1e3"
        />
      </g>
    </g>
  </svg>
);
