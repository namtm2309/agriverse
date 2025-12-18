import { RaListQuery } from './ra-list-query.util';

function normalize(v: unknown) {
  if (v === null || v === undefined) return '';
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

export function applyRaListQuery<T extends Record<string, any>>(
  items: T[],
  ra: RaListQuery,
  searchableFields: Array<keyof T>,
) {
  const filter = ra.filter ?? {};
  let filtered = [...items];

  // 1) Filter by id (React Admin reference inputs thường dùng filter.id = [..])
  if (filter.id !== undefined) {
    const ids = Array.isArray(filter.id) ? filter.id : [filter.id];
    const set = new Set(ids.map((x: any) => Number(x)));
    filtered = filtered.filter((it) => set.has(Number((it as any).id)));
  }

  // 2) q search
  if (filter.q !== undefined && filter.q !== null && String(filter.q).trim() !== '') {
    const q = String(filter.q).toLowerCase();
    filtered = filtered.filter((it) =>
      searchableFields.some((f) =>
        normalize((it as any)[f]).toLowerCase().includes(q),
      ),
    );
  }

  // 3) Other exact filters (ignore q, id)
  Object.keys(filter).forEach((key) => {
    if (key === 'q' || key === 'id') return;
    const val = filter[key];
    if (val === undefined) return;
    if (Array.isArray(val)) {
      const set = new Set(val.map((x) => normalize(x)));
      filtered = filtered.filter((it) => set.has(normalize((it as any)[key])));
      return;
    }
    filtered = filtered.filter((it) => normalize((it as any)[key]) === normalize(val));
  });

  // 4) Sort
  const [sortField, sortOrder] = ra.sort;
  filtered.sort((a, b) => {
    const av = (a as any)[sortField];
    const bv = (b as any)[sortField];
    const as = normalize(av);
    const bs = normalize(bv);
    const cmp = as.localeCompare(bs, undefined, { numeric: true, sensitivity: 'base' });
    return sortOrder === 'DESC' ? -cmp : cmp;
  });

  // 5) Range
  const total = filtered.length;
  const start = ra.skip;
  const sliced = filtered.slice(start, start + ra.take);
  const end = sliced.length > 0 ? start + sliced.length - 1 : start;

  return { data: sliced, total, start, end };
}


