import {
  List,
  Datagrid,
  TextField,
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
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="deviceType" />
      <TextInput source="status" />
      <ReferenceInput source="plotId" reference="plots">
        <SelectInput optionText="code" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const DevicesCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="deviceType" />
      <TextInput source="status" />
      <ReferenceInput source="plotId" reference="plots">
        <SelectInput optionText="code" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);


