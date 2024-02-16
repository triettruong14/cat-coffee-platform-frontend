import { Col, Layout as AntDLayout, Row, Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header } = AntDLayout;

const headerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
};

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

export const AppHeader = () => {
  return (
    <Header style={headerStyle}>
      <Row justify="space-evenly" align="middle">
        <StyledCol span={2} flex={1 / 5}>
          <GithubOutlined style={{ fontSize: '25px' }} />
        </StyledCol>
      </Row>
    </Header>
  );
};
