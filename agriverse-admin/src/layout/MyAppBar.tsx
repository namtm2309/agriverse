import { AppBar } from 'react-admin';
import { Box, InputBase, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ViEnText } from '../components/ViEnText';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function readFilterQ(search: string): string {
  const params = new URLSearchParams(search);
  const raw = params.get('filter');
  if (!raw) return '';
  try {
    const obj = JSON.parse(raw);
    const q = obj?.q;
    return typeof q === 'string' ? q : '';
  } catch {
    return '';
  }
}

function isListPath(pathname: string): boolean {
  const parts = pathname.split('/').filter(Boolean);
  // "/" => dashboard (no list), "/users" => list, "/users/create" => not list, "/users/1" => edit/show
  return parts.length === 1;
}

export const MyAppBar = (props: any) => (
  <MyAppBarInner {...props} />
);

const MyAppBarInner = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  // Sync value from URL when on list pages
  useEffect(() => {
    if (!isListPath(location.pathname)) return;
    const q = readFilterQ(location.search);
    setValue(q);
  }, [location.pathname, location.search]);

  const debouncedNavigate = useMemo(() => {
    let timer: any;
    return (next: string) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isListPath(location.pathname)) return;

        const params = new URLSearchParams(location.search);
        const raw = params.get('filter');
        let filterObj: any = {};
        if (raw) {
          try {
            filterObj = JSON.parse(raw) ?? {};
          } catch {
            filterObj = {};
          }
        }

        const q = next.trim();
        if (q) filterObj.q = q;
        else delete filterObj.q;

        // reset page when search changes
        params.set('page', '1');

        if (Object.keys(filterObj).length > 0) {
          params.set('filter', JSON.stringify(filterObj));
        } else {
          params.delete('filter');
        }

        navigate(
          { pathname: location.pathname, search: params.toString() ? `?${params.toString()}` : '' },
          { replace: true },
        );
      }, 350);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, navigate]);

  return (
    <AppBar {...props}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: 999,
            backgroundImage:
              'linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(6,182,212,1) 100%)',
          }}
        />
        <ViEnText vi="AgriVerse" en="Admin" />
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          py: 0.75,
          borderRadius: 999,
          border: '1px solid rgba(15,23,42,0.10)',
          backgroundColor: alpha('#0f172a', 0.02),
        }}
      >
        <SearchIcon fontSize="small" />
        <InputBase
          placeholder="Tìm nhanh… (Quick search)"
          value={value}
          onChange={(e) => {
            const next = e.target.value;
            setValue(next);
            debouncedNavigate(next);
          }}
          sx={{
            width: 260,
            fontSize: 14,
            '& input': { color: 'text.primary' },
            '& input::placeholder': { color: 'text.secondary', opacity: 0.9 },
          }}
          inputProps={{ 'aria-label': 'quick search' }}
        />
      </Box>
    </AppBar>
  );
};


