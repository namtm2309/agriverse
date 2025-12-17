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

export const ProductBatchesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="harvestId" reference="harvests" />
      <TextField source="name" />
      <NumberInput source="quantity" />
      <TextField source="unit" />
      <NumberInput source="price" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ProductBatchesEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="harvestId" reference="harvests">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="name" />
      <NumberInput source="quantity" />
      <TextInput source="unit" />
      <NumberInput source="price" />
      <TextInput source="qrCode" />
      <TextInput source="status" />
    </SimpleForm>
  </Edit>
);

export const ProductBatchesCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="harvestId" reference="harvests">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="name" />
      <NumberInput source="quantity" />
      <TextInput source="unit" />
      <NumberInput source="price" />
      <TextInput source="qrCode" />
      <TextInput source="status" />
    </SimpleForm>
  </Create>
);


