import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  DateInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';

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
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput source="description" multiline />
      <TextInput source="taskType" />
      <TextInput source="status" />
      <DateInput source="dueDate" />
    </PrettySimpleForm>
  </EditDialog>
);

export const TasksCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput source="description" multiline />
      <TextInput source="taskType" />
      <TextInput source="status" />
      <DateInput source="dueDate" />
    </PrettySimpleForm>
  </CreateDialog>
);


