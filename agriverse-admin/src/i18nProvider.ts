import type { I18nProvider } from 'react-admin';

type Messages = Record<string, any>;

const messages: Messages = {
  ra: {
    action: {
      add_filter: 'Thêm bộ lọc (Add filter)',
      add: 'Thêm (Add)',
      back: 'Quay lại (Back)',
      cancel: 'Huỷ (Cancel)',
      clear_array_input: 'Xoá (Clear)',
      create: 'Tạo (Create)',
      delete: 'Xoá (Delete)',
      edit: 'Sửa (Edit)',
      export: 'Xuất (Export)',
      list: 'Danh sách (List)',
      refresh: 'Tải lại (Refresh)',
      save: 'Lưu (Save)',
      search: 'Tìm kiếm (Search)',
      show: 'Xem (Show)',
    },
    boolean: {
      true: 'Có (Yes)',
      false: 'Không (No)',
    },
    navigation: {
      no_results: 'Không có dữ liệu (No results)',
      no_more_results: 'Không còn dữ liệu (No more results)',
      page_rows_per_page: 'Số dòng mỗi trang (Rows per page)',
      page_range_info: '%{offsetBegin}-%{offsetEnd} / %{total}',
    },
    message: {
      about: 'Giới thiệu (About)',
      delete_title: 'Xoá %{name} #%{id} (Delete)',
      delete_content: 'Bạn có chắc chắn muốn xoá? (Are you sure?)',
      loading: 'Đang tải... (Loading)',
      saved: 'Đã lưu (Saved)',
      error: 'Có lỗi xảy ra (Error)',
      invalid_form: 'Form không hợp lệ (Invalid form)',
    },
    page: {
      create: 'Tạo %{name}',
      edit: 'Sửa %{name} #%{id}',
      list: 'Danh sách %{name}',
      dashboard: 'Bảng điều khiển (Dashboard)',
    },
  },
  resources: {
    users: {
      name: 'Người dùng (Users)',
      fields: {
        id: 'ID',
        username: 'Tài khoản (Username)',
        email: 'Email',
        password: 'Mật khẩu (Password)',
        role: 'Vai trò (Role)',
        status: 'Trạng thái (Status)',
        walletAddress: 'Ví (Wallet address)',
        createdAt: 'Tạo lúc (Created at)',
      },
    },
    areas: {
      name: 'Khu vực (Areas)',
      fields: {
        id: 'ID',
        name: 'Tên (Name)',
        parentId: 'Khu vực cha (Parent id)',
        level: 'Cấp (Level)',
      },
    },
    farms: {
      name: 'Trang trại (Farms)',
      fields: {
        id: 'ID',
        name: 'Tên (Name)',
        areaId: 'Khu vực (Area)',
        ownerId: 'Chủ (Owner)',
        address: 'Địa chỉ (Address)',
        certification: 'Chứng nhận (Certification)',
        status: 'Trạng thái (Status)',
        description: 'Mô tả (Description)',
      },
    },
    plots: {
      name: 'Lô đất (Plots)',
      fields: {
        id: 'ID',
        farmId: 'Trang trại (Farm)',
        code: 'Mã lô (Code)',
        areaSize: 'Diện tích (Area size)',
        soilType: 'Loại đất (Soil type)',
        waterSource: 'Nguồn nước (Water source)',
        gpsPolygon: 'GPS (Polygon JSON)',
        status: 'Trạng thái (Status)',
      },
    },
    crops: {
      name: 'Giống cây (Crops)',
      fields: {
        id: 'ID',
        name: 'Tên (Name)',
        variety: 'Giống (Variety)',
        growthDays: 'Số ngày (Growth days)',
        tempMin: 'Nhiệt độ min (Temp min)',
        tempMax: 'Nhiệt độ max (Temp max)',
        humidityMin: 'Độ ẩm min (Humidity min)',
        humidityMax: 'Độ ẩm max (Humidity max)',
      },
    },
    seasons: {
      name: 'Mùa vụ (Seasons)',
      fields: {
        id: 'ID',
        plotId: 'Lô đất (Plot)',
        cropId: 'Giống cây (Crop)',
        startDate: 'Ngày bắt đầu (Start date)',
        expectedHarvestDate: 'Ngày thu hoạch dự kiến (Expected harvest date)',
        expectedYield: 'Sản lượng dự kiến (Expected yield)',
        status: 'Trạng thái (Status)',
      },
    },
    tasks: {
      name: 'Công việc (Tasks)',
      fields: {
        id: 'ID',
        seasonId: 'Mùa vụ (Season)',
        title: 'Tiêu đề (Title)',
        description: 'Mô tả (Description)',
        dueDate: 'Hạn (Due date)',
        taskType: 'Loại (Task type)',
        status: 'Trạng thái (Status)',
      },
    },
    'farm-logs': {
      name: 'Nhật ký (Farm logs)',
      fields: {
        id: 'ID',
        seasonId: 'Mùa vụ (Season)',
        taskId: 'Công việc (Task)',
        note: 'Ghi chú (Note)',
        imageUrl: 'Ảnh (Image URL)',
        createdAt: 'Tạo lúc (Created at)',
      },
    },
    devices: {
      name: 'Thiết bị (Devices)',
      fields: {
        id: 'ID',
        plotId: 'Lô đất (Plot)',
        name: 'Tên (Name)',
        deviceType: 'Loại (Device type)',
        status: 'Trạng thái (Status)',
      },
    },
    'sensor-data': {
      name: 'Cảm biến (Sensor data)',
      fields: {
        id: 'ID',
        deviceId: 'Thiết bị (Device)',
        temperature: 'Nhiệt độ (Temperature)',
        humidity: 'Độ ẩm (Humidity)',
        soilMoisture: 'Độ ẩm đất (Soil moisture)',
        recordedAt: 'Ghi lúc (Recorded at)',
      },
    },
    harvests: {
      name: 'Thu hoạch (Harvests)',
      fields: {
        id: 'ID',
        seasonId: 'Mùa vụ (Season)',
        harvestDate: 'Ngày thu hoạch (Harvest date)',
        actualYield: 'Sản lượng (Actual yield)',
        qualityNote: 'Ghi chú chất lượng (Quality note)',
      },
    },
    'product-batches': {
      name: 'Lô sản phẩm (Product batches)',
      fields: {
        id: 'ID',
        harvestId: 'Thu hoạch (Harvest)',
        name: 'Tên (Name)',
        quantity: 'Số lượng (Quantity)',
        unit: 'Đơn vị (Unit)',
        price: 'Giá (Price)',
        qrCode: 'QR (QR code)',
        status: 'Trạng thái (Status)',
      },
    },
    'nft-assets': {
      name: 'NFT (NFT assets)',
      fields: {
        id: 'ID',
        type: 'Loại (Type)',
        farmId: 'Trang trại (Farm)',
        plotId: 'Lô đất (Plot)',
        seasonId: 'Mùa vụ (Season)',
        ownerUserId: 'Chủ (Owner user)',
        benefitDescription: 'Quyền lợi (Benefit)',
        expectedYield: 'Sản lượng dự kiến (Expected yield)',
        status: 'Trạng thái (Status)',
      },
    },
    orders: {
      name: 'Đơn hàng (Orders)',
      fields: {
        id: 'ID',
        buyerId: 'Người mua (Buyer)',
        totalAmount: 'Tổng tiền (Total amount)',
        paymentMethod: 'Thanh toán (Payment method)',
        status: 'Trạng thái (Status)',
        createdAt: 'Tạo lúc (Created at)',
      },
    },
    'admin-logs': {
      name: 'Log quản trị (Admin logs)',
      fields: {
        id: 'ID',
        adminId: 'Admin',
        action: 'Hành động (Action)',
        targetType: 'Loại đối tượng (Target type)',
        targetId: 'ID đối tượng (Target id)',
        createdAt: 'Tạo lúc (Created at)',
      },
    },
  },
};

function get(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function interpolate(template: string, options?: any) {
  if (!options) return template;
  return template.replace(/%\{(\w+)\}/g, (_, k) => String(options[k] ?? ''));
}

export const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any) => {
    const value = get(messages, key);
    if (typeof value === 'string') {
      return interpolate(value, options);
    }
    // react-admin thường truyền options._ làm fallback label (vd: "Start date")
    if (options && typeof options._ === 'string') return options._;
    return key;
  },
  changeLocale: async () => {},
  getLocale: () => 'vi',
};



