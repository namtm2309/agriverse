import { MenuItemLink, useGetResourceLabel, useResourceDefinitions } from 'react-admin';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { ViEnText, splitViEn } from '../components/ViEnText';

function Label({ label }: { label: string }) {
  const { vi, en } = splitViEn(label);
  return <ViEnText vi={vi} en={en} />;
}

const iconMap: Record<
  string,
  { Icon: any; color: string; bg: string }
> = {
  users: { Icon: PeopleAltOutlinedIcon, color: '#2563eb', bg: 'rgba(37,99,235,0.12)' },
  areas: { Icon: PlaceOutlinedIcon, color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)' },
  farms: { Icon: HomeWorkOutlinedIcon, color: '#16a34a', bg: 'rgba(22,163,74,0.12)' },
  plots: { Icon: GridOnOutlinedIcon, color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
  crops: { Icon: SpaOutlinedIcon, color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  seasons: { Icon: EventOutlinedIcon, color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
  tasks: { Icon: TaskAltOutlinedIcon, color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
  'farm-logs': { Icon: ArticleOutlinedIcon, color: '#64748b', bg: 'rgba(100,116,139,0.12)' },
  devices: { Icon: DevicesOtherOutlinedIcon, color: '#0f172a', bg: 'rgba(15,23,42,0.08)' },
  'sensor-data': { Icon: SensorsOutlinedIcon, color: '#14b8a6', bg: 'rgba(20,184,166,0.12)' },
  harvests: { Icon: AgricultureOutlinedIcon, color: '#a16207', bg: 'rgba(161,98,7,0.12)' },
  'product-batches': { Icon: Inventory2OutlinedIcon, color: '#7c3aed', bg: 'rgba(124,58,237,0.12)' },
  'nft-assets': { Icon: DiamondOutlinedIcon, color: '#db2777', bg: 'rgba(219,39,119,0.12)' },
  orders: { Icon: ShoppingCartOutlinedIcon, color: '#1d4ed8', bg: 'rgba(29,78,216,0.12)' },
  'admin-logs': { Icon: AdminPanelSettingsOutlinedIcon, color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
};

function IconChip({ name }: { name: string }) {
  const def = iconMap[name];
  const Icon = def?.Icon;
  const color = def?.color ?? '#0f172a';
  const bg = def?.bg ?? 'rgba(15,23,42,0.08)';
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: 999,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bg,
        color,
      }}
    >
      {Icon ? <Icon fontSize="small" /> : null}
    </Box>
  );
}

export const MyMenu = () => {
  const resources = useResourceDefinitions();
  const getResourceLabel = useGetResourceLabel();

  const entries = Object.keys(resources).filter((name) => resources[name].hasList);

  const renderResourceItem = (name: string): ReactNode => {
    const label = getResourceLabel(name, 2);
    return (
      <MenuItemLink
        key={name}
        to={`/${name}`}
        primaryText={<Label label={label} />}
        leftIcon={<IconChip name={name} />}
        sx={{
          mx: 1,
          my: 0.25,
          borderRadius: 2,
          '&.RaMenuItemLink-active': {
            backgroundColor: 'rgba(37,99,235,0.10)',
          },
        }}
      />
    );
  };

  return (
    <>
      <MenuItemLink
        to="/"
        primaryText={<ViEnText vi="Bảng điều khiển" en="Dashboard" />}
        leftIcon={
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 999,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(37,99,235,0.12)',
              color: '#2563eb',
            }}
          >
            <DashboardIcon fontSize="small" />
          </Box>
        }
        sx={{
          mx: 1,
          my: 0.5,
          borderRadius: 2,
          '&.RaMenuItemLink-active': {
            backgroundColor: 'rgba(37,99,235,0.10)',
          },
        }}
      />
      {entries.map(renderResourceItem)}
    </>
  );
};



