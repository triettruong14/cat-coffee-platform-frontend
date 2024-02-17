import { GithubOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Form, Input, Row, Space } from 'antd';
import { styled } from 'styled-components';
import background from '../../assets/saigon_background.jpeg';
import { useAppDispatch } from '../../redux/hooks';
import { signIn } from '../../redux/slices/user.thunks';

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

const axios = require('axios');

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const email = form.getFieldValue('email');
    const password = form.getFieldValue('password');
    dispatch(signIn({ email, password }));
  };

  return (
    <>
      <FlexContainer align="start" justify="center">
        <SignInContainer vertical>
          <Form name="signin-form" form={form}>
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
            <Flex justify="end">
              <Button type="link">
                <a href="/register">Register</a>
              </Button>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Sign In
              </Button>
            </Flex>
          </Form>
        </SignInContainer>
      </FlexContainer>
    </>
  );
};
