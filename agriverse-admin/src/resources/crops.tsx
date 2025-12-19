import {
  List,
  Datagrid,
  TextField,
  NumberField,
  Edit,
  TextInput,
  NumberInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';

export const CropsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="variety" />
      <NumberField source="growthDays" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const CropsEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="name" />
      <TextInput source="variety" />
      <NumberInput source="growthDays" helperText="Đơn vị: ngày (Unit: days)" />
      <NumberInput source="tempMin" helperText="Đơn vị: °C (Unit: Celsius)" />
      <NumberInput source="tempMax" helperText="Đơn vị: °C (Unit: Celsius)" />
      <NumberInput source="humidityMin" helperText="Đơn vị: % (Unit: percentage)" />
      <NumberInput source="humidityMax" helperText="Đơn vị: % (Unit: percentage)" />
    </PrettySimpleForm>
  </EditDialog>
);

export const CropsCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="name" />
      <TextInput source="variety" />
      <NumberInput source="growthDays" helperText="Đơn vị: ngày (Unit: days)" />
      <NumberInput source="tempMin" helperText="Đơn vị: °C (Unit: Celsius)" />
      <NumberInput source="tempMax" helperText="Đơn vị: °C (Unit: Celsius)" />
      <NumberInput source="humidityMin" helperText="Đơn vị: % (Unit: percentage)" />
      <NumberInput source="humidityMax" helperText="Đơn vị: % (Unit: percentage)" />
    </PrettySimpleForm>
  </CreateDialog>
);


