import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const HarvestsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="seasonId" reference="seasons" />
      <DateField source="harvestDate" />
      <NumberInput source="actualYield" />
      <TextField source="qualityNote" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const HarvestsEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <DateInput source="harvestDate" />
      <NumberInput source="actualYield" />
      <TextInput source="qualityNote" multiline />
    </SimpleForm>
  </Edit>
);

export const HarvestsCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <DateInput source="harvestDate" />
      <NumberInput source="actualYield" />
      <TextInput source="qualityNote" multiline />
    </SimpleForm>
  </Create>
);


