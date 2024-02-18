import { Button, Card, Col, Flex, Row, Space, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import Title from 'antd/es/typography/Title';
import { styled } from 'styled-components';
import stockCoffeeShop from '../../assets/stock_coffee_shop.jpeg';
import background from '../../assets/saigon_background.jpeg';
import { useDebounce } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const BackgroundWrapper = styled(Flex)`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${background});
  height: 100vh;
  overflow: hidden;
  background-size: cover;
  padding-block: 4rem;
`;

const ContentWrapper = styled(Row)`
  width: 90%;
  overflow-y: hidden;
  padding-inline: 1rem;
`;

const ShopsSection = styled.div`
  display: flex;
  height: 692px;
  width: 100%;
  overflow-y: scroll;
  padding: 1rem;
  border-radius: 10px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background: #fff;
`;

const ShopsWrapper = styled(Space)`
  justify-content: center;
  width: 740px;
`;

const Category = styled(Button)`
  font-size: 14px;
`;

const WelcomeTitle = styled(Title)`
  color: #fff !important;
`;

//array of tags relating to cat cafes
const mockTags = [
  'Cat Cafe',
  'Coffee Shop',
  'Restaurant',
  'Bar',
  'Bakery',
  'Tea House',
  'Pet Store',
  'Cat Hotel',
  'Cat Grooming',
  'Cat Adoption',
];

export const Home = () => {
  const debounce = useDebounce(400);
  const navigate = useNavigate();

  const handleOnSearch = (value: string) => {
    debounce(() => {
      navigate(`/search?search=${value}`);
    });
  };

  return (
    <>
      <BackgroundWrapper justify="center">
        <ContentWrapper gutter={32} justify="center">
          <Col span={8}>
            <Row gutter={[16, 8]}>
              <Col span={24}>
                <WelcomeTitle level={2}>
                  Welcome to Cat Coffee Platform!
                </WelcomeTitle>
              </Col>
              <Col span={24}>
                <Search size="large" allowClear onSearch={handleOnSearch} />
              </Col>
              <Col span={24}>
                <Space wrap>
                  {mockTags.map((tag) => (
                    <Category ghost key={tag} type="default">
                      {tag}
                    </Category>
                  ))}
                </Space>
              </Col>
            </Row>
          </Col>
          <Col span={16}>
            <ShopsSection>
              <ShopsWrapper wrap align="center" size={10}>
                {Array.from({ length: 14 }).map((_, index) => (
                  <Card
                    key={index}
                    cover={
                      <img src={stockCoffeeShop} width={100} height={120} />
                    }
                    size="small"
                  >
                    <Card.Meta description="Generic Coffee Shop" />
                    <p>28 Sixth Avenue</p>
                  </Card>
                ))}
              </ShopsWrapper>
            </ShopsSection>
          </Col>
        </ContentWrapper>
      </BackgroundWrapper>
    </>
  );
};
