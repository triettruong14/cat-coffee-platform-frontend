import { Button, Card, Col, Flex, Row, Space, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import Title from 'antd/es/typography/Title';
import { styled } from 'styled-components';
import stockCoffeeShop from '../../assets/stock_coffee_shop.jpeg';

const ContentWrapper = styled(Row)`
  width: 80%;
  padding-inline: 1rem;
`;

const Category = styled(Button)`
  font-size: 14px;
`;

const WelcomeTitle = styled(Title)`
  .ant-typography h2 {
    margin-bottom: 0 !important;
  }
`;

const mockTags = [
  'Coffee',
  'Cats',
  'Cute',
  'Funny',
  'Memes',
  'Coffee',
  'Cats',
  'Cute',
  'Funny',
  'Memes',
];

export const Home = () => {
  return (
    <>
      <Flex justify="center">
        <ContentWrapper gutter={16}>
          <Col span={12}>
            <Row gutter={[16, 8]}>
              <Col span={24}>
                <WelcomeTitle level={2}>
                  Welcome to Cat Coffee Platform!
                </WelcomeTitle>
              </Col>
              <Col span={24}>
                <Search size="large" />
              </Col>
              <Col span={24}>
                <Space wrap>
                  {mockTags.map((tag) => (
                    <Category key={tag}>{tag}</Category>
                  ))}
                </Space>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Card cover={<img src={stockCoffeeShop} />}>
              <Card.Meta description="This is a coffee shop." />
            </Card>
          </Col>
        </ContentWrapper>
      </Flex>
    </>
  );
};
