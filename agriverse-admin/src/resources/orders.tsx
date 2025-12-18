import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  NumberInput,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';

export const OrdersList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="buyerId" reference="users" />
      <NumberField source="totalAmount" />
      <TextField source="paymentMethod" />
      <TextField source="status" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const OrdersEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="buyerId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <NumberInput source="totalAmount" />
      <TextInput source="paymentMethod" />
      <TextInput source="status" />
    </PrettySimpleForm>
  </EditDialog>
);

export const OrdersCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <ReferenceInput source="buyerId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <NumberInput source="totalAmount" />
      <TextInput source="paymentMethod" />
      <TextInput source="status" />
    </PrettySimpleForm>
  </CreateDialog>
);


