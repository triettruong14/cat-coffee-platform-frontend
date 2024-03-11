import { Button, Col, Flex, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import background from '../../assets/saigon_background.jpeg';
import {
  getAllCoffeeShopsThunk,
  getShopIdByAccountEmailThunk,
  mockGetAllCoffeeShops,
  selectCoffeeShops,
  selectCurrentShopId,
  selectUser,
} from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import stockCoffeeShop from '../../assets/stock_coffee_shop.jpeg';
import { CoffeeShop } from '../../domain/models';

const FlexContainer = styled(Flex)`
  width: 100vw;
  height: 100vh;
`;

const BannerContainer = styled(Flex)`
  width: 100%;
  height: 30%;
  position: absolute;
  background: black;
  margin-top: 10px;
  color: #fff;
`;

const BannerSection = styled.div`
  width: 80%;
  height: 100%;
  background: black;
  overflow: hidden;
  border-radius: 25px;
  padding: 0.5rem 1rem;
`;

const StyledBackground = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
`;

const Header = styled.h1`
  font-size: 3rem;
`;

const InfoSection = styled(Row)`
  width: 100%;
  height: 70%;
  transform: translateY(45%);
  background: #f2f2f2;
`;

const InfoWrapper = styled.div`
  background: #fff;
  height: 100%;
  width: 100%;
  padding: 0.5rem 1rem;
`;

const FormLabel = styled.p`
  font-weight: bold;
  color: #000;
  margin-bottom: 0.5rem;
`;

export const ShopManagement = () => {
  const dispatch = useAppDispatch();
  const state = useLocation();
  const [form] = Form.useForm();

  const currentShopId = useAppSelector(selectCurrentShopId);
  const user = useAppSelector(selectUser);
  const coffeeShops = useAppSelector(selectCoffeeShops);
  // const shop = useAppSelector()
  //
  const [selectedCoffeeShop, setSelectedCoffeeShop] = useState<CoffeeShop>();

  useEffect(() => {
    if (!coffeeShops) {
      dispatch(getAllCoffeeShopsThunk());
      // dispatch(mockGetAllCoffeeShops());
    }

    if (!state.state) return;

    const { user } = state.state;
    dispatch(getShopIdByAccountEmailThunk(user?.email as string));
  }, []);

  useEffect(() => {
    if (coffeeShops?.length !== 0) {
      setSelectedCoffeeShop(
        coffeeShops?.find((shop) => shop.shopId == currentShopId),
      );
    }
  }, [coffeeShops]);

  return (
    <FlexContainer>
      <BannerContainer align="center" justify="center">
        <StyledBackground src={stockCoffeeShop} />
        <Header>Shop Management</Header>
      </BannerContainer>
      <InfoSection align="middle" justify="center">
        <Col span={18} style={{ height: '100%' }}>
          <Form form={form} initialValues={selectedCoffeeShop}>
            <InfoWrapper>
              <Row gutter={24} justify="center">
                <Col span={24}>
                  <FormLabel>Shop Name</FormLabel>
                  <Form.Item name="shopName">
                    <Input />
                  </Form.Item>
                  <FormLabel>Address</FormLabel>
                  <Form.Item name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row style={{ width: '100%' }} gutter={8}>
                    <Col span={12}>
                      <FormLabel>Start Date</FormLabel>
                      <Form.Item name="startDate">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <FormLabel>End Date</FormLabel>
                      <Form.Item name="endDate">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={12} offset={12}>
                  <Flex justify="end">
                    <Button type="primary">Save</Button>
                  </Flex>
                </Col>
              </Row>
            </InfoWrapper>
          </Form>
        </Col>
      </InfoSection>
      {
        // <CreateShopForm/>
      }
    </FlexContainer>
  );
};
