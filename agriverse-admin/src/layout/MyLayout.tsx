import { Layout, LayoutProps } from 'react-admin';
import { MyMenu } from './MyMenu';
import { MyAppBar } from './MyAppBar';

export const MyLayout = (props: LayoutProps) => (
  <Layout
    {...props}
    appBar={MyAppBar}
    menu={MyMenu}
  />
);



