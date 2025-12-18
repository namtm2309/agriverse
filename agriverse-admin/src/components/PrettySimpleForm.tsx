import { Box } from '@mui/material';
import {
  SaveButton,
  SimpleForm,
  SimpleFormProps,
  Toolbar,
} from 'react-admin';
import { Children, isValidElement, ReactNode } from 'react';

const PrettyToolbar = () => (
  <Toolbar
    sx={{
      mt: 2,
      px: { xs: 3, md: 4 },
      pb: { xs: 2.5, md: 3 },
      backgroundColor: '#ffffff',
      '& .RaToolbar-defaultToolbar': { width: '100%' },
    }}
  >
    <SaveButton
      variant="contained"
      sx={{
        width: '100%',
        height: 48,
        borderRadius: 3,
        fontWeight: 900,
        letterSpacing: 0.6,
        boxShadow: '0 18px 45px rgba(37,99,235,0.20)',
        backgroundImage:
          'linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(6,182,212,1) 100%)',
        '&:hover': {
          boxShadow: '0 22px 55px rgba(37,99,235,0.26)',
          backgroundImage:
            'linear-gradient(90deg, rgba(29,78,216,1) 0%, rgba(8,145,178,1) 100%)',
        },
        '&.Mui-disabled': {
          backgroundImage: 'none',
          backgroundColor: 'rgba(15,23,42,0.12)',
          color: 'rgba(15,23,42,0.35)',
          boxShadow: 'none',
        },
      }}
    />
  </Toolbar>
);

export const PrettySimpleForm = ({ children, ...rest }: SimpleFormProps) => {
  const items: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child)) items.push(child);
  });

  return (
    <SimpleForm
      {...rest}
      toolbar={<PrettyToolbar />}
      sx={{
        p: 0,
        overflowX: 'hidden',
        // React-Admin wrappers đôi khi có margin làm "xô lệch" các hàng (Normalize RA spacing)
        '& .RaInput-root': { m: 0, minWidth: 0 },
        '& .RaLabeled-root': { m: 0, minWidth: 0 },
        '& .MuiFormControl-root': { width: '100%', minWidth: 0, m: 0 },
        '& .RaSimpleFormIterator-root': { width: '100%' },
        // Chuẩn hoá chiều cao/padding cho input & select để cân đối, tránh bị "phình" (Consistent control height)
        '& .MuiOutlinedInput-root:not(.MuiOutlinedInput-multiline)': {
          minHeight: 48,
          alignItems: 'center',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: 'rgba(248,250,252,1)', // slate-50
          transition: 'box-shadow 150ms ease, background-color 150ms ease, border-color 150ms ease',
          '& fieldset': { borderColor: 'rgba(148,163,184,0.55)' }, // slate-400
          '&:hover fieldset': { borderColor: 'rgba(100,116,139,0.65)' }, // slate-500
          '&.Mui-focused fieldset': { borderColor: 'rgba(37,99,235,0.9)' },
          '&.Mui-focused': {
            backgroundColor: '#ffffff',
            boxShadow: '0 0 0 4px rgba(37,99,235,0.12)',
          },
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          backgroundColor: '#ffffff',
        },
        '& .MuiOutlinedInput-input': {
          // padding chuẩn giống UI mẫu, không làm input bị "to quá"
          padding: '12px 14px',
          boxSizing: 'border-box',
        },
        '& .MuiSelect-select': {
          padding: '12px 14px',
          boxSizing: 'border-box',
          minHeight: 'unset',
          display: 'block',
        },
        '& .MuiInputBase-input': {
          fontSize: 14,
        },
        '& textarea.MuiInputBase-input': {
          padding: '12px 14px',
        },
        '& .MuiInputLabel-root': {
          color: 'text.secondary',
          fontWeight: 700,
        },
        '& .MuiFormHelperText-root': {
          marginLeft: 0,
          marginRight: 0,
          color: 'text.secondary',
        },
      }}
    >
      <Box
        sx={{
          px: { xs: 3, md: 4 },
          pt: { xs: 0.25, md: 0.25 },
          pb: { xs: 0.5, md: 0.5 },
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            width: '100%',
            maxWidth: '100%',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
            gap: { xs: 2, md: 2.25 },
            alignItems: 'start',
            '& .span-2': { gridColumn: '1 / -1' },
          }}
        >
          {items.map((child, idx) => (
            <Box key={idx} sx={{ minWidth: 0 }}>
              {child}
            </Box>
          ))}
        </Box>
      </Box>
    </SimpleForm>
  );
};


