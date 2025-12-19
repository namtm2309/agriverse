import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  LinearProgress,
} from '@mui/material';
import { ViEnText } from '../components/ViEnText';
import httpClient from '../httpClient';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const StatisticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [taskStats, setTaskStats] = useState<any>(null);
  const [farmLogStats, setFarmLogStats] = useState<any>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, [selectedSeason]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [overviewRes, taskRes, logRes] = await Promise.all([
        httpClient('http://localhost:4000/api/statistics/overview', { method: 'GET' }),
        httpClient(
          `http://localhost:4000/api/statistics/tasks${selectedSeason ? `?seasonId=${selectedSeason}` : ''}`,
          { method: 'GET' },
        ),
        httpClient(
          `http://localhost:4000/api/statistics/farm-logs${selectedSeason ? `?seasonId=${selectedSeason}` : ''}`,
          { method: 'GET' },
        ),
      ]);

      setOverview(await overviewRes.json());
      setTaskStats(await taskRes.json());
      setFarmLogStats(await logRes.json());
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Stack spacing={2}>
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              <ViEnText vi="Phân tích & Thống kê" en="Statistics & Analytics" />
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
                <ViEnText vi="Phân tích & Thống kê" en="Statistics & Analytics" />
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.75, mt: 0.5 }}>
                <ViEnText
                  vi="Dữ liệu phân tích chi tiết về mùa vụ, công việc và nhật ký canh tác"
                  en="Detailed analytics on seasons, tasks, and farm logs"
                />
              </Typography>
            </Box>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>
                <ViEnText vi="Lọc theo mùa vụ" en="Filter by season" />
              </InputLabel>
              <Select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                label={<ViEnText vi="Lọc theo mùa vụ" en="Filter by season" />}
              >
                <MenuItem value="">
                  <ViEnText vi="Tất cả" en="All" />
                </MenuItem>
                {/* Có thể fetch danh sách seasons và populate vào đây */}
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      {/* Task Statistics */}
      {taskStats && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <BarChartIcon color="primary" />
                  <Typography variant="h6">
                    <ViEnText vi="Thống kê công việc" en="Task Statistics" />
                  </Typography>
                </Stack>
                {taskStats.byStatus && taskStats.byStatus.length > 0 ? (
                  <Stack spacing={2}>
                    {taskStats.byStatus.map((item: any) => (
                      <Box key={item.status}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                          <Typography variant="body2">
                            {item.status || 'UNKNOWN'}
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {item.count}
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={(item.count / taskStats.byStatus.reduce((sum: number, i: any) => sum + i.count, 0)) * 100}
                          sx={{ height: 8, borderRadius: 1 }}
                        />
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    <ViEnText vi="Không có dữ liệu" en="No data" />
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <TrendingUpIcon color="primary" />
                  <Typography variant="h6">
                    <ViEnText vi="Công việc theo loại" en="Tasks by Type" />
                  </Typography>
                </Stack>
                {taskStats.byType && taskStats.byType.length > 0 ? (
                  <Stack spacing={2}>
                    {taskStats.byType.map((item: any) => (
                      <Box key={item.type}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                          <Typography variant="body2">
                            {item.type || 'UNKNOWN'}
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {item.count}
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={(item.count / taskStats.byType.reduce((sum: number, i: any) => sum + i.count, 0)) * 100}
                          sx={{ height: 8, borderRadius: 1 }}
                        />
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    <ViEnText vi="Không có dữ liệu" en="No data" />
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Farm Logs Statistics */}
      {farmLogStats && (
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <BarChartIcon color="primary" />
              <Typography variant="h6">
                <ViEnText vi="Thống kê nhật ký canh tác" en="Farm Logs Statistics" />
              </Typography>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {farmLogStats.total || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <ViEnText vi="Tổng số nhật ký" en="Total Logs" />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    {farmLogStats.byTask?.length || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <ViEnText vi="Nhật ký theo công việc" en="Logs by Task" />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700} color="info.main">
                    {farmLogStats.timeSeries?.length || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <ViEnText vi="Ngày có dữ liệu" en="Days with Data" />
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Overview Summary */}
      {overview && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              <ViEnText vi="Tổng quan hệ thống" en="System Overview" />
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700}>
                    {overview.users?.total || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <ViEnText vi="Người dùng" en="Users" />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700}>
                    {overview.farms?.total || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <ViEnText vi="Trang trại" en="Farms" />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700}>
                    {overview.seasons?.total || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <ViEnText vi="Mùa vụ" en="Seasons" />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700}>
                    {overview.orders?.total || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <ViEnText vi="Đơn hàng" en="Orders" />
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

