import { Flex } from 'antd';
import Title from 'antd/es/typography/Title';

export const SignInSuccess = () => {
  return (
    <Flex
      style={{ height: '100vh', width: '100vw' }}
      justify="center"
      align="center"
    >
      <Title level={1}>Welcome to the app!</Title>
    </Flex>
  );
};
