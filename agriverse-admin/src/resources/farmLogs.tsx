import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';
import { ImageUploadInput } from '../components/ImageUploadInput';
import { CustomImageField } from '../components/CustomImageField';

export const FarmLogsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="seasonId" reference="seasons" />
      <ReferenceField source="taskId" reference="tasks" />
      <TextField source="note" />
      <CustomImageField source="imageUrl" label="Ảnh (Image)" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const FarmLogsEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput source="taskId" reference="tasks">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <TextInput source="note" multiline />
      <ImageUploadInput source="imageUrl" label="Ảnh (Image)" />
    </PrettySimpleForm>
  </EditDialog>
);

export const FarmLogsCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="seasonId" reference="seasons">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput source="taskId" reference="tasks">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <TextInput source="note" multiline />
      <ImageUploadInput source="imageUrl" label="Ảnh (Image)" />
    </PrettySimpleForm>
  </CreateDialog>
);


