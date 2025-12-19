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

export const NftAssetsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="type" />
      <ReferenceField source="farmId" reference="farms" />
      <ReferenceField source="plotId" reference="plots" />
      <ReferenceField source="seasonId" reference="seasons" />
      <ReferenceField source="ownerUserId" reference="users" />
      <NumberField source="expectedYield" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const NftAssetsEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
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
      <NumberInput source="expectedYield" helperText="Đơn vị: kg (Unit: kilograms)" />
      <TextInput source="status" />
    </PrettySimpleForm>
  </EditDialog>
);

export const NftAssetsCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
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
      <NumberInput source="expectedYield" helperText="Đơn vị: kg (Unit: kilograms)" />
      <TextInput source="status" />
    </PrettySimpleForm>
  </CreateDialog>
);


