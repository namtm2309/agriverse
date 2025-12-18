export type RaSort = [string, 'ASC' | 'DESC'];
export type RaRange = [number, number];

export interface RaListQuery {
  sort: RaSort;
  range: RaRange;
  filter: Record<string, any>;
  skip: number;
  take: number;
}

function safeJsonParse<T>(value: unknown, fallback: T): T {
  if (typeof value !== 'string') return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function parseRaListQuery(query: Record<string, any>): RaListQuery {
  const sort = safeJsonParse<RaSort>(query.sort, ['id', 'ASC']);
  const range = safeJsonParse<RaRange>(query.range, [0, 24]);
  const filter = safeJsonParse<Record<string, any>>(query.filter, {});

  const start = Number.isFinite(range?.[0]) ? Number(range[0]) : 0;
  const end = Number.isFinite(range?.[1]) ? Number(range[1]) : start;
  const skip = Math.max(0, start);
  const take = Math.max(0, end - start + 1);

  return {
    sort: [String(sort?.[0] ?? 'id'), (sort?.[1] === 'DESC' ? 'DESC' : 'ASC') as 'ASC' | 'DESC'],
    range: [skip, Math.max(skip, end)],
    filter: filter ?? {},
    skip,
    take,
  };
}


