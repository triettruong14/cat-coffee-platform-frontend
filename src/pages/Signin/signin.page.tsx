import {
  ArrowLeftOutlined,
  GithubOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Flex, Form, Input, Row, Space } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import background from '../../assets/saigon_background.jpeg';
import { Account, AccountProps, AccountRole } from '../../domain/models';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { mockSignIn, selectSignInStatus, selectUser } from '../../redux/slices';
import { signInThunk } from '../../redux/slices/auth/auth.thunks';

const FlexContainer = styled(Flex)`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${background});
  background-size: cover;
`;

const SignInContainer = styled(Flex)`
  padding: 2rem;
  width: 40%;
  margin-top: 10rem;
  border: 1px solid #000;
  border-radius: 10px;
  background: #fff;

  p {
    line-height: 2rem;
    text-align: right;
  }
`;

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const isSignInSuccess = useAppSelector(selectSignInStatus);
  const account = useAppSelector(selectUser);

  const handleSubmit = () => {
    const email = form.getFieldValue('email');
    const password = form.getFieldValue('password');
    dispatch(signInThunk({ email, password }));
    const props: AccountProps = {
      id: '123',
      username: 'Triet Truong',
      email,
      password,
    };
    // dispatch(mockSignIn(new Account(props)));
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    if (isSignInSuccess) {
      if (account?.roleId === AccountRole.STAFF) {
        navigate('/staff');
      } else if (account?.roleId === AccountRole.SHOP_MANAGER) {
        navigate('/shop-management', {
          state: {
            account,
          },
        });
      } else {
        navigate('/');
      }
    }
  }, [isSignInSuccess, account]);

  return (
    <>
      <FlexContainer align="start" justify="center">
        <SignInContainer vertical>
          <Form name="signin-form" form={form} onFinish={handleSubmit}>
            <Flex align="center" justify="center">
              <GithubOutlined
                style={{
                  fontSize: '3rem',
                  marginBottom: '2rem',
                  color: '#ee4d2d',
                }}
              />
            </Flex>
            <Row gutter={8}>
              <Col span={4}>
                <p>Email: </p>
              </Col>
              <Col flex="auto">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                    { type: 'email', message: 'Please input a valid email!' },
                  ]}
                >
                  <Input
                    addonBefore={<UserOutlined />}
                    placeholder="Enter your email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={4}>
                <p>Password: </p>
              </Col>
              <Col flex="auto">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password
                    addonBefore={<LockOutlined />}
                    placeholder="Enter your password"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Flex justify="end" style={{ marginBottom: '1rem' }}>
              <a href="/register">Register a new account</a>
            </Flex>
            <Flex justify="space-between">
              <Space.Compact>
                <Button type="link">
                  <ArrowLeftOutlined />
                  <a href="/"> Back to Home</a>
                </Button>
              </Space.Compact>
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
            </Flex>
          </Form>
        </SignInContainer>
      </FlexContainer>
    </>
  );
};
