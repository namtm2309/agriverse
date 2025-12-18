import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  NumberInput,
  NumberField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';

export const AdminLogsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="adminId" reference="users" />
      <TextField source="action" />
      <TextField source="targetType" />
      <NumberField source="targetId" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const AdminLogsEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="adminId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="action" />
      <TextInput source="targetType" />
      <NumberInput source="targetId" />
    </PrettySimpleForm>
  </EditDialog>
);

export const AdminLogsCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="adminId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="action" />
      <TextInput source="targetType" />
      <NumberInput source="targetId" />
    </PrettySimpleForm>
  </CreateDialog>
);


