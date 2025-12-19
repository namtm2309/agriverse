import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  TextInput,
  DateInput,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';

export const HarvestsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="seasonId" reference="seasons" />
      <DateField source="harvestDate" />
      <NumberField source="actualYield" />
      <TextField source="qualityNote" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const HarvestsEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <DateInput source="harvestDate" />
      <NumberInput source="actualYield" helperText="Đơn vị: kg (Unit: kilograms)" />
      <TextInput source="qualityNote" multiline />
    </PrettySimpleForm>
  </EditDialog>
);

export const HarvestsCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <DateInput source="harvestDate" />
      <NumberInput source="actualYield" helperText="Đơn vị: kg (Unit: kilograms)" />
      <TextInput source="qualityNote" multiline />
    </PrettySimpleForm>
  </CreateDialog>
);


