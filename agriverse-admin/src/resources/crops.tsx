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
      <NumberInput source="growthDays" />
      <NumberInput source="tempMin" />
      <NumberInput source="tempMax" />
      <NumberInput source="humidityMin" />
      <NumberInput source="humidityMax" />
    </PrettySimpleForm>
  </EditDialog>
);

export const CropsCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="name" />
      <TextInput source="variety" />
      <NumberInput source="growthDays" />
      <NumberInput source="tempMin" />
      <NumberInput source="tempMax" />
      <NumberInput source="humidityMin" />
      <NumberInput source="humidityMax" />
    </PrettySimpleForm>
  </CreateDialog>
);


