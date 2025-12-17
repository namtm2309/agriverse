import { Card, CardContent, Typography } from '@mui/material';

export const Dashboard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          AgriVerse Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Tổng quan hệ thống nông nghiệp số hoá: Farm, Plot, Season, NFT và Marketplace.
        </Typography>
      </CardContent>
    </Card>
  );
};


