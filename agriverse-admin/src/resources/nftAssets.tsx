import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const NftAssetsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="type" />
      <ReferenceField source="farmId" reference="farms" />
      <ReferenceField source="plotId" reference="plots" />
      <ReferenceField source="seasonId" reference="seasons" />
      <ReferenceField source="ownerUserId" reference="users" />
      <NumberInput source="expectedYield" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const NftAssetsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="type" />
      <ReferenceInput source="farmId" reference="farms">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="plotId" reference="plots">
        <SelectInput optionText="code" />
      </ReferenceInput>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput source="ownerUserId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="benefitDescription" multiline />
      <NumberInput source="expectedYield" />
      <TextInput source="status" />
    </SimpleForm>
  </Edit>
);

export const NftAssetsCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="type" />
      <ReferenceInput source="farmId" reference="farms">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="plotId" reference="plots">
        <SelectInput optionText="code" />
      </ReferenceInput>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput source="ownerUserId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="benefitDescription" multiline />
      <NumberInput source="expectedYield" />
      <TextInput source="status" />
    </SimpleForm>
  </Create>
);


