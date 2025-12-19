import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
} from 'react-admin';

export const AdminLogsList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField source="adminId" reference="users" label="Admin" />
      <TextField source="action" label="Hành động (Action)" />
      <TextField source="targetType" label="Loại (Type)" />
      <NumberField source="targetId" label="ID đối tượng (Target ID)" />
      <DateField source="createdAt" label="Thời gian (Time)" showTime />
    </Datagrid>
  </List>
);

export const AdminLogsShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="adminId" reference="users" label="Admin" />
      <TextField source="action" label="Hành động (Action)" />
      <TextField source="targetType" label="Loại (Type)" />
      <NumberField source="targetId" label="ID đối tượng (Target ID)" />
      <DateField source="createdAt" label="Thời gian (Time)" showTime />
    </SimpleShowLayout>
  </Show>
);


