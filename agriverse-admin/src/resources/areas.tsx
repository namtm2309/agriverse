import {
  List,
  Datagrid,
  TextField,
  TextInput,
  EditButton,
  DeleteButton,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  FunctionField,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';
import { AREA_LEVEL_CHOICES, viEnOptionText } from '../components/viEnChoices';
import { ViEnText } from '../components/ViEnText';

export const AreasList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="parentId" reference="areas" />
      <FunctionField
        source="level"
        render={(record: any) => {
          const c = AREA_LEVEL_CHOICES.find((x) => x.id === record?.level);
          return c ? <ViEnText vi={c.vi} en={c.en} /> : record?.level;
        }}
      />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const AreasEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="parentId" reference="areas">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <SelectInput
        source="level"
        choices={AREA_LEVEL_CHOICES as any}
        optionText={viEnOptionText as any}
      />
    </PrettySimpleForm>
  </EditDialog>
);

export const AreasCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="parentId" reference="areas">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <SelectInput
        source="level"
        choices={AREA_LEVEL_CHOICES as any}
        optionText={viEnOptionText as any}
      />
    </PrettySimpleForm>
  </CreateDialog>
);

