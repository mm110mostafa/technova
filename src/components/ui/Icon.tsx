import type { SVGProps } from 'react';

/** Hand-tuned 24px stroke icon set (Lucide-style geometry) — no icon font required. */
const paths: Record<string, JSX.Element> = {
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  bag: (<><path d="M5 8h14l-1 12a2 2 0 0 1-2 1.8H8A2 2 0 0 1 6 20L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>),
  heart: (<path d="M12 20s-7.5-4.6-9.2-9.3C1.7 7.4 3.8 4 7.2 4c2 0 3.5 1.1 4.8 2.8C13.3 5.1 14.8 4 16.8 4c3.4 0 5.5 3.4 4.4 6.7C19.5 15.4 12 20 12 20Z" />),
  eye: (<><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>),
  phone: (<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />),
  menu: (<><path d="M4 7h16" /><path d="M4 12h10" /><path d="M4 17h16" /></>),
  close: (<><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>),
  chevronDown: (<path d="m6 9 6 6 6-6" />),
  chevronLeft: (<path d="m15 6-6 6 6 6" />),
  chevronRight: (<path d="m9 6 6 6-6 6" />),
  arrowLeft: (<><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>),
  arrowUpLeft: (<><path d="M17 17 7 7" /><path d="M7 15V7h8" /></>),
  star: (<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />),
  plus: (<><path d="M12 5v14" /><path d="M5 12h14" /></>),
  minus: (<path d="M5 12h14" />),
  trash: (<><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></>),
  truck: (<><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>),
  shield: (<><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>),
  refresh: (<><path d="M20 11a8 8 0 0 0-14.6-4.5L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.6 4.5L20 16" /><path d="M20 20v-4h-4" /></>),
  headset: (<><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /><path d="M19 20a3 3 0 0 1-3 2h-3" /></>),
  cpu: (<><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></>),
  laptop: (<><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></>),
  monitor: (<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M9 20h6M12 16v4" /></>),
  keyboard: (<><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></>),
  mouse: (<><rect x="6" y="3" width="12" height="18" rx="6" /><path d="M12 7v3" /></>),
  gamepad: (<><path d="M6 8h12a4 4 0 0 1 4 4.4l-.5 4A3 3 0 0 1 16.4 18l-1.9-2h-5l-1.9 2a3 3 0 0 1-5.1-1.6l-.5-4A4 4 0 0 1 6 8Z" /><path d="M7 11v3M5.5 12.5h3M16 12h.01M18 13.5h.01" /></>),
  headphones: (<><path d="M3 17v-4a9 9 0 0 1 18 0v4" /><rect x="3" y="14" width="5" height="7" rx="2" /><rect x="16" y="14" width="5" height="7" rx="2" /></>),
  drive: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 14h18" /><path d="M7 17h.01M11 17h.01" /></>),
  fan: (<><circle cx="12" cy="12" r="2" /><path d="M12 10c0-4 1-7 4-7 2.5 0 3 3 1 5l-3 3" /><path d="M14 12c4 0 7 1 7 4 0 2.5-3 3-5 1l-3-3" /><path d="M12 14c0 4-1 7-4 7-2.5 0-3-3-1-5l3-3" /><path d="M10 12c-4 0-7-1-7-4 0-2.5 3-3 5-1l3 3" /></>),
  check: (<path d="m5 12 5 5 9-10" />),
  pin: (<><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>),
  instagram: (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>),
  telegram: (<path d="m21 4-3 16-6-5-3 3v-5l9-7-11 6-4-2 18-6Z" />),
  whatsapp: (<><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a3.5 3.5 0 0 1-2-2l1-1-1-2L9 9.5Z" /></>),
  linkedin: (<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7h.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>),
  sliders: (<><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></>),
  grid: (<><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>),
  zap: (<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />),
  wrench: (<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 1.3-1.3-5-5L5 13l-3-3 8-8 1.7 1.3a4 4 0 0 0 3 3Z" />),
  card: (<><rect x="2" y="5" width="20" height="14" rx="2.5" /><path d="M2 10h20M6 15h4" /></>),
  home: (<><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  box: (<><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="m3 8 9 5 9-5M12 13v8" /></>),
  gift: (<><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v9h14v-9M12 8v13" /><path d="M12 8S10.5 3 8 3a2.5 2.5 0 0 0 0 5h4ZM12 8s1.5-5 4-5a2.5 2.5 0 0 1 0 5h-4Z" /></>),
  message: (<path d="M4 5h16v11H9l-5 4V5Z" />),
  award: (<><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" /></>),
  percent: (<><path d="M19 5 5 19" /><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="17" r="2.5" /></>),
  info: (<><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5h.01" /></>)
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'stroke'> {
  name: string;
  size?: number;
  filled?: boolean;
  stroke?: number;
}

export function Icon({ name, size = 20, filled = false, stroke = 1.8, className = '', ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={'shrink-0 ' + className}
      {...rest}
    >
      {paths[name] ?? paths.info}
    </svg>
  );
}
