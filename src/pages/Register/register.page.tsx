import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, notification, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import background from '../../assets/saigon_background.jpeg';
import { useAppDispatch } from '../../redux/hooks';
import { registerThunk } from '../../redux/slices/auth/auth.thunks';

const FlexContainer = styled(Flex)`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${background});
  background-size: cover;
`;

const RegisterContainer = styled(Flex)`
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

export const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleOnFinish = (values: any) => {
    try {
      dispatch(registerThunk(values));
    } catch (error: any) {}
  };

  return (
    <>
      <FlexContainer align="start" justify="center">
        <RegisterContainer vertical>
          <Title level={2}>Register</Title>
          <Form name="register" form={form} onFinish={handleOnFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            <Flex justify="center" style={{ marginBlock: '1rem' }}>
              <p>
                Already have an account? then <a href="/signin">sign in</a>
              </p>
            </Flex>
            <Flex justify="space-between">
              <Space.Compact>
                <Button type="link">
                  <ArrowLeftOutlined />
                  <a href="/"> Back to Home</a>
                </Button>
              </Space.Compact>
              <Space>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Space>
            </Flex>
          </Form>
        </RegisterContainer>
      </FlexContainer>
    </>
  );
};
