import { useState, useEffect } from 'react';
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import httpClient from '../httpClient';
import { ViEnText } from './ViEnText';

export const NotificationsBell = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const open = Boolean(anchorEl);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await httpClient('http://localhost:4000/api/notifications', {
        method: 'GET',
      });
      const data = await response.json();
      setNotifications(data || []);
      setUnreadCount(data?.filter((n: any) => !n.read).length || 0);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await httpClient('http://localhost:4000/api/notifications/unread-count', {
        method: 'GET',
      });
      const data = await response.json();
      setUnreadCount(data.count || 0);
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
  }, [open]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await httpClient(`http://localhost:4000/api/notifications/${id}/read`, {
        method: 'PUT',
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await httpClient('http://localhost:4000/api/notifications/read-all', {
        method: 'PUT',
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{ position: 'relative' }}
      >
        <Badge badgeContent={unreadCount} color="error">
          {unreadCount > 0 ? <NotificationsIcon /> : <NotificationsNoneIcon />}
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: 360, maxHeight: 500, mt: 1 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              <ViEnText vi="Thông báo" en="Notifications" />
            </Typography>
            {unreadCount > 0 && (
              <Button size="small" onClick={handleMarkAllAsRead}>
                <ViEnText vi="Đánh dấu tất cả" en="Mark all read" />
              </Button>
            )}
          </Stack>
        </Box>
        <Divider />
        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {loading ? (
            <ListItem>
              <ListItemText
                primary={<ViEnText vi="Đang tải..." en="Loading..." />}
              />
            </ListItem>
          ) : notifications.length === 0 ? (
            <ListItem>
              <ListItemText
                primary={<ViEnText vi="Không có thông báo" en="No notifications" />}
              />
            </ListItem>
          ) : (
            notifications.map((notification) => (
              <ListItem
                key={notification.id}
                disablePadding
                sx={{
                  backgroundColor: notification.read ? 'transparent' : 'rgba(37,99,235,0.05)',
                }}
              >
                <ListItemButton
                  onClick={() => {
                    if (!notification.read) {
                      handleMarkAsRead(notification.id);
                    }
                    if (notification.link) {
                      window.location.href = notification.link;
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: 'primary.main',
                            }}
                          />
                        )}
                      </Stack>
                    }
                    secondary={
                      <>
                        <Typography variant="caption" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                          {new Date(notification.createdAt).toLocaleString('vi-VN')}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Popover>
    </>
  );
};

