import { ViEnText } from './ViEnText';

export type ViEnChoice = { id: string; vi: string; en: string };

export const viEnOptionText = (choice: any) => {
  const vi = typeof choice?.vi === 'string' ? choice.vi : String(choice?.name ?? choice?.id ?? '');
  const en = typeof choice?.en === 'string' ? choice.en : '';
  return <ViEnText vi={vi} en={en} />;
};

export const USER_ROLE_CHOICES: ViEnChoice[] = [
  { id: 'ADMIN', vi: 'Quản trị', en: 'Admin' },
  { id: 'FARMER', vi: 'Nông dân', en: 'Farmer' },
  { id: 'INVESTOR', vi: 'Nhà đầu tư', en: 'Investor' },
  { id: 'CONSUMER', vi: 'Người tiêu dùng', en: 'Consumer' },
];

export const USER_STATUS_CHOICES: ViEnChoice[] = [
  { id: 'ACTIVE', vi: 'Hoạt động', en: 'Active' },
  { id: 'BLOCKED', vi: 'Bị khoá', en: 'Blocked' },
];

export const AREA_LEVEL_CHOICES: ViEnChoice[] = [
  { id: 'province', vi: 'Tỉnh/Thành phố', en: 'Province/City' },
  { id: 'district', vi: 'Quận/Huyện', en: 'District' },
  { id: 'commune', vi: 'Phường/Xã', en: 'Commune/Ward' },
];

export const FARM_CERTIFICATION_CHOICES: ViEnChoice[] = [
  { id: 'VietGAP', vi: 'VietGAP', en: 'Vietnam Good Agricultural Practices' },
  { id: 'GlobalGAP', vi: 'GlobalGAP', en: 'Global Good Agricultural Practices' },
];

export const FARM_STATUS_CHOICES: ViEnChoice[] = [
  { id: 'pending', vi: 'Chờ duyệt', en: 'Pending' },
  { id: 'approved', vi: 'Đã duyệt', en: 'Approved' },
];

export const SEASON_STATUS_CHOICES: ViEnChoice[] = [
  { id: 'PLANNED', vi: 'Kế hoạch', en: 'Planned' },
  { id: 'GROWING', vi: 'Đang trồng', en: 'Growing' },
  { id: 'HARVESTED', vi: 'Đã thu hoạch', en: 'Harvested' },
];


