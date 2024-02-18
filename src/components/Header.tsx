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
  color: #ee4d2d !important;
`;

const SignInButton = styled(Button)`
  background-color: #fff;
  color: #ee4d2d;
  border: 1px solid #ee4d2d;
  &:hover {
    color: #ea7159;
    border: 1px solid #ea7159;
  }
`;

const RegisterButton = styled(SignInButton)`
  border: none;
  &:hover {
    color: #ea7159;
    border: none;
  }
`;

export const AppHeader = () => {
  return (
    <Header style={headerStyle}>
      <Navigation justify="space-between" align="center">
        <Link to="/">
          <Space>
            <GithubOutlined style={{ fontSize: '35px', color: '#ee4d2d' }} />
            <StyledTitle level={4}>Cat Coffee Platform</StyledTitle>
          </Space>
        </Link>
        <Space>
          <RegisterButton type="link">
            <Link to={`register`}>Register</Link>
          </RegisterButton>
          <SignInButton>
            <Link to={`signin`}>Sign in</Link>
          </SignInButton>
        </Space>
      </Navigation>
    </Header>
  );
};
