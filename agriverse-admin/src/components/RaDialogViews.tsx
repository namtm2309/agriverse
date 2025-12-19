import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import {
  CreateBase,
  EditBase,
  useCreateContext,
  useEditContext,
  useRedirect,
  useResourceContext,
} from 'react-admin';
import { splitViEn, ViEnText } from './ViEnText';

function DialogHeader({ title }: { title: string }) {
  const { vi, en } = splitViEn(title);
  return (
    <Box
      component="span"
      sx={{
        fontWeight: 900,
        letterSpacing: -0.6,
        textAlign: 'center',
        fontSize: '1.5rem',
        lineHeight: 1.2,
      }}
    >
      <ViEnText vi={vi} en={en} enScale={0.55} />
    </Box>
  );
}

export const CreateDialog = (props: any) => (
  <CreateBase {...props}>
    <CreateDialogInner>{props.children}</CreateDialogInner>
  </CreateBase>
);

const CreateDialogInner = ({ children }: { children: any }) => {
  const { defaultTitle } = useCreateContext();
  const resource = useResourceContext();
  const redirect = useRedirect();

  return (
    <Dialog
      open
      onClose={() => redirect('list', resource)}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(15,23,42,0.10)',
          boxShadow: '0 40px 100px rgba(15,23,42,0.18)',
          width: 'auto',
          maxWidth: 'none',
        },
      }}
    >
      <DialogTitle
        sx={{
          py: { xs: 2, md: 2.25 },
          px: { xs: 2.5, md: 3.5 },
          backgroundColor: '#ffffff',
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DialogHeader title={defaultTitle} />
        <IconButton
          onClick={() => redirect('list', resource)}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, backgroundColor: '#ffffff', overflowX: 'hidden', width: '100%' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export const EditDialog = (props: any) => (
  <EditBase {...props}>
    <EditDialogInner>{props.children}</EditDialogInner>
  </EditBase>
);

const EditDialogInner = ({ children }: { children: any }) => {
  const { defaultTitle } = useEditContext();
  const resource = useResourceContext();
  const redirect = useRedirect();

  return (
    <Dialog
      open
      onClose={() => redirect('list', resource)}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(15,23,42,0.10)',
          boxShadow: '0 40px 100px rgba(15,23,42,0.18)',
          width: 'auto',
          maxWidth: 'none',
        },
      }}
    >
      <DialogTitle
        sx={{
          py: { xs: 2, md: 2.25 },
          px: { xs: 2.5, md: 3.5 },
          backgroundColor: '#ffffff',
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DialogHeader title={defaultTitle} />
        <IconButton
          onClick={() => redirect('list', resource)}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, backgroundColor: '#ffffff', overflowX: 'hidden', width: '100%' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};


