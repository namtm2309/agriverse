import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const FarmsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="areaId" reference="areas" />
      <ReferenceField source="ownerId" reference="users" />
      <TextField source="address" />
      <TextField source="certification" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const FarmsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="areaId" reference="areas">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="ownerId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="address" />
      <SelectInput
        source="certification"
        choices={[
          { id: 'VietGAP', name: 'VietGAP' },
          { id: 'GlobalGAP', name: 'GlobalGAP' },
        ]}
      />
      <SelectInput
        source="status"
        choices={[
          { id: 'pending', name: 'pending' },
          { id: 'approved', name: 'approved' },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export const FarmsCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="areaId" reference="areas">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="ownerId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="address" />
      <SelectInput
        source="certification"
        choices={[
          { id: 'VietGAP', name: 'VietGAP' },
          { id: 'GlobalGAP', name: 'GlobalGAP' },
        ]}
      />
      <SelectInput
        source="status"
        choices={[
          { id: 'pending', name: 'pending' },
          { id: 'approved', name: 'approved' },
        ]}
      />
    </SimpleForm>
  </Create>
);


