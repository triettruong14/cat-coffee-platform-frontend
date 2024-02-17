import {
  Button,
  Col,
  Flex,
  Layout as AntDLayout,
  Menu,
  Row,
  Space,
} from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';

const { Header } = AntDLayout;

const headerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Navigation = styled(Flex)`
  height: 100%;
  width: 90%;
`;

const StyledTitle = styled(Title)`
  margin: 0;
`;

export const AppHeader = () => {
  return (
    <Header style={headerStyle}>
      <Navigation justify="space-between" align="center">
        <Space>
          <GithubOutlined style={{ fontSize: '25px' }} />
          <StyledTitle level={5}>Cat Coffee Platform</StyledTitle>
        </Space>
        <Button>
          <Link to={`signin`}>Sign in</Link>
        </Button>
      </Navigation>
    </Header>
  );
};
