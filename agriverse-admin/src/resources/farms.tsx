import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  TextInput,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
  FunctionField,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';
import {
  FARM_CERTIFICATION_CHOICES,
  FARM_STATUS_CHOICES,
  viEnOptionText,
} from '../components/viEnChoices';
import { ViEnText } from '../components/ViEnText';

export const FarmsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="areaId" reference="areas" />
      <ReferenceField source="ownerId" reference="users" />
      <TextField source="address" />
      <FunctionField
        source="certification"
        render={(record: any) => {
          const c = FARM_CERTIFICATION_CHOICES.find((x) => x.id === record?.certification);
          return c ? <ViEnText vi={c.vi} en={c.en} /> : record?.certification;
        }}
      />
      <FunctionField
        source="status"
        render={(record: any) => {
          const c = FARM_STATUS_CHOICES.find((x) => x.id === record?.status);
          return c ? <ViEnText vi={c.vi} en={c.en} /> : record?.status;
        }}
      />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const FarmsEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="areaId" reference="areas">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="ownerId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="address" />
      <SelectInput
        source="certification"
        choices={FARM_CERTIFICATION_CHOICES as any}
        optionText={viEnOptionText as any}
      />
      <SelectInput
        source="status"
        choices={FARM_STATUS_CHOICES as any}
        optionText={viEnOptionText as any}
      />
    </PrettySimpleForm>
  </EditDialog>
);

export const FarmsCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="areaId" reference="areas">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="ownerId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="address" />
      <SelectInput
        source="certification"
        choices={FARM_CERTIFICATION_CHOICES as any}
        optionText={viEnOptionText as any}
      />
      <SelectInput
        source="status"
        choices={FARM_STATUS_CHOICES as any}
        optionText={viEnOptionText as any}
      />
    </PrettySimpleForm>
  </CreateDialog>
);


