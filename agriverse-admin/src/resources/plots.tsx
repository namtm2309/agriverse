import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  TextInput,
  NumberInput,
  NumberField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';

export const PlotsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="code" />
      <NumberField source="areaSize" />
      <TextField source="soilType" />
      <ReferenceField source="farmId" reference="farms" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const PlotsEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="code" />
      <NumberInput source="areaSize" />
      <TextInput source="soilType" />
      <TextInput source="waterSource" />
      <TextInput source="gpsPolygon" />
      <TextInput source="status" />
      <ReferenceInput source="farmId" reference="farms">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </PrettySimpleForm>
  </EditDialog>
);

export const PlotsCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="code" />
      <NumberInput source="areaSize" />
      <TextInput source="soilType" />
      <TextInput source="waterSource" />
      <TextInput source="gpsPolygon" />
      <TextInput source="status" />
      <ReferenceInput source="farmId" reference="farms">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </PrettySimpleForm>
  </CreateDialog>
);


