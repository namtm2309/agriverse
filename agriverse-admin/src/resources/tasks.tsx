import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const TasksList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="seasonId" reference="seasons" />
      <TextField source="title" />
      <TextField source="taskType" />
      <TextField source="status" />
      <DateField source="dueDate" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const TasksEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput source="description" multiline />
      <TextInput source="taskType" />
      <TextInput source="status" />
      <DateInput source="dueDate" />
    </SimpleForm>
  </Edit>
);

export const TasksCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput source="description" multiline />
      <TextInput source="taskType" />
      <TextInput source="status" />
      <DateInput source="dueDate" />
    </SimpleForm>
  </Create>
);


