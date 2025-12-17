import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  DateInput,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const SeasonsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="plotId" reference="plots" />
      <ReferenceField source="cropId" reference="crops" />
      <DateField source="startDate" />
      <DateField source="expectedHarvestDate" />
      <NumberInput source="expectedYield" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SeasonsEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="plotId" reference="plots">
        <SelectInput optionText="code" />
      </ReferenceInput>
      <ReferenceInput source="cropId" reference="crops">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <DateInput source="startDate" />
      <DateInput source="expectedHarvestDate" />
      <NumberInput source="expectedYield" />
      <TextField source="status" />
    </SimpleForm>
  </Edit>
);

export const SeasonsCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="plotId" reference="plots">
        <SelectInput optionText="code" />
      </ReferenceInput>
      <ReferenceInput source="cropId" reference="crops">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <DateInput source="startDate" />
      <DateInput source="expectedHarvestDate" />
      <NumberInput source="expectedYield" />
      <TextField source="status" />
    </SimpleForm>
  </Create>
);


