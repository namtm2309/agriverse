import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  EditButton,
  DeleteButton,
  ReferenceField,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

export const AreasList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="parentId" reference="areas" />
      <TextField source="level" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const AreasEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="parentId" reference="areas">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <SelectInput
        source="level"
        choices={[
          { id: 'province', name: 'province' },
          { id: 'district', name: 'district' },
          { id: 'commune', name: 'commune' },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export const AreasCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="parentId" reference="areas">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <SelectInput
        source="level"
        choices={[
          { id: 'province', name: 'province' },
          { id: 'district', name: 'district' },
          { id: 'commune', name: 'commune' },
        ]}
      />
    </SimpleForm>
  </Create>
);

