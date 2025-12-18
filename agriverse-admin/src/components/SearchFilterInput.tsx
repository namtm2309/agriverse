import { TextInput } from 'react-admin';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';

export const SearchFilterInput = () => (
  <TextInput
    source="q"
    label={false}
    placeholder="Tìm kiếm… (Search)"
    alwaysOn
    resettable
    size="small"
    sx={{
      m: 1,
      minWidth: 280,
      '& .MuiOutlinedInput-root': {
        borderRadius: 999,
        backgroundColor: 'rgba(15, 23, 42, 0.03)',
        '& fieldset': { borderColor: 'rgba(15, 23, 42, 0.10)' },
        '&:hover fieldset': { borderColor: 'rgba(15, 23, 42, 0.18)' },
        '&.Mui-focused fieldset': { borderColor: '#2563eb' },
      },
      '& .MuiInputBase-input': {
        color: 'text.primary',
        fontSize: 14,
        py: 1,
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'text.secondary',
        opacity: 0.9,
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon fontSize="small" />
        </InputAdornment>
      ),
    }}
  />
);


