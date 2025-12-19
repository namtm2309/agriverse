import {
  List,
  Datagrid,
  TextField,
  NumberField,
  TextInput,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';

export const ProductBatchesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="harvestId" reference="harvests" />
      <TextField source="name" />
      <NumberField source="quantity" />
      <TextField source="unit" />
      <NumberField source="price" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ProductBatchesEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="harvestId" reference="harvests">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="name" />
      <NumberInput source="quantity" helperText="Nhập số lượng, đơn vị xem ở ô bên dưới (Enter quantity, unit see below)" />
      <TextInput source="unit" helperText="Ví dụ: kg, tấn, bao... (Example: kg, ton, bag...)" />
      <NumberInput source="price" helperText="Đơn vị: VNĐ (Unit: VND)" />
      <TextInput 
        source="qrCode" 
        helperText="Nhập mã QR code hoặc để trống để tự động tạo (Enter QR code or leave empty to auto-generate)"
        placeholder="Ví dụ: BATCH-2025-001 (Example: BATCH-2025-001)"
      />
      <TextInput source="status" />
    </PrettySimpleForm>
  </EditDialog>
);

export const ProductBatchesCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="harvestId" reference="harvests">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="name" />
      <NumberInput source="quantity" helperText="Nhập số lượng, đơn vị xem ở ô bên dưới (Enter quantity, unit see below)" />
      <TextInput source="unit" helperText="Ví dụ: kg, tấn, bao... (Example: kg, ton, bag...)" />
      <NumberInput source="price" helperText="Đơn vị: VNĐ (Unit: VND)" />
      <TextInput 
        source="qrCode" 
        helperText="Nhập mã QR code hoặc để trống để tự động tạo (Enter QR code or leave empty to auto-generate)"
        placeholder="Ví dụ: BATCH-2025-001 (Example: BATCH-2025-001)"
      />
      <TextInput source="status" />
    </PrettySimpleForm>
  </CreateDialog>
);


