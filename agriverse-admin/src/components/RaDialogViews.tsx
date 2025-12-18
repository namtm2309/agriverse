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
    <Typography
      variant="h5"
      sx={{
        fontWeight: 900,
        letterSpacing: -0.6,
        textAlign: 'center',
      }}
    >
      <ViEnText vi={vi} en={en} enScale={0.55} />
    </Typography>
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
      fullWidth
      maxWidth="md"
      onClose={() => redirect('list', resource)}
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(15,23,42,0.10)',
          boxShadow: '0 40px 100px rgba(15,23,42,0.18)',
          maxWidth: 980,
        },
      }}
    >
      <DialogTitle
        sx={{
          py: { xs: 2, md: 2.25 },
          px: { xs: 2.5, md: 3.5 },
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        <DialogHeader title={defaultTitle} />
        <IconButton
          onClick={() => redirect('list', resource)}
          size="small"
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, backgroundColor: '#ffffff', overflowX: 'hidden' }}>
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
      fullWidth
      maxWidth="md"
      onClose={() => redirect('list', resource)}
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(15,23,42,0.10)',
          boxShadow: '0 40px 100px rgba(15,23,42,0.18)',
          maxWidth: 980,
        },
      }}
    >
      <DialogTitle
        sx={{
          py: { xs: 2, md: 2.25 },
          px: { xs: 2.5, md: 3.5 },
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        <DialogHeader title={defaultTitle} />
        <IconButton
          onClick={() => redirect('list', resource)}
          size="small"
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, backgroundColor: '#ffffff', overflowX: 'hidden' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};


