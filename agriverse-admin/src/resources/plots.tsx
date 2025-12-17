import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const PlotsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="code" />
      <NumberInput source="areaSize" />
      <TextField source="soilType" />
      <ReferenceField source="farmId" reference="farms" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const PlotsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="code" />
      <NumberInput source="areaSize" />
      <TextInput source="soilType" />
      <TextInput source="waterSource" />
      <TextInput source="gpsPolygon" />
      <TextInput source="status" />
      <ReferenceInput source="farmId" reference="farms">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const PlotsCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="code" />
      <NumberInput source="areaSize" />
      <TextInput source="soilType" />
      <TextInput source="waterSource" />
      <TextInput source="gpsPolygon" />
      <TextInput source="status" />
      <ReferenceInput source="farmId" reference="farms">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);


