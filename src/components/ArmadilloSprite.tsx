export default function ArmadilloSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="zk-clip"><circle cx="256" cy="256" r="150" /></clipPath>
        <clipPath id="zk-body"><path d="M90 320 C90 190 190 150 270 150 C350 150 400 210 400 300 C400 340 380 360 340 360 L140 360 C110 360 90 345 90 320 Z" /></clipPath>
        <symbol id="zk-ball" viewBox="76 80 360 360">
          <circle cx="256" cy="256" r="150" fill="#FF7A1A" />
          <g clipPath="url(#zk-clip)" fill="#FFB066">
            <path d="M90 190 Q256 252 422 190 L422 228 Q256 290 90 228 Z" />
            <path d="M90 254 Q256 316 422 254 L422 292 Q256 354 90 292 Z" />
            <path d="M90 318 Q256 380 422 318 L422 356 Q256 418 90 356 Z" />
          </g>
          <path d="M168 176 Q196 138 252 126" stroke="#fff" strokeWidth="14" strokeLinecap="round" fill="none" opacity=".6" />
        </symbol>
        <symbol id="zk-ball-cream" viewBox="76 80 360 360">
          <ellipse cx="256" cy="420" rx="96" ry="12" fill="#C2410C" opacity=".45" />
          <circle cx="256" cy="256" r="150" fill="#FFF4E8" />
          <g clipPath="url(#zk-clip)" fill="#FFB066">
            <path d="M90 190 Q256 252 422 190 L422 228 Q256 290 90 228 Z" />
            <path d="M90 254 Q256 316 422 254 L422 292 Q256 354 90 292 Z" />
            <path d="M90 318 Q256 380 422 318 L422 356 Q256 418 90 356 Z" />
          </g>
          <path d="M168 176 Q196 138 252 126" stroke="#fff" strokeWidth="14" strokeLinecap="round" fill="none" opacity=".7" />
        </symbol>
        <symbol id="zk-open-cream" viewBox="20 120 470 310">
          <ellipse cx="254" cy="410" rx="190" ry="14" fill="#C2410C" opacity=".4" />
          <path d="M96 318 C60 318 36 340 30 372 C62 366 92 352 104 336 Z" fill="#FFB066" />
          <rect x="160" y="330" width="56" height="76" rx="28" fill="#FFB066" />
          <rect x="296" y="330" width="56" height="76" rx="28" fill="#FFB066" />
          <path d="M90 320 C90 190 190 150 270 150 C350 150 400 210 400 300 C400 340 380 360 340 360 L140 360 C110 360 90 345 90 320 Z" fill="#FFF4E8" />
          <g clipPath="url(#zk-body)" fill="#FFB066">
            <path d="M150 140 Q128 250 150 370 L186 370 Q164 250 186 140 Z" />
            <path d="M226 140 Q204 250 226 370 L262 370 Q240 250 262 140 Z" />
            <path d="M302 140 Q280 250 302 370 L338 370 Q316 250 338 140 Z" />
          </g>
          <path d="M130 230 Q150 185 215 168" stroke="#fff" strokeWidth="12" strokeLinecap="round" fill="none" opacity=".7" />
          <path d="M380 268 C400 235 450 240 470 285 C478 305 468 322 450 326 L388 332 Z" fill="#FFB066" />
          <ellipse cx="398" cy="250" rx="16" ry="28" transform="rotate(-25 398 250)" fill="#FFB066" />
          <ellipse cx="398" cy="252" rx="7" ry="18" transform="rotate(-25 398 252)" fill="#FF9A4A" />
          <circle cx="428" cy="282" r="8" fill="#2A1608" />
          <circle cx="431" cy="279" r="2.6" fill="#fff" />
          <circle cx="414" cy="302" r="9" fill="#FF7A1A" opacity=".55" />
          <path d="M432 308 Q447 319 461 306" stroke="#2A1608" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="469" cy="294" r="7" fill="#2A1608" />
        </symbol>
        <symbol id="zk-open-app" viewBox="0 0 512 512">
          <rect width="512" height="512" rx="116" fill="#FF7A1A" />
          <g transform="translate(256 262) scale(.8) translate(-254 -281)">
            <ellipse cx="254" cy="410" rx="190" ry="14" fill="#C2410C" opacity=".4" />
            <path d="M96 318 C60 318 36 340 30 372 C62 366 92 352 104 336 Z" fill="#FFB066" />
            <rect x="160" y="330" width="56" height="76" rx="28" fill="#FFB066" />
            <rect x="296" y="330" width="56" height="76" rx="28" fill="#FFB066" />
            <path d="M90 320 C90 190 190 150 270 150 C350 150 400 210 400 300 C400 340 380 360 340 360 L140 360 C110 360 90 345 90 320 Z" fill="#FFF4E8" />
            <g clipPath="url(#zk-body)" fill="#FFB066">
              <path d="M150 140 Q128 250 150 370 L186 370 Q164 250 186 140 Z" />
              <path d="M226 140 Q204 250 226 370 L262 370 Q240 250 262 140 Z" />
              <path d="M302 140 Q280 250 302 370 L338 370 Q316 250 338 140 Z" />
            </g>
            <path d="M130 230 Q150 185 215 168" stroke="#fff" strokeWidth="12" strokeLinecap="round" fill="none" opacity=".7" />
            <path d="M380 268 C400 235 450 240 470 285 C478 305 468 322 450 326 L388 332 Z" fill="#FFB066" />
            <ellipse cx="398" cy="250" rx="16" ry="28" transform="rotate(-25 398 250)" fill="#FFB066" />
            <ellipse cx="398" cy="252" rx="7" ry="18" transform="rotate(-25 398 252)" fill="#FF9A4A" />
            <circle cx="428" cy="282" r="8" fill="#2A1608" />
            <circle cx="431" cy="279" r="2.6" fill="#fff" />
            <circle cx="414" cy="302" r="9" fill="#FF7A1A" opacity=".55" />
            <path d="M432 308 Q447 319 461 306" stroke="#2A1608" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="469" cy="294" r="7" fill="#2A1608" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}
