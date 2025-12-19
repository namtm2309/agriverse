import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
  Chip,
  LinearProgress,
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
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import httpClient from '../httpClient';

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

async function fetchStatistics() {
  try {
    const response = await httpClient('http://localhost:4000/api/statistics/overview', {
      method: 'GET',
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
    return null;
  }
}

export const Dashboard = () => {
  const dataProvider = useDataProvider();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
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
    setLoading(true);
    (async () => {
      // Fetch statistics từ API mới
      const statistics = await fetchStatistics();
      
      // Fallback về cách cũ nếu statistics API không có
      const totals = await Promise.all([
        fetchTotal(dataProvider, 'users'),
        fetchTotal(dataProvider, 'farms'),
        fetchTotal(dataProvider, 'plots'),
        fetchTotal(dataProvider, 'seasons'),
        fetchTotal(dataProvider, 'nft-assets'),
        fetchTotal(dataProvider, 'orders'),
      ]);
      
      if (!mounted) return;
      
      // Update KPIs với dữ liệu từ statistics API nếu có
      if (statistics) {
        setStats(statistics);
        setKpis((prev) => [
          { ...prev[0], value: statistics.users?.total ?? totals[0] },
          { ...prev[1], value: statistics.farms?.total ?? totals[1] },
          { ...prev[2], value: statistics.plots?.total ?? totals[2] },
          { ...prev[3], value: statistics.seasons?.total ?? totals[3] },
          { ...prev[4], value: statistics.productBatches?.total ?? totals[4] },
          { ...prev[5], value: statistics.orders?.total ?? totals[5] },
        ]);
      } else {
        setKpis((prev) => prev.map((k, i) => ({ ...k, value: totals[i] })));
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [dataProvider]);

  if (loading) {
    return (
      <Stack spacing={2}>
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              <ViEnText vi="Bảng điều khiển" en="Dashboard" />
            </Typography>
            <LinearProgress sx={{ mt: 2 }} />
          </CardContent>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                <ViEnText vi="Bảng điều khiển" en="Dashboard" />
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.75, mt: 0.5 }}>
                Tổng quan hệ thống nông nghiệp số hoá (Smart agriculture overview)
              </Typography>
            </Box>
            {stats && (
              <Chip
                icon={<TrendingUpIcon />}
                label={<ViEnText vi="Dữ liệu thời gian thực" en="Real-time data" />}
                color="primary"
                variant="outlined"
              />
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Statistics Summary Cards */}
      {stats && (
        <Grid container spacing={2}>
          {stats.tasks && (
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.75 }}>
                        <ViEnText vi="Công việc" en="Tasks" />
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                        {stats.tasks.total || 0}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip
                          label={`${stats.tasks.completed || 0} hoàn thành`}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                        {stats.tasks.overdue > 0 && (
                          <Chip
                            label={`${stats.tasks.overdue} quá hạn`}
                            size="small"
                            color="error"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(6,182,212,0.12)',
                        color: '#06b6d4',
                      }}
                    >
                      <TaskAltOutlinedIcon />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )}
          {stats.devices && (
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.75 }}>
                        <ViEnText vi="Thiết bị" en="Devices" />
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                        {stats.devices.total || 0}
                      </Typography>
                      <Chip
                        label={`${stats.devices.active || 0} đang hoạt động`}
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(15,23,42,0.12)',
                        color: '#0f172a',
                      }}
                    >
                      <DevicesOtherOutlinedIcon />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )}
          {stats.orders && stats.orders.revenue > 0 && (
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.75 }}>
                        <ViEnText vi="Doanh thu" en="Revenue" />
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(stats.orders.revenue)}
                      </Typography>
                      <Chip
                        label={`${stats.orders.completed || 0} đơn hoàn thành`}
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(29,78,216,0.12)',
                        color: '#1d4ed8',
                      }}
                    >
                      <ShoppingCartOutlinedIcon />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )}
          {stats.summary && stats.summary.activeSeasons > 0 && (
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.75 }}>
                        <ViEnText vi="Mùa vụ đang canh tác" en="Active Seasons" />
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                        {stats.summary.activeSeasons}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(139,92,246,0.12)',
                        color: '#8b5cf6',
                      }}
                    >
                      <EventOutlinedIcon />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      )}

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


