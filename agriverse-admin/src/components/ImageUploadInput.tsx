import { useState, useRef, useEffect } from 'react';
import { useInput, useNotify, Labeled, useRecordContext } from 'react-admin';
import { TextField, Button, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

export const ImageUploadInput = ({ source, label }: { source: string; label?: string }) => {
  const { field } = useInput({ source });
  const record = useRecordContext<any>();
  const notify = useNotify();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup preview URL (Cleanup preview URL)
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleClearImage = async () => {
    // Nếu có URL ảnh đã lưu (từ database), xóa file trên server (If there's a saved image URL (from database), delete file on server)
    if (field.value && typeof field.value === 'string') {
      try {
        let filename = '';
        
        // Xử lý nhiều định dạng URL (Handle multiple URL formats)
        // 1. Full URL: http://localhost:4000/uploads/1234567890-123456789.jpg
        // 2. Relative path: /uploads/1234567890-123456789.jpg
        // 3. Just filename: 1234567890-123456789.jpg
        if (field.value.includes('/uploads/')) {
          // Extract filename từ URL (Extract filename from URL)
          const parts = field.value.split('/uploads/');
          filename = parts[parts.length - 1];
        } else if (field.value.match(/^[a-zA-Z0-9._-]+$/)) {
          // Chỉ là filename (Just filename)
          filename = field.value;
        }
        
        console.log('ImageUploadInput: handleClearImage - field.value:', field.value);
        console.log('ImageUploadInput: handleClearImage - extracted filename:', filename);
        
        if (filename) {
          const token = localStorage.getItem('agriverse_token');
          if (token) {
            console.log('ImageUploadInput: Calling DELETE endpoint for:', filename);
            const deleteUrl = `http://localhost:4000/api/upload/image/${encodeURIComponent(filename)}`;
            console.log('ImageUploadInput: DELETE URL:', deleteUrl);
            
            const response = await fetch(deleteUrl, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            console.log('ImageUploadInput: DELETE response status:', response.status);
            
            if (response.ok) {
              const result = await response.json();
              console.log('ImageUploadInput: File deleted from server successfully:', result);
              notify('Đã xóa ảnh khỏi server (Image deleted from server)', { type: 'success' });
            } else {
              // Không throw error - chỉ log, vì có thể file đã bị xóa trước đó (Don't throw error - just log, file might have been deleted already)
              const errorData = await response.json().catch(() => ({ message: 'Delete failed' }));
              console.warn('ImageUploadInput: Failed to delete file from server:', response.status, errorData);
            }
          } else {
            console.warn('ImageUploadInput: No token found, cannot delete file from server');
          }
        } else {
          console.warn('ImageUploadInput: Could not extract filename from:', field.value);
        }
      } catch (error: any) {
        // Không throw error - chỉ log, vì việc xóa file không quan trọng bằng việc clear field (Don't throw error - just log, clearing field is more important)
        console.error('ImageUploadInput: Error deleting file from server:', error);
      }
    } else {
      console.log('ImageUploadInput: No field.value to delete, or field.value is not a string:', field.value);
    }

    // Xóa field và state (Clear field and state)
    field.onChange(null);
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    console.log('ImageUploadInput: Cleared image for', storeKey);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('ImageUploadInput: handleFileChange called with file:', file.name);

    // Validate file type
    if (!file.type.match(/^image\/(jpg|jpeg|png|gif|webp)$/)) {
      notify('Chỉ chấp nhận file ảnh (Only image files allowed)', { type: 'error' });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      notify('File quá lớn, tối đa 5MB (File too large, max 5MB)', { type: 'error' });
      return;
    }

    // Xóa preview cũ nếu có (Remove old preview if exists)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Lưu URL ảnh cũ trước khi xóa field.value (Save old image URL before clearing field.value)
    const oldImageUrl = field.value && typeof field.value === 'string' ? field.value : null;
    console.log('ImageUploadInput: Current field.value (old URL):', oldImageUrl);

    // Lưu file - KHÔNG upload ngay (Save file - DON'T upload immediately)
    // Upload sẽ xảy ra khi bấm Save (Upload will happen when Save is clicked)
    setSelectedFile(file);
    
    // Tạo preview từ file (Create preview from file)
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Lưu File object vào field.value để PrettySimpleForm.transform xử lý upload (Save File object into field.value for transform)
    field.onChange(file);

    console.log('ImageUploadInput: File selected (not uploaded yet):', file.name, 'field.value is File');
  };

  return (
    <Labeled label={label || 'Ảnh (Image)'}>
      <Box sx={{ width: '100%', minWidth: 0 }}>
      <input
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        id={`image-upload-${source}`}
        type="file"
        onChange={handleFileChange}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          width: '100%',
        }}
      >
        <label htmlFor={`image-upload-${source}`} style={{ width: '100%', display: 'block' }}>
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
            fullWidth
            sx={{
              minHeight: 48,
              borderRadius: 2,
              backgroundColor: 'rgba(248,250,252,1)',
              borderColor: 'rgba(148,163,184,0.55)',
              color: 'text.primary',
              textTransform: 'none',
              fontWeight: 500,
              justifyContent: 'flex-start',
              transition: 'all 150ms ease',
              '&:hover': {
                backgroundColor: 'rgba(241,245,249,1)',
                borderColor: 'rgba(100,116,139,0.65)',
              },
              '&:focus': {
                borderColor: 'rgba(37,99,235,0.9)',
                boxShadow: '0 0 0 4px rgba(37,99,235,0.12)',
                backgroundColor: '#ffffff',
              },
            }}
          >
            Chọn ảnh (Choose Image)
          </Button>
        </label>
        {(field.value || selectedFile) && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            {field.value && typeof field.value === 'string' && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.875rem' }}>
                    URL ảnh (Image URL):
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleClearImage}
                    sx={{
                      minWidth: 'auto',
                      px: 1.5,
                      py: 0.5,
                      fontSize: '0.8125rem',
                      textTransform: 'none',
                    }}
                  >
                    Xóa ảnh (Clear)
                  </Button>
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="http://localhost:4000/uploads/..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      minHeight: 48,
                      borderRadius: 2,
                      backgroundColor: 'rgba(248,250,252,1)',
                    },
                  }}
                />
              </>
            )}
            {!field.value && selectedFile && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.875rem' }}>
                  Ảnh đã chọn (Selected image):
                </Typography>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleClearImage}
                  sx={{
                    minWidth: 'auto',
                    px: 1.5,
                    py: 0.5,
                    fontSize: '0.8125rem',
                    textTransform: 'none',
                  }}
                >
                  Xóa ảnh (Clear)
                </Button>
              </Box>
            )}
            <Box
              component="img"
              src={
                previewUrl ||
                (field.value && typeof field.value === 'string'
                  ? field.value.startsWith('http')
                    ? field.value
                    : `http://localhost:4000${field.value}`
                  : record?.[source]
                  ? typeof record[source] === 'string' && record[source].startsWith('http')
                    ? record[source]
                    : `http://localhost:4000${record[source]}`
                  : '')
              }
              alt="Preview"
              sx={{
                width: '100%',
                maxHeight: 200,
                objectFit: 'contain',
                border: '1px solid rgba(148,163,184,0.3)',
                borderRadius: 2,
                backgroundColor: 'rgba(248,250,252,0.5)',
                p: 1,
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
    </Labeled>
  );
};

