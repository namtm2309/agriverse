import { Response } from 'express';

export function setContentRange(
  res: Response,
  resource: string,
  start: number,
  end: number,
  total: number,
) {
  const safeTotal = Number.isFinite(total) && total >= 0 ? total : 0;
  const safeStart = Number.isFinite(start) && start >= 0 ? start : 0;
  const safeEnd = Number.isFinite(end) && end >= safeStart ? end : safeStart;

  res.setHeader('Content-Range', `${resource} ${safeStart}-${safeEnd}/${safeTotal}`);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
}

export function withContentRange<T>(
  res: Response,
  resource: string,
  items: T[],
): T[] {
  const total = items.length;
  const end = total > 0 ? total - 1 : 0;
  setContentRange(res, resource, 0, end, total);
  return items;
}


