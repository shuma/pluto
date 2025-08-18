import React from "react";

interface PhoneEmulatorProps {
  className?: string;
  children?: React.ReactNode;
}

export const PhoneEmulator: React.FC<PhoneEmulatorProps> = ({
  className = "",
  children,
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 427 881"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        filter="url(#shadow)"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="16"
              flood-color="rgba(0,0,0,0.15)"
            ></feDropShadow>
          </filter>
          <filter
            id="filter0_f_2905_1090"
            x="-0.166992"
            y="0.166504"
            width="427"
            height="880.667"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="0.5"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter1_f_2905_1090"
            x="6.33236"
            y="6.33382"
            width="414"
            height="868"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="0.333333"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter2_f_2905_1090"
            x="244.143"
            y="44.0955"
            width="6.19085"
            height="11.143"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="0.928572"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter3_f_2905_1090"
            x="244.762"
            y="45.8098"
            width="4.95257"
            height="7.71429"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="0.928572"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter4_f_2905_1090"
            x="245.808"
            y="45.7839"
            width="3.86682"
            height="6.88293"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="0.619048"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter5_f_2905_1090"
            x="250.332"
            y="44.0955"
            width="6.19085"
            height="11.143"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="0.928572"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter6_f_2905_1090"
            x="250.951"
            y="45.8098"
            width="4.95257"
            height="7.71429"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="0.928572"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter7_f_2905_1090"
            x="250.991"
            y="45.7839"
            width="3.86682"
            height="6.88293"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="0.619048"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter8_f_2905_1090"
            x="169.666"
            y="42.6468"
            width="7.80012"
            height="14.0399"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="1.17"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter9_f_2905_1090"
            x="170.446"
            y="44.807"
            width="6.23957"
            height="9.72004"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="1.17"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter10_f_2905_1090"
            x="171.276"
            y="45.5545"
            width="3.31098"
            height="7.11225"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="0.39"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter11_f_2905_1090"
            x="161.865"
            y="42.6468"
            width="7.80012"
            height="14.0399"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="1.17"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter12_f_2905_1090"
            x="162.645"
            y="44.807"
            width="6.23957"
            height="9.72004"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="1.17"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter13_f_2905_1090"
            x="164.744"
            y="45.5545"
            width="3.31098"
            height="7.11225"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="0.39"
              result="effect1_foregroundBlur_2905_1090"
            ></feGaussianBlur>
          </filter>
          <clipPath id="clip0_2905_1090">
            <rect width="426.667" height="880.667" rx="70" fill="white"></rect>
          </clipPath>
          <clipPath id="clip1_2905_1090">
            <rect
              x="18"
              y="18"
              width="390"
              height="844"
              rx="55"
              fill="white"
            ></rect>
          </clipPath>
        </defs>
        <g clipPath="url(#clip0_2905_1090)">
          <rect width="426.667" height="880.667" rx="70" fill="black"></rect>
          <rect
            x="3.83268"
            y="3.83366"
            width="419"
            height="873"
            rx="66.1667"
            className="stroke-[#dcdcdf] dark:stroke-[#454548]"
            strokeWidth="4.33333"
          ></rect>
          <rect
            x="0.833333"
            y="0.833333"
            width="425"
            height="879"
            rx="69.1667"
            className="stroke-[#c1c2c4] dark:stroke-[#37373a]"
            strokeWidth="1.66667"
          ></rect>
          <g opacity="0.9" filter="url(#filter0_f_2905_1090)">
            <rect
              x="1.66602"
              y="2"
              width="423.333"
              height="877"
              rx="68.6667"
              className="stroke-[#b2b2b9] dark:stroke-[#454548]"
              strokeWidth="1.66667"
            ></rect>
          </g>
          <g opacity="0.8" filter="url(#filter1_f_2905_1090)">
            <rect
              x="7.33268"
              y="7.33366"
              width="412"
              height="866"
              rx="62.6667"
              stroke="#646464"
              strokeWidth="0.666667"
            ></rect>
          </g>
          <rect
            x="18"
            y="18"
            width="390"
            height="844"
            rx="55"
            className="fill-muted/10 dark:fill-muted/50"
            clipPath="url(#clip1_2905_1090)"
          ></rect>
          <foreignObject x="18" y="18" width="390" height="844">
            <div
              className="size-full pt-[62px] pb-[34px] overflow-hidden rounded-[55.75px] object-contain"
              style={{ transformOrigin: "center center" }}
            >
              <div className="w-full h-full relative overflow-hidden">
                {children}
              </div>
            </div>
          </foreignObject>
          <rect
            width="139"
            height="5"
            rx="2.5"
            transform="matrix(-1 0 0 1 284 849)"
            className="fill-[black] dark:fill-[#ffffffa2]"
          ></rect>
          <path
            d="M73.7471 43.5257C76.5938 43.5257 78.966 45.522 78.966 50.0516V50.0695C78.966 54.3395 76.9876 56.8908 73.6934 56.8908C71.3032 56.8908 69.5129 55.5122 69.11 53.5607L69.0921 53.4622H71.3838L71.4106 53.5428C71.7598 54.429 72.5475 55.002 73.7023 55.002C75.7791 55.002 76.6475 53.0146 76.737 50.5708C76.7459 50.4365 76.7549 50.3022 76.7549 50.159H76.7012C76.1909 51.3407 74.9019 52.2358 73.1563 52.2358C70.6676 52.2358 68.9131 50.4455 68.9131 48.0195V48.0016C68.9131 45.3966 70.9631 43.5257 73.7471 43.5257ZM73.7471 50.4544C75.2241 50.4544 76.3521 49.416 76.3521 47.9748V47.9658C76.3521 46.5335 75.2241 45.4146 73.7739 45.4146C72.3416 45.4146 71.1868 46.5246 71.1868 47.9211V47.939C71.1868 49.4071 72.279 50.4544 73.7471 50.4544ZM81.8485 48.2165C81.1234 48.2165 80.5505 47.6436 80.5505 46.9185C80.5505 46.1934 81.1234 45.6294 81.8485 45.6294C82.5736 45.6294 83.1375 46.1934 83.1375 46.9185C83.1375 47.6436 82.5736 48.2165 81.8485 48.2165ZM81.8485 54.7871C81.1234 54.7871 80.5505 54.2142 80.5505 53.4891C80.5505 52.764 81.1234 52.2 81.8485 52.2C82.5736 52.2 83.1375 52.764 83.1375 53.4891C83.1375 54.2142 82.5736 54.7871 81.8485 54.7871ZM91.0778 56.667V54.1873H84.6325V52.2179L89.9946 43.7495H93.2799V52.2896H95.0345V54.1873H93.2799V56.667H91.0778ZM86.7093 52.3433H91.1136V45.4951H91.0599L86.7093 52.2806V52.3433ZM99.7163 56.667V45.9517H99.6626L96.3236 48.2433V46.1217L99.6984 43.7495H101.981V56.667H99.7163Z"
            className="fill-[black] dark:fill-[white]"
          ></path>
          <g opacity="0.9">
            <rect
              x="297.333"
              y="50"
              width="3.33333"
              height="4"
              rx="0.333333"
              className="fill-[black] dark:fill-[white]"
            ></rect>
            <rect
              x="302"
              y="48"
              width="3.33333"
              height="6"
              rx="0.333333"
              className="fill-[black] dark:fill-[white]"
            ></rect>
            <rect
              x="307"
              y="45.667"
              width="3.33333"
              height="8.33333"
              rx="0.333333"
              className="fill-[black] dark:fill-[white]"
            ></rect>
            <rect
              x="311.666"
              y="43"
              width="3.33333"
              height="11"
              rx="0.333333"
              className="fill-[black] dark:fill-[white]"
            ></rect>
          </g>
          <g opacity="0.9">
            <path
              d="M341.382 45.8776C339.208 43.6888 336.196 42.3335 332.867 42.3335C329.528 42.3335 326.508 43.6969 324.333 45.8974L326.219 47.7831C327.911 46.0652 330.265 45.0002 332.867 45.0002C335.459 45.0002 337.805 46.057 339.496 47.7633L341.382 45.8776Z"
              className="fill-[black] dark:fill-[white]"
            ></path>
            <path
              d="M338.318 48.9418C336.928 47.5371 334.999 46.6668 332.867 46.6668C330.725 46.6668 328.788 47.5453 327.397 48.9616L329.283 50.8474C330.191 49.9136 331.462 49.3335 332.867 49.3335C334.263 49.3335 335.525 49.9053 336.432 50.8275L338.318 48.9418Z"
              className="fill-[black] dark:fill-[white]"
            ></path>
            <path
              d="M335.253 52.006C334.648 51.3855 333.803 51.0002 332.867 51.0002C331.922 51.0002 331.068 51.3938 330.462 52.0261L332.847 54.412L335.253 52.006Z"
              className="fill-[black] dark:fill-[white]"
            ></path>
          </g>
          <rect
            opacity="0.6"
            x="351.166"
            y="43.167"
            width="22.3333"
            height="10.6667"
            rx="2.16667"
            className="stroke-[black] dark:stroke-[white]"
          ></rect>
          <rect
            opacity="0.9"
            x="352.333"
            y="44.3335"
            width="20"
            height="8.33333"
            rx="1.33333"
            className="fill-[black] dark:fill-[white]"
          ></rect>
          <path
            opacity="0.6"
            d="M374.666 47V47C375.402 47 375.999 47.597 375.999 48.3333V48.6667C375.999 49.403 375.402 50 374.666 50V50V47Z"
            className="fill-[black] dark:fill-[white]"
          ></path>
          <rect
            x="151.666"
            y="31.667"
            width="123.333"
            height="36"
            rx="18"
            fill="black"
          ></rect>
          <g opacity="0.75">
            <rect
              x="241.999"
              y="41.3338"
              width="16.6667"
              height="16.6667"
              rx="8.33333"
              fill="#121212"
            ></rect>
            <rect
              x="241.999"
              y="41.3338"
              width="16.6667"
              height="16.6667"
              rx="8.33333"
              stroke="#0E0E0E"
              strokeWidth="0.666667"
            ></rect>
            <g filter="url(#filter2_f_2905_1090)">
              <path
                d="M248.476 45.9526C245.66 46.778 244.722 51.5241 248.476 53.3812C247.538 50.905 247.538 48.6352 248.476 45.9526Z"
                fill="#50A99A"
              ></path>
            </g>
            <g filter="url(#filter3_f_2905_1090)">
              <path
                d="M247.857 47.667C246.449 48.1114 245.98 50.667 247.857 51.667C247.388 50.3337 247.388 49.1114 247.857 47.667Z"
                fill="#50A99A"
              ></path>
            </g>
            <g opacity="0.4" filter="url(#filter4_f_2905_1090)">
              <path
                d="M248.436 47.0219C247.23 47.2038 246.348 50.5423 247.805 51.4287C247.289 50.2382 247.547 47.8573 248.436 47.0219Z"
                fill="#D0FFF7"
              ></path>
            </g>
            <g filter="url(#filter5_f_2905_1090)">
              <path
                d="M252.19 45.9526C255.006 46.778 255.944 51.5241 252.19 53.3812C253.128 50.905 253.128 48.6352 252.19 45.9526Z"
                fill="#3E518C"
              ></path>
            </g>
            <g filter="url(#filter6_f_2905_1090)">
              <path
                d="M252.809 47.667C254.217 48.1114 254.686 50.667 252.809 51.667C253.278 50.3337 253.278 49.1114 252.809 47.667Z"
                fill="#26408D"
              ></path>
            </g>
            <g opacity="0.5" filter="url(#filter7_f_2905_1090)">
              <path
                d="M252.23 47.0219C253.437 47.2038 254.318 50.5423 252.861 51.4287C253.377 50.2382 253.119 47.8573 252.23 47.0219Z"
                fill="#0D308C"
              ></path>
            </g>
          </g>
          <g opacity="0.4">
            <rect
              width="24"
              height="24"
              rx="12"
              transform="matrix(-1 0 0 1 181.666 37.667)"
              fill="#141414"
            ></rect>
            <rect
              width="15.6"
              height="15.6"
              rx="7.8"
              transform="matrix(-1 0 0 1 177.466 41.8672)"
              fill="black"
            ></rect>
            <g filter="url(#filter8_f_2905_1090)">
              <path
                d="M172.006 44.9868C175.554 46.0268 176.736 52.0068 172.006 54.3468C173.189 51.2268 173.189 48.3668 172.006 44.9868Z"
                fill="#50A99A"
              ></path>
            </g>
            <g filter="url(#filter9_f_2905_1090)">
              <path
                d="M172.786 47.147C174.56 47.707 175.151 50.927 172.786 52.187C173.377 50.507 173.377 48.967 172.786 47.147Z"
                fill="#50A99A"
              ></path>
            </g>
            <g opacity="0.5" filter="url(#filter10_f_2905_1090)">
              <path
                d="M172.056 46.3343C173.576 46.5634 174.687 50.7699 172.851 51.8868C173.501 50.3868 173.176 47.3868 172.056 46.3343Z"
                fill="#D0FFF7"
              ></path>
            </g>
            <g filter="url(#filter11_f_2905_1090)">
              <path
                d="M167.325 44.9868C163.777 46.0268 162.595 52.0068 167.325 54.3468C166.143 51.2268 166.143 48.3668 167.325 44.9868Z"
                fill="#3E518C"
              ></path>
            </g>
            <g filter="url(#filter12_f_2905_1090)">
              <path
                d="M166.545 47.147C164.771 47.707 164.18 50.927 166.545 52.187C165.954 50.507 165.954 48.967 166.545 47.147Z"
                fill="#26408D"
              ></path>
            </g>
            <g opacity="0.5" filter="url(#filter13_f_2905_1090)">
              <path
                d="M167.275 46.3343C165.755 46.5634 164.644 50.7699 166.48 51.8868C165.83 50.3868 166.155 47.3868 167.275 46.3343Z"
                fill="#0D308C"
              ></path>
            </g>
          </g>
          <g opacity="0.4">
            <g opacity="0.75" style={{ mixBlendMode: "screen" }}>
              <rect
                x="-0.000976562"
                y="786"
                width="6"
                height="5.33333"
                fill="#7C7C7C"
              ></rect>
            </g>
            <g opacity="0.75" style={{ mixBlendMode: "screen" }}>
              <rect
                x="87.666"
                y="874"
                width="5.33333"
                height="6"
                fill="#7C7C7C"
              ></rect>
            </g>
            <g opacity="0.75" style={{ mixBlendMode: "screen" }}>
              <rect
                x="420.666"
                y="89.0005"
                width="6"
                height="5.33333"
                fill="#7C7C7C"
              ></rect>
            </g>
            <g opacity="0.75" style={{ mixBlendMode: "screen" }}>
              <rect
                x="-0.000976562"
                y="89.0005"
                width="6"
                height="5.33333"
                fill="#7C7C7C"
              ></rect>
            </g>
            <g opacity="0.75" style={{ mixBlendMode: "screen" }}>
              <rect
                x="339.666"
                y="0.000488281"
                width="5.33333"
                height="6"
                fill="#7C7C7C"
              ></rect>
            </g>
            <g opacity="0.75" style={{ mixBlendMode: "screen" }}>
              <rect
                x="420.666"
                y="785.667"
                width="6"
                height="5.33333"
                fill="#7C7C7C"
              ></rect>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
