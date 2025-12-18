import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useDataProvider } from 'react-admin';
import { useEffect, useState } from 'react';
import { ViEnText } from '../components/ViEnText';
import { useNavigate } from 'react-router-dom';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

type Kpi = {
  labelVi: string;
  labelEn: string;
  value: number | null;
  color: string;
  bg: string;
  Icon: any;
  resource: string;
};

async function fetchTotal(dp: any, resource: string) {
  const res = await dp.getList(resource, {
    pagination: { page: 1, perPage: 1 },
    sort: { field: 'id', order: 'ASC' },
    filter: {},
  });
  return typeof res?.total === 'number' ? res.total : 0;
}

export const Dashboard = () => {
  const dataProvider = useDataProvider();
  const navigate = useNavigate();
  const [kpis, setKpis] = useState<Kpi[]>([
    {
      labelVi: 'Người dùng',
      labelEn: 'Users',
      value: null,
      color: '#2563eb',
      bg: 'rgba(37,99,235,0.12)',
      Icon: PeopleAltOutlinedIcon,
      resource: 'users',
    },
    {
      labelVi: 'Trang trại',
      labelEn: 'Farms',
      value: null,
      color: '#16a34a',
      bg: 'rgba(22,163,74,0.12)',
      Icon: HomeWorkOutlinedIcon,
      resource: 'farms',
    },
    {
      labelVi: 'Lô đất',
      labelEn: 'Plots',
      value: null,
      color: '#f97316',
      bg: 'rgba(249,115,22,0.12)',
      Icon: GridOnOutlinedIcon,
      resource: 'plots',
    },
    {
      labelVi: 'Mùa vụ',
      labelEn: 'Seasons',
      value: null,
      color: '#8b5cf6',
      bg: 'rgba(139,92,246,0.12)',
      Icon: EventOutlinedIcon,
      resource: 'seasons',
    },
    {
      labelVi: 'NFT',
      labelEn: 'NFT assets',
      value: null,
      color: '#db2777',
      bg: 'rgba(219,39,119,0.12)',
      Icon: DiamondOutlinedIcon,
      resource: 'nft-assets',
    },
    {
      labelVi: 'Đơn hàng',
      labelEn: 'Orders',
      value: null,
      color: '#1d4ed8',
      bg: 'rgba(29,78,216,0.12)',
      Icon: ShoppingCartOutlinedIcon,
      resource: 'orders',
    },
  ]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const totals = await Promise.all([
        fetchTotal(dataProvider, 'users'),
        fetchTotal(dataProvider, 'farms'),
        fetchTotal(dataProvider, 'plots'),
        fetchTotal(dataProvider, 'seasons'),
        fetchTotal(dataProvider, 'nft-assets'),
        fetchTotal(dataProvider, 'orders'),
      ]);
      if (!mounted) return;
      setKpis((prev) => prev.map((k, i) => ({ ...k, value: totals[i] })));
    })();
    return () => {
      mounted = false;
    };
  }, [dataProvider]);

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            <ViEnText vi="Bảng điều khiển" en="Dashboard" />
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.75, mt: 0.5 }}>
            Tổng quan hệ thống nông nghiệp số hoá (Smart agriculture overview)
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {kpis.map((k) => (
          <Grid item xs={12} sm={6} md={4} key={k.labelEn}>
            <Card
              sx={{
                overflow: 'hidden',
                transition: 'transform 160ms ease, box-shadow 160ms ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 18px 45px rgba(15,23,42,0.10)',
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/${k.resource}`)}
                sx={{ height: '100%', alignItems: 'stretch' }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: k.bg,
                        color: k.color,
                      }}
                    >
                      <k.Icon />
                    </Box>
                    <Box
                      sx={{
                        width: 90,
                        height: 8,
                        borderRadius: 999,
                        backgroundColor: 'rgba(15,23,42,0.06)',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${Math.min(100, (k.value ?? 0) * 10)}%`,
                          height: '100%',
                          backgroundColor: k.color,
                        }}
                      />
                    </Box>
                  </Stack>

                  <Typography variant="body2" sx={{ opacity: 0.75, mt: 1.5 }}>
                    <ViEnText vi={k.labelVi} en={k.labelEn} />
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      mt: 0.5,
                      letterSpacing: -0.5,
                      color: k.color, // dùng màu theo card để tránh "đen" quá
                    }}
                  >
                    {k.value ?? '…'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};


