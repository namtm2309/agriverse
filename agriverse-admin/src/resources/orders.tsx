import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  NumberInput,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Create,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const OrdersList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="buyerId" reference="users" />
      <NumberInput source="totalAmount" />
      <TextField source="paymentMethod" />
      <TextField source="status" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const OrdersEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="buyerId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <NumberInput source="totalAmount" />
      <TextInput source="paymentMethod" />
      <TextInput source="status" />
    </SimpleForm>
  </Edit>
);

export const OrdersCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="buyerId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <NumberInput source="totalAmount" />
      <TextInput source="paymentMethod" />
      <TextInput source="status" />
    </SimpleForm>
  </Create>
);


