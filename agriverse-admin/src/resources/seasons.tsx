import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  DateInput,
  NumberInput,
  NumberField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
  FunctionField,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';
import { SEASON_STATUS_CHOICES, viEnOptionText } from '../components/viEnChoices';
import { ViEnText } from '../components/ViEnText';

export const SeasonsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="plotId" reference="plots" />
      <ReferenceField source="cropId" reference="crops" />
      <DateField source="startDate" />
      <DateField source="expectedHarvestDate" />
      <NumberField source="expectedYield" />
      <FunctionField
        source="status"
        render={(record: any) => {
          const c = SEASON_STATUS_CHOICES.find((x) => x.id === record?.status);
          return c ? <ViEnText vi={c.vi} en={c.en} /> : record?.status;
        }}
      />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SeasonsEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="plotId" reference="plots">
        <SelectInput optionText="code" />
      </ReferenceInput>
      <ReferenceInput source="cropId" reference="crops">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <DateInput source="startDate" />
      <DateInput source="expectedHarvestDate" />
      <NumberInput source="expectedYield" helperText="Đơn vị: kg (Unit: kilograms)" />
      <SelectInput
        source="status"
        choices={SEASON_STATUS_CHOICES as any}
        optionText={viEnOptionText as any}
      />
    </PrettySimpleForm>
  </EditDialog>
);

export const SeasonsCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="plotId" reference="plots">
        <SelectInput optionText="code" />
      </ReferenceInput>
      <ReferenceInput source="cropId" reference="crops">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <DateInput source="startDate" />
      <DateInput source="expectedHarvestDate" />
      <NumberInput source="expectedYield" helperText="Đơn vị: kg (Unit: kilograms)" />
      <SelectInput
        source="status"
        choices={SEASON_STATUS_CHOICES as any}
        optionText={viEnOptionText as any}
      />
    </PrettySimpleForm>
  </CreateDialog>
);


