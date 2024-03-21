import { Button, Card, Col, Flex, Row, Skeleton, Space, Spin, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import Title from 'antd/es/typography/Title';
import { styled } from 'styled-components';
import background from '../../assets/saigon_background.jpeg';
import { useDebounce } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getAllCoffeeShopsThunk,
  getCatTypesThunk,
  getSlotsThunk,
  getTableByShopIdThunk,
  mockGetAllCoffeeShops,
  mockGetSlots,
  mockGetTables,
  selectCatTypes,
  selectCoffeeShops,
  selectIsLoadingGetAll,
  selectIsLoadingGetCatTypes,
} from '../../redux';

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

export const Home = () => {
  const debounce = useDebounce(400);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoadingGetAll = useAppSelector(selectIsLoadingGetAll);
  const coffeeShops = useAppSelector(selectCoffeeShops);

  const isLoadingGetCatTypes = useAppSelector(selectIsLoadingGetCatTypes);
  const catTypes = useAppSelector(selectCatTypes);

  const handleOnSearch = (value: string) => {
    debounce(() => {
      navigate(`/search?search=${value}`);
    });
  };

  useEffect(() => {
    dispatch(getCatTypesThunk());
    dispatch(getAllCoffeeShopsThunk());
    dispatch(getSlotsThunk());
  }, []);

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
                  {isLoadingGetCatTypes ? (
                    <Spin />
                  ) : (
                    catTypes.map((cat) => (
                      <Category ghost key={cat.catTypeId} type="default">
                        {cat.catTypeName}
                      </Category>
                    ))
                  )}
                </Space>{' '}
              </Col>
            </Row>
          </Col>
          <Col span={16}>
            <ShopsSection>
              <ShopsWrapper wrap align="center" size={10}>
                {isLoadingGetAll ? (
                  <Spin size="large" />
                ) : (
                  coffeeShops?.map((shop) => (
                    <Card
                      key={shop.shopId}
                      cover={<img src={shop.image} width={100} height={120} />}
                      size="small"
                      onClick={() => {
                        navigate(`coffee-shop/${shop.shopId}`);
                      }}
                    >
                      <Card.Meta description={shop.shopName} />
                      <p>{shop.address}</p>
                    </Card>
                  ))
                )}
              </ShopsWrapper>
            </ShopsSection>
          </Col>
        </ContentWrapper>
      </BackgroundWrapper>
    </>
  );
};
