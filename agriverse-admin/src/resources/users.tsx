import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const UsersList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="email" />
      <TextField source="role" />
      <TextField source="status" />
      <TextField source="walletAddress" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UsersEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="walletAddress" />
      <TextInput source="password" type="password" />
      <SelectInput
        source="role"
        choices={[
          { id: 'ADMIN', name: 'ADMIN' },
          { id: 'FARMER', name: 'FARMER' },
          { id: 'INVESTOR', name: 'INVESTOR' },
          { id: 'CONSUMER', name: 'CONSUMER' },
        ]}
      />
      <SelectInput
        source="status"
        choices={[
          { id: 'ACTIVE', name: 'active' },
          { id: 'BLOCKED', name: 'blocked' },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export const UsersCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="walletAddress" />
      <TextInput source="password" type="password" />
      <SelectInput
        source="role"
        choices={[
          { id: 'ADMIN', name: 'ADMIN' },
          { id: 'FARMER', name: 'FARMER' },
          { id: 'INVESTOR', name: 'INVESTOR' },
          { id: 'CONSUMER', name: 'CONSUMER' },
        ]}
      />
      <SelectInput
        source="status"
        choices={[
          { id: 'ACTIVE', name: 'active' },
          { id: 'BLOCKED', name: 'blocked' },
        ]}
      />
    </SimpleForm>
  </Create>
);


