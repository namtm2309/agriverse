import {
  List,
  Datagrid,
  TextField,
  NumberField,
  TextInput,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';

export const ProductBatchesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="harvestId" reference="harvests" />
      <TextField source="name" />
      <NumberField source="quantity" />
      <TextField source="unit" />
      <NumberField source="price" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ProductBatchesEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="harvestId" reference="harvests">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="name" />
      <NumberInput source="quantity" />
      <TextInput source="unit" />
      <NumberInput source="price" />
      <TextInput source="qrCode" />
      <TextInput source="status" />
    </PrettySimpleForm>
  </EditDialog>
);

export const ProductBatchesCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="harvestId" reference="harvests">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="name" />
      <NumberInput source="quantity" />
      <TextInput source="unit" />
      <NumberInput source="price" />
      <TextInput source="qrCode" />
      <TextInput source="status" />
    </PrettySimpleForm>
  </CreateDialog>
);


