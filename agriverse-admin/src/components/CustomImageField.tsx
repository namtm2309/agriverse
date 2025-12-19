import { Box } from '@mui/material';
import { useRecordContext } from 'react-admin';

export const CustomImageField = ({ source, label }: { source: string; label?: string }) => {
  const record = useRecordContext();
  
  console.log('CustomImageField: record:', record);
  console.log('CustomImageField: source:', source);
  console.log('CustomImageField: record[source]:', record?.[source]);
  
  if (!record || !record[source]) {
    console.log('CustomImageField: No record or no imageUrl, returning empty box');
    return <Box sx={{ minWidth: 100, minHeight: 50 }} />;
  }

  let imageUrl = record[source];
  console.log('CustomImageField: Original imageUrl:', imageUrl);
  
  // Xử lý URL (Handle URL)
  if (typeof imageUrl === 'string' && imageUrl.trim()) {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      // Đã là full URL
      console.log('CustomImageField: Already full URL');
    } else if (imageUrl.startsWith('/uploads/')) {
      imageUrl = `http://localhost:4000${imageUrl}`;
      console.log('CustomImageField: Converted to full URL:', imageUrl);
    } else if (!imageUrl.startsWith('/')) {
      imageUrl = `http://localhost:4000/uploads/${imageUrl}`;
      console.log('CustomImageField: Added /uploads/ prefix:', imageUrl);
    } else {
      imageUrl = `http://localhost:4000${imageUrl}`;
      console.log('CustomImageField: Added localhost prefix:', imageUrl);
    }
  } else {
    console.log('CustomImageField: imageUrl is not a valid string, returning empty box');
    return <Box sx={{ minWidth: 100, minHeight: 50 }} />;
  }
  
  console.log('CustomImageField: Final imageUrl:', imageUrl);

  return (
    <Box
      component="img"
      src={imageUrl}
      alt={label || 'Image'}
      sx={{
        maxHeight: 50,
        maxWidth: 100,
        objectFit: 'contain',
        borderRadius: 1,
        display: 'block',
        cursor: 'pointer',
      }}
      onClick={() => {
        // Mở ảnh trong tab mới khi click (Open image in new tab on click)
        window.open(imageUrl, '_blank');
      }}
      onError={(e) => {
        // Hiển thị placeholder nếu lỗi (Show placeholder on error)
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = '<span style="color: #999; font-size: 12px;">No image</span>';
        }
      }}
    />
  );
};

