import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  NumberInput,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';

export const SensorDataList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="deviceId" reference="devices" />
      <NumberField source="temperature" />
      <NumberField source="humidity" />
      <NumberField source="soilMoisture" />
      <DateField source="recordedAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SensorDataEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="deviceId" reference="devices">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="temperature" />
      <NumberInput source="humidity" />
      <NumberInput source="soilMoisture" />
    </PrettySimpleForm>
  </EditDialog>
);

export const SensorDataCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="deviceId" reference="devices">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="temperature" />
      <NumberInput source="humidity" />
      <NumberInput source="soilMoisture" />
    </PrettySimpleForm>
  </CreateDialog>
);


