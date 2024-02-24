import { Button, Flex, Layout as AntDLayout, Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Title from 'antd/es/typography/Title';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logOut, selectSignInStatus, selectUser } from '../redux';

const { Header } = AntDLayout;

const headerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  width: '100%',
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

const LogOutButton = styled(SignInButton)``;

const BookingHistoryButton = styled(SignInButton)``;

interface HeaderProps {}

export const AppHeader = ({}: HeaderProps) => {
  const loggedIn = useAppSelector(selectSignInStatus);
  const account = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          {loggedIn ? (
            <Space>
              <p>Welcome back, {account && account.username}!</p>
              <BookingHistoryButton type="link">
                <Link to="/booking-history">Booking History</Link>
              </BookingHistoryButton>
              <LogOutButton
                onClick={() => {
                  dispatch(logOut());
                  navigate('/signin');
                }}
              >
                Log Out
              </LogOutButton>
            </Space>
          ) : (
            <>
              <RegisterButton type="link">
                <Link to={`/register`}>Register</Link>
              </RegisterButton>
              <SignInButton>
                <Link to={`/signin`}>Sign in</Link>
              </SignInButton>
            </>
          )}
        </Space>
      </Navigation>
    </Header>
  );
};
