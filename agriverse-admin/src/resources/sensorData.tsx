import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const SensorDataList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="deviceId" reference="devices" />
      <NumberInput source="temperature" />
      <NumberInput source="humidity" />
      <NumberInput source="soilMoisture" />
      <DateField source="recordedAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SensorDataEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="deviceId" reference="devices">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="temperature" />
      <NumberInput source="humidity" />
      <NumberInput source="soilMoisture" />
    </SimpleForm>
  </Edit>
);

export const SensorDataCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="deviceId" reference="devices">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="temperature" />
      <NumberInput source="humidity" />
      <NumberInput source="soilMoisture" />
    </SimpleForm>
  </Create>
);


