import { Flex, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import background from '../../assets/saigon_background.jpeg';
import { registerShopThunk, selectUser } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

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

export const RegisterShop = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  const handleOnFinish = (values: any) => {
    dispatch(registerShopThunk({ accountId: user?.id, ...values }));
    navigate('/shop-management', {
      state: {
        user,
      },
    });
  };

  return (
    <FlexContainer align="center" justify="center">
      <RegisterContainer>
        <Form form={form} onFinish={handleOnFinish}>
          <p>You do not have a shop yet! Create one</p>
          <Form.Item name="shopName">
            <Input />
          </Form.Item>
          <Form.Item name="startTime">
            <Input />
          </Form.Item>
          <Form.Item name="endTime">
            <Input />
          </Form.Item>
          <Form.Item name="address">
            <Input />
          </Form.Item>
        </Form>
      </RegisterContainer>
    </FlexContainer>
  );
};
