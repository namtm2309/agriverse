import { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  Box,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, Close as CloseIcon } from '@mui/icons-material';
import { useLogin, useNotify } from 'react-admin';

export const LoginPage = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Forgot password states
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotUsername, setForgotUsername] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [step, setStep] = useState<'forgot' | 'reset'>('forgot'); // 'forgot' or 'reset'

  const login = useLogin();
  const notify = useNotify();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login({ username, password });
    } catch (e) {
      notify('Sai tài khoản hoặc mật khẩu', { type: 'warning' });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleForgotPassword = async () => {
    if (!forgotUsername.trim()) {
      notify('Vui lòng nhập username', { type: 'warning' });
      return;
    }

    setForgotLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: forgotUsername }),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu token để bước tiếp theo
        if (data.token) {
          setResetToken(data.token);
          setStep('reset');
          notify('Token đã được tạo. Vui lòng nhập mật khẩu mới.', { type: 'success' });
        } else {
          notify(data.message || 'Yêu cầu đã được gửi', { type: 'info' });
        }
      } else {
        notify(data.message || 'Có lỗi xảy ra', { type: 'error' });
      }
    } catch (error) {
      notify('Không thể kết nối đến server', { type: 'error' });
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      notify('Vui lòng nhập mật khẩu mới', { type: 'warning' });
      return;
    }

    if (newPassword !== confirmPassword) {
      notify('Mật khẩu xác nhận không khớp', { type: 'warning' });
      return;
    }

    if (newPassword.length < 4) {
      notify('Mật khẩu phải có ít nhất 4 ký tự', { type: 'warning' });
      return;
    }

    setResetLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: resetToken,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        notify('Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.', {
          type: 'success',
        });
        handleCloseForgotPassword();
        // Tự động điền username vào form đăng nhập
        setUsername(forgotUsername);
      } else {
        notify(data.message || 'Token không hợp lệ hoặc đã hết hạn', { type: 'error' });
      }
    } catch (error) {
      notify('Không thể kết nối đến server', { type: 'error' });
    } finally {
      setResetLoading(false);
    }
  };

  const handleCloseForgotPassword = () => {
    setForgotPasswordOpen(false);
    setStep('forgot');
    setForgotUsername('');
    setResetToken('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Card sx={{ minWidth: 320 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Đăng nhập AgriVerse
          </Typography>
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                fullWidth
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Đang đăng nhập...' : 'Login'}
              </Button>
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => setForgotPasswordOpen(true)}
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Quên mật khẩu? (Forgot password?)
                </Link>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>

      {/* Forgot Password Dialog */}
      <Dialog
        open={forgotPasswordOpen}
        onClose={handleCloseForgotPassword}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {step === 'forgot' ? 'Quên mật khẩu (Forgot Password)' : 'Đặt lại mật khẩu (Reset Password)'}
            </Typography>
            <IconButton onClick={handleCloseForgotPassword} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {step === 'forgot' ? (
              <>
                <Typography variant="body2" color="text.secondary">
                  Nhập username của bạn để nhận token reset mật khẩu.
                  <br />
                  (Enter your username to receive a password reset token.)
                </Typography>
                <TextField
                  label="Username"
                  value={forgotUsername}
                  onChange={e => setForgotUsername(e.target.value)}
                  fullWidth
                  autoFocus
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleForgotPassword();
                    }
                  }}
                />
                {resetToken && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                      Token đã được tạo (Token created):
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                        mt: 0.5,
                      }}
                    >
                      {resetToken}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Token này sẽ hết hạn sau 1 giờ. (This token will expire in 1 hour.)
                    </Typography>
                  </Alert>
                )}
              </>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary">
                  Nhập mật khẩu mới của bạn.
                  <br />
                  (Enter your new password.)
                </Typography>
                {resetToken && (
                  <Alert severity="info" sx={{ mb: 1 }}>
                    <Typography variant="caption">
                      Token: <strong>{resetToken.substring(0, 20)}...</strong>
                    </Typography>
                  </Alert>
                )}
                <TextField
                  label="Mật khẩu mới (New Password)"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  fullWidth
                  autoFocus
                  helperText="Tối thiểu 4 ký tự (Minimum 4 characters)"
                />
                <TextField
                  label="Xác nhận mật khẩu (Confirm Password)"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  fullWidth
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleResetPassword();
                    }
                  }}
                />
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseForgotPassword} color="inherit">
            Hủy (Cancel)
          </Button>
          {step === 'forgot' ? (
            <Button
              onClick={handleForgotPassword}
              variant="contained"
              disabled={forgotLoading || !forgotUsername.trim()}
            >
              {forgotLoading ? 'Đang xử lý...' : 'Gửi yêu cầu (Send Request)'}
            </Button>
          ) : (
            <Button
              onClick={handleResetPassword}
              variant="contained"
              disabled={
                resetLoading ||
                !newPassword.trim() ||
                !confirmPassword.trim() ||
                newPassword !== confirmPassword
              }
            >
              {resetLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu (Reset Password)'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

