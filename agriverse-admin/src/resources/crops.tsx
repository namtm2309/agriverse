import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const CropsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="variety" />
      <NumberInput source="growthDays" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const CropsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="variety" />
      <NumberInput source="growthDays" />
      <NumberInput source="tempMin" />
      <NumberInput source="tempMax" />
      <NumberInput source="humidityMin" />
      <NumberInput source="humidityMax" />
    </SimpleForm>
  </Edit>
);

export const CropsCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="variety" />
      <NumberInput source="growthDays" />
      <NumberInput source="tempMin" />
      <NumberInput source="tempMax" />
      <NumberInput source="humidityMin" />
      <NumberInput source="humidityMax" />
    </SimpleForm>
  </Create>
);


