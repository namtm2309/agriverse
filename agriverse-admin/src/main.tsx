import React from 'react';
import ReactDOM from 'react-dom/client';
import { Admin, Resource, CustomRoutes } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { UsersList, UsersEdit, UsersCreate } from './resources/users';
import { AreasList, AreasEdit, AreasCreate } from './resources/areas';
import { FarmsList, FarmsEdit, FarmsCreate } from './resources/farms';
import { PlotsList, PlotsEdit, PlotsCreate } from './resources/plots';
import { CropsList, CropsEdit, CropsCreate } from './resources/crops';
import { SeasonsList, SeasonsEdit, SeasonsCreate } from './resources/seasons';
import { TasksList, TasksEdit, TasksCreate } from './resources/tasks';
import { FarmLogsList, FarmLogsEdit, FarmLogsCreate } from './resources/farmLogs';
import { DevicesList, DevicesEdit, DevicesCreate } from './resources/devices';
import { SensorDataList, SensorDataEdit, SensorDataCreate } from './resources/sensorData';
import { HarvestsList, HarvestsEdit, HarvestsCreate } from './resources/harvests';
import {
  ProductBatchesList,
  ProductBatchesEdit,
  ProductBatchesCreate,
} from './resources/productBatches';
import { NftAssetsList, NftAssetsEdit, NftAssetsCreate } from './resources/nftAssets';
import { OrdersList, OrdersEdit, OrdersCreate } from './resources/orders';
import { AdminLogsList, AdminLogsEdit, AdminLogsCreate } from './resources/adminLogs';
import { authProvider } from './authProvider';
import httpClient from './httpClient';
import { i18nProvider } from './i18nProvider';
import { theme } from './theme';
import { MyLayout } from './layout/MyLayout';

const API_URL = '/api';

const dataProvider = simpleRestProvider(API_URL, httpClient);

const App = () => (
  <Admin
    dataProvider={dataProvider}
    dashboard={Dashboard}
    loginPage={LoginPage}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    theme={theme}
    layout={MyLayout}
  >
    <Resource name="users" options={{ label: 'Người dùng (Users)' }} list={UsersList} edit={UsersEdit} create={UsersCreate} />
    <Resource name="areas" options={{ label: 'Khu vực (Areas)' }} list={AreasList} edit={AreasEdit} create={AreasCreate} />
    <Resource name="farms" options={{ label: 'Trang trại (Farms)' }} list={FarmsList} edit={FarmsEdit} create={FarmsCreate} />
    <Resource name="plots" options={{ label: 'Lô đất (Plots)' }} list={PlotsList} edit={PlotsEdit} create={PlotsCreate} />
    <Resource name="crops" options={{ label: 'Giống cây (Crops)' }} list={CropsList} edit={CropsEdit} create={CropsCreate} />
    <Resource name="seasons" options={{ label: 'Mùa vụ (Seasons)' }} list={SeasonsList} edit={SeasonsEdit} create={SeasonsCreate} />
    <Resource name="tasks" options={{ label: 'Công việc (Tasks)' }} list={TasksList} edit={TasksEdit} create={TasksCreate} />
    <Resource
      name="farm-logs"
      options={{ label: 'Nhật ký (Farm logs)' }}
      list={FarmLogsList}
      edit={FarmLogsEdit}
      create={FarmLogsCreate}
    />
    <Resource name="devices" options={{ label: 'Thiết bị (Devices)' }} list={DevicesList} edit={DevicesEdit} create={DevicesCreate} />
    <Resource
      name="sensor-data"
      options={{ label: 'Cảm biến (Sensor data)' }}
      list={SensorDataList}
      edit={SensorDataEdit}
      create={SensorDataCreate}
    />
    <Resource
      name="harvests"
      options={{ label: 'Thu hoạch (Harvests)' }}
      list={HarvestsList}
      edit={HarvestsEdit}
      create={HarvestsCreate}
    />
    <Resource
      name="product-batches"
      options={{ label: 'Lô sản phẩm (Product batches)' }}
      list={ProductBatchesList}
      edit={ProductBatchesEdit}
      create={ProductBatchesCreate}
    />
    <Resource
      name="nft-assets"
      options={{ label: 'NFT (NFT assets)' }}
      list={NftAssetsList}
      edit={NftAssetsEdit}
      create={NftAssetsCreate}
    />
    <Resource name="orders" options={{ label: 'Đơn hàng (Orders)' }} list={OrdersList} edit={OrdersEdit} create={OrdersCreate} />
    <Resource
      name="admin-logs"
      options={{ label: 'Log quản trị (Admin logs)' }}
      list={AdminLogsList}
      edit={AdminLogsEdit}
      create={AdminLogsCreate}
    />
    <CustomRoutes>
      <Route path="/" element={<Dashboard />} />
    </CustomRoutes>
  </Admin>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);


