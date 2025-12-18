import { createTheme } from '@mui/material/styles';

// Giao diện hiện đại: bo góc lớn, nền sáng, typography rõ ràng (Modern look)
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563eb' }, // blue-600
    secondary: { main: '#06b6d4' }, // cyan-500
    background: {
      default: '#f6f8fc',
      paper: '#ffffff',
    },
    text: {
      // Giảm độ "đen" để giao diện dịu mắt hơn (Softer text colors)
      primary: '#1f2937', // slate-800
      secondary: '#6b7280', // slate-500
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    h6: { fontWeight: 700, color: '#334155' },
    h5: { fontWeight: 800, color: '#334155' },
    h4: { fontWeight: 800, color: '#1f2937' },
    h3: { fontWeight: 900, color: '#1f2937' },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          // Dialog header giống mẫu: trắng, thoáng (Clean header)
          backgroundImage: 'none',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(15, 23, 42, 0.08)',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 800,
          backgroundColor: 'rgba(15, 23, 42, 0.02)',
          color: '#334155', // slate-700
        },
        body: {
          color: '#334155',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#334155',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#64748b',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: '#334155',
        },
        notchedOutline: {
          borderColor: 'rgba(15, 23, 42, 0.12)',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#64748b',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
          border: '1px solid rgba(15,23,42,0.10)',
        },
      },
    },
  },
});



