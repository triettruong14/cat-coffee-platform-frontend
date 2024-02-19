import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  notification,
  Space,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import background from '../../assets/saigon_background.jpeg';
import { mockRegister } from '../../redux';
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
  margin-top: 2rem;
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
  const navigate = useNavigate();

  const handleOnFinish = (values: any) => {
    try {
      dispatch(registerThunk(values));
      console.log('values', values);
      navigate('/signin-success');
    } catch (error: any) {}
  };

  return (
    <>
      <FlexContainer align="start" justify="center">
        <RegisterContainer vertical>
          <Title level={2}>Register</Title>
          <Form
            name="register"
            form={form}
            onFinish={handleOnFinish}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phone">
              <Input placeholder="Phone Number" />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker
                placeholder="Date of Birth"
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
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
              label="Email"
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
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
              label="Confirm Password"
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
