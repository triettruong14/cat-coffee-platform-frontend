import { Layout as AntDLayout } from 'antd';

const { Content } = AntDLayout;

const layoutStyle: React.CSSProperties = {};

interface AppLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export const AppLayout = ({ children, header }: AppLayoutProps) => {
  return (
    <AntDLayout style={layoutStyle}>
      {header}
      <Content style={{ height: '100%' }}>{children}</Content>
    </AntDLayout>
  );
};
