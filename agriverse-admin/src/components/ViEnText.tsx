import { ReactNode } from 'react';

export function ViEnText(props: {
  vi: ReactNode;
  en?: ReactNode;
  enScale?: number; // 0.5 = 50%
}) {
  const { vi, en, enScale = 0.5 } = props;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
      <span>{vi}</span>
      {en ? (
        <span style={{ fontSize: `${enScale}em`, opacity: 0.72 }}>
          ({en})
        </span>
      ) : null}
    </span>
  );
}

export function splitViEn(label: string): { vi: string; en?: string } {
  const m = label.match(/^(.*)\s*\(([^()]*)\)\s*$/);
  if (!m) return { vi: label };
  return { vi: m[1].trim(), en: m[2].trim() };
}



