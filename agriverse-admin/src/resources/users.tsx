import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  SelectInput,
  FunctionField,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { PrettySimpleForm } from '../components/PrettySimpleForm';
import { CreateDialog, EditDialog } from '../components/RaDialogViews';
import {
  USER_ROLE_CHOICES,
  USER_STATUS_CHOICES,
  viEnOptionText,
} from '../components/viEnChoices';
import { ViEnText } from '../components/ViEnText';

export const UsersList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="email" />
      <FunctionField
        source="role"
        render={(record: any) => {
          const c = USER_ROLE_CHOICES.find((x) => x.id === record?.role);
          return c ? <ViEnText vi={c.vi} en={c.en} /> : record?.role;
        }}
      />
      <FunctionField
        source="status"
        render={(record: any) => {
          const c = USER_STATUS_CHOICES.find((x) => x.id === record?.status);
          return c ? <ViEnText vi={c.vi} en={c.en} /> : record?.status;
        }}
      />
      <TextField source="walletAddress" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UsersEdit = () => (
  <EditDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="walletAddress" />
      <TextInput source="password" type="password" />
      <SelectInput
        source="role"
        choices={USER_ROLE_CHOICES as any}
        optionText={viEnOptionText as any}
      />
      <SelectInput
        source="status"
        choices={USER_STATUS_CHOICES as any}
        optionText={viEnOptionText as any}
      />
    </PrettySimpleForm>
  </EditDialog>
);

export const UsersCreate = () => (
  <CreateDialog redirect="list">
    <PrettySimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="walletAddress" />
      <TextInput source="password" type="password" />
      <SelectInput
        source="role"
        choices={USER_ROLE_CHOICES as any}
        optionText={viEnOptionText as any}
      />
      <SelectInput
        source="status"
        choices={USER_STATUS_CHOICES as any}
        optionText={viEnOptionText as any}
      />
    </PrettySimpleForm>
  </CreateDialog>
);


