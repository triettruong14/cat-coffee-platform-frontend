import { Button, Divider, Flex, Menu, MenuProps, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { mockCoffeeShops } from '../Search';
import stockCoffeeShop from '../../assets/stock_coffee_shop.jpeg';
import stockSmoothie from '../../assets/stock_chocolate_chip_smoothie.jpeg';
import stockCat from '../../assets/stock_scottish_cat.jpeg';
import stockCatFood from '../../assets/stock_cat_food.png';
import { ArrowLeftOutlined } from '@ant-design/icons';

const BackgroundWrapper = styled(Flex)`
  background: #f2f2f2;
  height: 100vh;
  overflow: hidden;
  background-size: cover;
  padding-block: 2rem;
`;

const ShopOverviewSection = styled(Flex)`
  width: 80%;
  height: 350px;
  padding-top: 30px;
`;

const ShopInfo = styled(Flex)`
  width: 645px;
`;

const ShopDetailText = styled.p`
  font-size: 1.215rem;
  margin-block: 0.5rem;
`;

const ShopCategories = styled(Menu)`
  width: 232px;
  height: min-content;
  background: #fff;
  padding: 15px;
`;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const shopCategories: MenuItem[] = [
  getItem('Drinks', 'drinks', undefined, undefined),
  getItem('Cats', 'cats', undefined, undefined),
  getItem('Cat Food', 'cat-food', undefined, undefined),
];

const ShopMenu = styled(Flex)`
  width: 540px;
  height: min-content;
  background: #fff;
  padding: 20px;
`;

const Item = styled(Flex)`
  width: 100%;
  height: min-content;
`;

const MenuItemLabel = styled.p`
  font-size: 18px;
`;

const PriceLabel = styled.p`
  font-size: 16px;
`;

const CurrencyLabel = styled.span`
  font-weight: 400;
  position: relative;
  top: -9px;
  font-size: 10px;
  right: 0;
`;

export const CoffeeShopDetail = () => {
  const { id } = useParams();
  const [coffeeShop, setCoffeeShop] = useState(
    mockCoffeeShops.at(parseInt(id as string) - 1),
  );
  const [menuItems, setMenuItems] = useState<React.ReactNode>([]);
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    const { key } = e;
    renderMenuItem(key as 'drinks' | 'cats' | 'cat-food');
  };

  const renderMenuItem = (key: 'drinks' | 'cats' | 'cat-food') => {
    switch (key) {
      case 'drinks':
        setMenuItems([
          <Item justify="space-between" key={0}>
            <Flex gap={20}>
              <img
                src={stockSmoothie}
                style={{
                  width: '60px',
                  height: '60px',
                }}
              />
              <MenuItemLabel>Chocolate Chip Cookie Smoothie</MenuItemLabel>
            </Flex>
            <PriceLabel>
              45,000<CurrencyLabel>đ</CurrencyLabel>
            </PriceLabel>
          </Item>,
        ]);
        break;
      case 'cats':
        setMenuItems([
          <Item justify="space-between" key={0}>
            <Flex gap={20}>
              <img
                src={stockCat}
                style={{
                  width: '60px',
                  height: '60px',
                }}
              />
              <MenuItemLabel>Tiny</MenuItemLabel>
            </Flex>
          </Item>,
        ]);
        break;
      case 'cat-food':
        setMenuItems([
          <Item justify="space-between" key={0}>
            <Flex gap={20}>
              <img
                src={stockCatFood}
                style={{
                  width: '60px',
                  height: '60px',
                }}
              />
              <MenuItemLabel>Whiskas</MenuItemLabel>
            </Flex>
            <PriceLabel>
              23,000<CurrencyLabel>đ</CurrencyLabel>
            </PriceLabel>
          </Item>,
        ]);
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    renderMenuItem('drinks');
  }, []);

  return (
    <>
      <Flex style={{ width: '100%', background: '#fff' }} justify="center">
        <ShopOverviewSection justify="space-between">
          <Space style={{ position: 'absolute', translate: '-20px -30px' }}>
            <Button
              type="link"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowLeftOutlined />
              Go Back
            </Button>
          </Space>
          <img
            src={stockCoffeeShop}
            style={{ width: '480px', height: '300px' }}
          />
          <ShopInfo>
            <div style={{ marginLeft: '5rem' }}>
              <Divider />
              <h1>{coffeeShop?.name}</h1>
              <ShopDetailText>{coffeeShop?.address}</ShopDetailText>
              <Divider />
              <ShopDetailText>
                Hours: {coffeeShop?.startTime} - {coffeeShop?.endTime}
              </ShopDetailText>
            </div>
          </ShopInfo>
        </ShopOverviewSection>
      </Flex>
      <BackgroundWrapper justify="center">
        <Flex style={{ width: '80%' }} gap={20}>
          <ShopCategories
            mode="vertical"
            defaultSelectedKeys={['drinks']}
            items={shopCategories}
            onClick={onClick}
          />
          <ShopMenu>{menuItems}</ShopMenu>
        </Flex>
      </BackgroundWrapper>
    </>
  );
};
