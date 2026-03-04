// Hand-drawn style SVG icons for presentation slides
// 48x48 viewbox, stroke-based, warm palette

const S = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"';

export const SLIDE_TYPE_SVGS: Record<string, string> = {
  hero: `<svg ${S} stroke="#FF9800"><circle cx="24" cy="24" r="18"/><path d="M18 20l6-6 6 6M18 28l6 6 6-6"/></svg>`,
  title: `<svg ${S} stroke="#03A9F4"><rect x="8" y="10" width="32" height="28" rx="3"/><path d="M14 18h20M14 24h14M14 30h10"/></svg>`,
  section: `<svg ${S} stroke="#4CAF50"><path d="M12 8l12 8-12 8V8z"/><path d="M28 16h12M28 24h8M28 32h12"/></svg>`,
  overview: `<svg ${S} stroke="#03A9F4"><rect x="6" y="6" width="16" height="16" rx="2"/><rect x="26" y="6" width="16" height="16" rx="2"/><rect x="6" y="26" width="16" height="16" rx="2"/><rect x="26" y="26" width="16" height="16" rx="2"/></svg>`,
  info: `<svg ${S} stroke="#4CAF50"><circle cx="24" cy="24" r="18"/><path d="M24 16v0M24 22v12"/></svg>`,
  stat: `<svg ${S} stroke="#E91E63"><path d="M8 40V28M18 40V20M28 40V12M38 40V8"/></svg>`,
  quote: `<svg ${S} stroke="#FF9800"><path d="M10 20c0-6 4-10 10-12v4c-4 2-6 4-6 8h6v12H10V20zM28 20c0-6 4-10 10-12v4c-4 2-6 4-6 8h6v12H28V20z"/></svg>`,
  compare: `<svg ${S} stroke="#9C27B0"><path d="M24 8v32M8 24h32"/><circle cx="14" cy="14" r="6"/><rect x="30" y="28" width="12" height="12" rx="2"/></svg>`,
  question: `<svg ${S} stroke="#FF9800"><circle cx="24" cy="24" r="18"/><path d="M18 18c0-4 3-6 6-6s6 2 6 6-3 4-6 6v2"/><circle cx="24" cy="34" r="1.5" fill="#FF9800"/></svg>`,
  end: `<svg ${S} stroke="#4CAF50"><path d="M24 8l4 8 8 2-6 6 2 8-8-4-8 4 2-8-6-6 8-2z"/></svg>`,
  agenda: `<svg ${S} stroke="#03A9F4"><path d="M12 12h24M12 20h24M12 28h24M12 36h18"/><circle cx="8" cy="12" r="2" fill="#03A9F4"/><circle cx="8" cy="20" r="2" fill="#03A9F4"/><circle cx="8" cy="28" r="2" fill="#03A9F4"/><circle cx="8" cy="36" r="2" fill="#03A9F4"/></svg>`,
  summary: `<svg ${S} stroke="#4CAF50"><path d="M10 24l6 6 14-14"/><rect x="6" y="6" width="36" height="36" rx="4"/></svg>`,
  interaction: `<svg ${S} stroke="#E91E63"><path d="M24 8v4M12 12l3 3M36 12l-3 3"/><path d="M16 44V30a8 8 0 0116 0v14"/></svg>`,
  'article-group': `<svg ${S} stroke="#FF9800"><rect x="6" y="4" width="18" height="24" rx="2"/><rect x="24" y="8" width="18" height="24" rx="2"/><path d="M10 12h10M10 18h8M28 16h10M28 22h8"/></svg>`,
  'timeline-group': `<svg ${S} stroke="#FF9800"><circle cx="10" cy="24" r="4" fill="#FF9800"/><circle cx="24" cy="24" r="4" fill="#4CAF50"/><circle cx="38" cy="24" r="4" fill="#03A9F4"/><path d="M14 24h6M28 24h6"/></svg>`,
  'article-browser': `<svg ${S} stroke="#03A9F4"><circle cx="20" cy="20" r="12"/><path d="M28 28l10 10"/><path d="M14 20h12M20 14v12"/></svg>`,
  category: `<svg ${S} stroke="#9C27B0"><path d="M24 6l6 12H18l6-12z"/><rect x="12" y="26" width="24" height="16" rx="2"/></svg>`,
  image: `<svg ${S} stroke="#4CAF50"><rect x="6" y="10" width="36" height="28" rx="3"/><circle cx="18" cy="22" r="4"/><path d="M6 34l12-10 8 6 8-4 8 8"/></svg>`,
  timeline: `<svg ${S} stroke="#FF9800"><path d="M24 6v36"/><circle cx="24" cy="14" r="4"/><circle cx="24" cy="28" r="4"/><path d="M28 14h10M10 28h14"/></svg>`,
  article: `<svg ${S} stroke="#03A9F4"><rect x="8" y="4" width="32" height="40" rx="3"/><path d="M14 14h20M14 22h16M14 30h12"/></svg>`,
};

export const EMOJI_TO_SVG: Record<string, string> = {
  '🕰️': `<svg ${S} stroke="#FF9800"><circle cx="24" cy="24" r="16"/><path d="M24 14v10l8 4"/></svg>`,
  '📄': `<svg ${S} stroke="#03A9F4"><rect x="10" y="4" width="28" height="40" rx="3"/><path d="M16 14h16M16 22h12M16 30h8"/></svg>`,
  '🌍': `<svg ${S} stroke="#4CAF50"><circle cx="24" cy="24" r="18"/><path d="M6 24h36M24 6c-8 6-8 30 0 36M24 6c8 6 8 30 0 36"/></svg>`,
  '🏫': `<svg ${S} stroke="#4CAF50"><path d="M6 22l18-12 18 12"/><rect x="10" y="22" width="28" height="20"/><rect x="20" y="30" width="8" height="12"/></svg>`,
  '🔍': `<svg ${S} stroke="#9C27B0"><circle cx="20" cy="20" r="12"/><path d="M28 28l12 12"/></svg>`,
  '❤️': `<svg ${S} stroke="#FF9800"><path d="M24 40S6 28 6 18a10 10 0 0118-4 10 10 0 0118 4c0 10-18 22-18 22z" fill="rgba(255,152,0,0.2)"/></svg>`,
  '🎓': `<svg ${S} stroke="#4CAF50"><path d="M4 20l20-10 20 10-20 10z"/><path d="M12 24v12l12 6 12-6V24"/><path d="M40 20v14"/></svg>`,
  '🛡️': `<svg ${S} stroke="#E91E63"><path d="M24 4L6 12v12c0 12 8 18 18 20 10-2 18-8 18-20V12L24 4z" fill="rgba(233,30,99,0.1)"/></svg>`,
  '👥': `<svg ${S} stroke="#03A9F4"><circle cx="18" cy="16" r="6"/><circle cx="32" cy="16" r="6"/><path d="M6 38c0-8 6-14 12-14s12 6 12 14M26 38c0-8 4-14 6-14s12 6 12 14"/></svg>`,
};
