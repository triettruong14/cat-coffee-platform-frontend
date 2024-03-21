import Icon, {
  CalendarOutlined,
  ShopOutlined,
  TableOutlined,
} from '@ant-design/icons';
import {
  Col,
  Collapse,
  CollapseProps,
  Descriptions,
  Divider,
  Flex,
  GetProps,
  Image,
  Row,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  CatFood,
  Drink,
  selectSelectedCoffeeShopCatFood,
  selectSelectedCoffeeShopDrinks,
} from '../../redux';
import { useAppSelector } from '../../redux/hooks';
import { useState } from 'react';

const moneySvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    style={{ width: '16px', height: '16px' }}
  >
    <path
      fill="#ee4d2d"
      d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
    />
  </svg>
);

type CustomIconcomponentProps = GetProps<typeof Icon>;

const MoneyIcon = (Props: Partial<CustomIconcomponentProps>) => (
  <Icon component={moneySvg} {...Props} />
);

const Container = styled(Flex)`
  width: 100%;
  height: 100%;
`;

const DetailContainer = styled(Flex)`
  width: 90%;
  height: 90%;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 25px;
`;

const ShopTitle = styled(Title)`
  .ant-typography:hover {
    color: #ee4d2d;
  }
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-content-box {
    height: 30vh;
    overflow-y: scroll;
  }
`;

const getCatFoodItems = (catFood: CatFood) => {
  return [
    {
      key: '1',
      label: 'Image',
      children: (
        <Image src={catFood?.imageFoodForCat} width={100} height={100} />
      ),
    },
    {
      key: '2',
      label: 'Price',
      children: <p>{catFood.foodPrice.toLocaleString('vn-VN')}đ</p>,
    },
  ];
};

const getDrinkItems = (drink: Drink) => {
  return [
    {
      key: '1',
      label: 'Image',
      children: <Image src={drink?.imageDrink} width={100} height={100} />,
    },
    {
      key: '2',
      label: 'Price',
      children: <p>{drink.price.toLocaleString('vn-VN')}đ</p>,
    },
  ];
};

export interface BookingDetailProps {}

export const BookingDetail = () => {
  const { state } = useLocation();
  const { shopName, bookingDate, total, tableName, slotId, image } = state;

  const [activeKey, setActiveKey] = useState<string[]>(['1']);

  const catFoods = useAppSelector(selectSelectedCoffeeShopCatFood);
  const drinks = useAppSelector(selectSelectedCoffeeShopDrinks);

  const CatFoodDescriptions = catFoods?.map((catFood) => {
    const catFoodDescriptionItems = getCatFoodItems(catFood);

    return (
      <>
        <Descriptions
          key={catFood.foodCatId}
          title={catFood.foodCatName + ' (1)'}
          items={catFoodDescriptionItems}
        />
        <Divider />
      </>
    );
  });

  const DrinksDescriptions = drinks?.map((drink) => {
    const drinkDescriptionItems = getDrinkItems(drink);

    return (
      <>
        <Descriptions
          key={drink.drinkId}
          title={drink.drinkName + ' (1)'}
          items={drinkDescriptionItems}
        />
        <Divider />
      </>
    );
  });

  const collapseComponentItems: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Cat Food',
      children: CatFoodDescriptions,
      onClick: () => {
        if (activeKey.includes('1')) {
          setActiveKey([]);
        } else setActiveKey(['1']);
      },
    },
    {
      key: '2',
      label: 'Drinks',
      children: DrinksDescriptions,
      onClick: () => {
        if (activeKey.includes('2')) {
          setActiveKey([]);
        } else setActiveKey(['2']);
      },
    },
  ];

  return (
    <>
      <Container align="center" justify="center">
        <DetailContainer align="center">
          <Row style={{ width: '100%', paddingInline: '1rem' }}>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Title level={2}>Booking Detail</Title>
            </Col>
          </Row>
          <Row style={{ width: '80%', paddingInline: '1rem' }} gutter={16}>
            <Col flex="auto">
              <Flex gap={16}>
                <Image src={image} />
                <div>
                  <ShopTitle level={3}>
                    <ShopOutlined
                      style={{ color: '#ee4d2d', marginRight: '.5rem' }}
                    />
                    {shopName}
                  </ShopTitle>
                  <ShopTitle level={5}>
                    <CalendarOutlined
                      style={{ color: '#ee4d2d', marginRight: '.5rem' }}
                    />
                    {bookingDate}
                  </ShopTitle>
                  <ShopTitle level={5}>
                    <MoneyIcon
                      style={{
                        color: '#ee4d2d',
                        marginRight: '.5rem',
                        fontSize: '1rem',
                      }}
                    />
                    {total.toLocaleString('vn-VN')}đ
                  </ShopTitle>
                  <ShopTitle level={5}>
                    <TableOutlined
                      style={{ color: '#ee4d2d', marginRight: '.5rem' }}
                    />
                    {tableName}
                  </ShopTitle>
                  <ShopTitle level={5}>
                    <CalendarOutlined
                      style={{ color: '#ee4d2d', marginRight: '.5rem' }}
                    />
                    8:00 - 9:00
                  </ShopTitle>
                </div>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col>
              <Title level={3}>Additional Purchases</Title>
            </Col>
          </Row>
          <Row style={{ width: '100%', flexGrow: 1 }}>
            <Col span={24}>
              <StyledCollapse
                bordered={false}
                activeKey={activeKey}
                defaultActiveKey={['1']}
                items={collapseComponentItems}
              />
            </Col>
          </Row>
        </DetailContainer>
      </Container>
    </>
  );
};
