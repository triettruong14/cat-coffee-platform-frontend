import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Space,
  Table,
  TableProps,
} from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';
import {
  Cat,
  CatFood,
  deleteCatById,
  Drink,
  getCoffeeShopCatFoodThunk,
  getCoffeeShopCatsThunk,
  getCoffeeShopDrinksThunk,
  getShopIdByAccountEmailThunk,
  selectCatTypes,
  selectCurrentShop,
  selectGetDrinkStatus,
  selectIsLoadingGetCatTypes,
  selectLoadingGetCatFood,
  selectLoadingGetCats,
  selectLoadingGetDrinks,
  selectSelectedCoffeeShopCatFood,
  selectSelectedCoffeeShopCats,
  selectSelectedCoffeeShopDrinks,
  selectUser,
  updateShopProfile,
} from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import stockCoffeeShop from '../../assets/stock_coffee_shop.jpeg';
import { CoffeeShop } from '../../domain/models';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const FlexContainer = styled(Flex)`
  width: 100vw;
`;

const BannerContainer = styled(Flex)`
  width: 100%;
  height: 30%;
  position: absolute;
  background: black;
  margin-top: 10px;
  color: #fff;
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
  transform: translateY(55%);
  background: #f2f2f2;
`;

const ShopManageSection = styled(Row)`
  width: 100%;
  height: 70%;
  transform: translateY(25%);
  background: #f2f2f2;
`;

const InfoWrapper = styled.div`
  background: #fff;
  height: 100%;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0 0 15px 15px;
`;

const ShopManagementWrapper = styled.div`
  background: #fff;
  height: 100%;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  margin-bottom: 2rem;
`;

const FormLabel = styled.p`
  font-weight: bold;
  color: #000;
  margin-bottom: 0.5rem;
`;

const mockShopData: CoffeeShop = new CoffeeShop({
  shopId: '1',
  shopName: 'Coffee Shop 1',
  address: '123 Nguyen Van Linh, District 7, HCMC',
  startDate: '2021-01-01',
  endDate: '2021-12-31',
});

export const ShopManagement = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const currentShop = useAppSelector(selectCurrentShop);
  const user = useAppSelector(selectUser);
  const catFoods = useAppSelector(selectSelectedCoffeeShopCatFood);
  const cats = useAppSelector(selectSelectedCoffeeShopCats);
  const catTypes = useAppSelector(selectCatTypes);
  const drinks = useAppSelector(selectSelectedCoffeeShopDrinks);
  const isGetDrinksSuccess = useAppSelector(selectGetDrinkStatus);

  const isLoadingGetCats = useAppSelector(selectLoadingGetCats);
  const isLoadingGetCatFood = useAppSelector(selectLoadingGetCatFood);
  const isLoadingGetDrinks = useAppSelector(selectLoadingGetDrinks);
  const isLoadingCatTypes = useAppSelector(selectIsLoadingGetCatTypes);

  const handleOnSubmit = () => {
    dispatch(
      updateShopProfile({
        shop: { ...form.getFieldsValue(), shopId: currentShop?.shopId },
        accountId: user?.id as string,
      }),
    );
  };

  const CatsTable = () => (
    <Table
      bordered
      dataSource={cats}
      loading={isLoadingGetCats || isLoadingCatTypes}
      columns={catsColumn}
    />
  );

  const catsColumn: TableProps<Cat>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'imageCat',
      key: 'imageCat',
      render: (text, record) => (
        <img
          src={record.imageCat}
          style={{
            width: '60px',
            height: '60px',
          }}
        />
      ),
    },
    {
      title: 'Cat Name',
      dataIndex: 'catName',
      key: 'name',
    },
    {
      title: 'Cat Type',
      dataIndex: 'catType',
      key: 'catType',
      render: (text, record) => (
        <span>
          {
            catTypes.find(
              (type) =>
                record.catTypeId == (type.catTypeId as unknown as string),
            )?.catTypeName
          }
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '77px',
      render: (text, record) => (
        <Flex justify="end">
          <a>
            <EditOutlined onClick={() => {}} />
          </a>
          <a>
            <DeleteOutlined
              onClick={() => dispatch(deleteCatById(record.catId))}
              style={{ marginLeft: '1rem' }}
            />
          </a>
        </Flex>
      ),
    },
  ];

  const DrinksTable = () => (
    <>
      <Table
        bordered
        dataSource={drinks}
        loading={isLoadingGetDrinks}
        columns={drinksColumn}
      />
    </>
  );

  const drinksColumn: TableProps<Drink>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'imageDrink',
      key: 'imageDrink',
      render: (text, record) => (
        <img
          src={record.imageDrink}
          style={{
            width: '60px',
            height: '60px',
          }}
        />
      ),
    },
    {
      title: 'Drink Name',
      dataIndex: 'drinkName',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <a>
          <DeleteOutlined />
          <EditOutlined />
        </a>
      ),
    },
  ];

  const CatFoodTable = () => (
    <>
      <Table
        bordered
        dataSource={catFoods}
        loading={isLoadingGetCatFood}
        columns={catFoodColumn}
      />
    </>
  );

  const catFoodColumn: TableProps<CatFood>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'imageDrink',
      key: 'imageDrink',
      render: (text, record) => (
        <img
          src={record.imageFoodForCat}
          style={{
            width: '60px',
            height: '60px',
          }}
        />
      ),
    },
    {
      title: 'Cat Food Name',
      dataIndex: 'foodCatName',
      key: 'foodCatName',
    },
    {
      title: 'Price',
      dataIndex: 'foodPrice',
      key: 'foodPrice',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <a>
          <DeleteOutlined />
          <EditOutlined />
        </a>
      ),
    },
  ];

  useEffect(() => {
    if (user) {
      dispatch(getShopIdByAccountEmailThunk(user?.email as string));
    }
  }, [user]);

  useEffect(() => {
    if (currentShop) {
      dispatch(getCoffeeShopCatsThunk(currentShop.shopId.toString()));
      dispatch(getCoffeeShopDrinksThunk(currentShop.shopId.toString()));
      dispatch(getCoffeeShopCatFoodThunk(currentShop.shopId.toString()));
    }
  }, [currentShop]);

  return (
    <FlexContainer vertical>
      <BannerContainer align="center" justify="center">
        <StyledBackground src={stockCoffeeShop} />
        <Header>Shop Management</Header>
      </BannerContainer>
      <InfoSection align="middle" justify="center">
        <Col span={18} style={{ height: '100%' }}>
          <Form
            form={form}
            initialValues={currentShop}
            onFinish={handleOnSubmit}
          >
            <InfoWrapper>
              <Title level={2}>Shop Information</Title>
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
                      <FormLabel>Start Time</FormLabel>
                      <Form.Item name="startTime">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <FormLabel>End Time</FormLabel>
                      <Form.Item name="endTime">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={12} offset={12}>
                  <Flex justify="end">
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Flex>
                </Col>
              </Row>
            </InfoWrapper>
          </Form>
        </Col>
      </InfoSection>
      <ShopManageSection align="middle" justify="center">
        <Col span={18}>
          <ShopManagementWrapper>
            <Title level={2}>Shop Items</Title>
            <Title level={3}>Cats</Title>
            <CatsTable />
            <Title level={3}>Cat Food</Title>
            <CatFoodTable />
            <Title level={3}>Drinks</Title>
            <DrinksTable />
          </ShopManagementWrapper>
        </Col>
      </ShopManageSection>
      {
        // <CreateShopForm/>
      }
    </FlexContainer>
  );
};
