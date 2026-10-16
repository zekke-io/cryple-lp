const glyphs = {
  note: { width: 2, paths: <><path d="M5 5h14v10l-4 4H5z" /><path d="M15 19v-4h4" /></> },
  key: { width: 2, paths: <><circle cx="8" cy="15" r="4" /><path d="M11 12l8-8M16 7l3 3" /></> },
  shield: { width: 2, paths: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><circle cx="12" cy="11" r="1.6" /><path d="M12 12.6V16" /></> },
  doc: { width: 2, paths: <><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v4h4M10 12h6M10 16h6" /></> },
  sheet: { width: 2, paths: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M4 15h16M10 4v16" /></> },
  folder: { width: 2, paths: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
  camera: { width: 2, paths: <><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></> },
  calendar: { width: 2, paths: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M8 3v4M16 3v4" /></> },
  todo: { width: 2, paths: <path d="M4 7l2 2 3-3M12 8h8M4 16l2 2 3-3M12 17h8" /> },
  diary: { width: 2, paths: <><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" /><path d="M5 17a3 3 0 0 1 3-3h11" /></> },
  search: { width: 2.2, paths: <><circle cx="11" cy="11" r="6" /><path d="M16 16l4 4" /></> },
  plus: { width: 2.6, paths: <path d="M12 5v14M5 12h14" /> },
  activity: { width: 2.2, paths: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  settings: { width: 2.2, paths: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></> },
  lock: { width: 2.2, paths: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></> },
  home: { width: 2.2, paths: <><path d="M4 11l8-7 8 7v9H4z" /><path d="M10 20v-6h4v6" /></> },
};

export type AppGlyphName = keyof typeof glyphs;

export default function AppGlyph({ name, size }: { name: AppGlyphName; size: number }) {
  const glyph = glyphs[name];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={glyph.width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph.paths}
    </svg>
  );
}
