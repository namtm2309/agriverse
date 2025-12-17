import { Response } from 'express';

export function withContentRange<T>(
  res: Response,
  resource: string,
  items: T[],
): T[] {
  const total = items.length;
  const end = total > 0 ? total - 1 : 0;
  res.setHeader('Content-Range', `${resource} 0-${end}/${total}`);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  return items;
}


