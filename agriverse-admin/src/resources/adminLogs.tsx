import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const AdminLogsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="adminId" reference="users" />
      <TextField source="action" />
      <TextField source="targetType" />
      <TextField source="targetId" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const AdminLogsEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="adminId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="action" />
      <TextInput source="targetType" />
      <TextInput source="targetId" />
    </SimpleForm>
  </Edit>
);

export const AdminLogsCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="adminId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="action" />
      <TextInput source="targetType" />
      <TextInput source="targetId" />
    </SimpleForm>
  </Create>
);


