import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const FarmLogsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="seasonId" reference="seasons" />
      <ReferenceField source="taskId" reference="tasks" />
      <TextField source="note" />
      <TextField source="imageUrl" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const FarmLogsEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput source="taskId" reference="tasks">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <TextInput source="note" multiline />
      <TextInput source="imageUrl" />
    </SimpleForm>
  </Edit>
);

export const FarmLogsCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput source="taskId" reference="tasks">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <TextInput source="note" multiline />
      <TextInput source="imageUrl" />
    </SimpleForm>
  </Create>
);


