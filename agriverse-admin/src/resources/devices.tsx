import {
  List,
  Datagrid,
  TextField,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';

export const DevicesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="deviceType" />
      <TextField source="status" />
      <ReferenceField source="plotId" reference="plots" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const DevicesEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="name" />
      <TextInput source="deviceType" />
      <TextInput source="status" />
      <ReferenceInput source="plotId" reference="plots">
        <SelectInput optionText="code" />
      </ReferenceInput>
    </PrettySimpleForm>
  </EditDialog>
);

export const DevicesCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="name" />
      <TextInput source="deviceType" />
      <TextInput source="status" />
      <ReferenceInput source="plotId" reference="plots">
        <SelectInput optionText="code" />
      </ReferenceInput>
    </PrettySimpleForm>
  </CreateDialog>
);


