const paths = {
  secrets: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12L20 3M16 7l3 3" />
    </>
  ),
  passwords: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="3" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" />
    </>
  ),
  notes: (
    <>
      <path d="M5 4h14v11l-5 5H5z" />
      <path d="M14 20v-5h5" />
    </>
  ),
  documents: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </>
  ),
  files: <path d="M3 8a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
};

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
