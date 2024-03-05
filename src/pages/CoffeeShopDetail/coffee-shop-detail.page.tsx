import {
  Button,
  Divider,
  Flex,
  Form,
  Menu,
  MenuProps,
  Modal,
  Space,
  Spin,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import stockCoffeeShop from '../../assets/stock_coffee_shop.jpeg';
import stockSmoothie from '../../assets/stock_chocolate_chip_smoothie.jpeg';
import stockCat from '../../assets/stock_scottish_cat.jpeg';
import stockCatFood from '../../assets/stock_cat_food.png';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import {
  bookTableThunk,
  Cat,
  CatFood,
  Drink,
  getAllCoffeeShopsThunk,
  getCoffeeShopCatFoodThunk,
  getCoffeeShopCatsThunk,
  getCoffeeShopDrinksThunk,
  getTableByShopIdThunk,
  selectBookingSuccess,
  selectCoffeeShops,
  selectGetDrinkStatus,
  selectIsLoadingBooking,
  selectLoadingGetCatFood,
  selectLoadingGetCats,
  selectLoadingGetDrinks,
  selectSelectedCoffeeShopCatFood,
  selectSelectedCoffeeShopCats,
  selectSelectedCoffeeShopDrinks,
  selectSelectedCoffeeShopTables,
  selectSignInStatus,
  selectUser,
} from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CoffeeShop } from '../../domain/models';
import { BookingForm } from './booking';
import { toast } from 'react-toastify';

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

const BookingModal = styled(Modal)`
  width: 700px !important;
  .ant-model-content {
    width: 700px !important;
  }
`;

const mockCatFood: CatFood[] = [
  {
    foodCatId: 1,
    foodCatName: 'Cat Food 1',
    foodPrice: 10000,
  },
  {
    foodCatId: 2,
    foodCatName: 'Cat Food 2',
    foodPrice: 20000,
  },
  {
    foodCatId: 3,
    foodCatName: 'Cat Food 3',
    foodPrice: 30000,
  },
];

const mockCats: Cat[] = [
  {
    catId: '1',
    catName: 'Cat 1',
    shopId: '1',
    catTypeId: '1',
    imageCat: '',
  },
  {
    catId: '2',
    catName: 'Cat 2',
    shopId: '1',
    catTypeId: '1',
    imageCat: '',
  },
  {
    catId: '3',
    catName: 'Cat 3',
    shopId: '1',
    catTypeId: '1',
    imageCat: '',
  },
];

const mockDrinks: Drink[] = [
  {
    drinkId: 1,
    drinkName: 'Cappuccino',
    price: 30000,
    imageDrink: stockSmoothie,
  },
  {
    drinkId: 2,
    drinkName: 'Latte',
    price: 35000,
    imageDrink: stockSmoothie,
  },
  {
    drinkId: 3,
    drinkName: 'Mocha',
    price: 40000,
    imageDrink: stockSmoothie,
  },
];

export const CoffeeShopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const coffeeShops = useAppSelector(selectCoffeeShops);
  const [selectedCoffeeShop, setSelectedCoffeeShop] = useState<CoffeeShop>();
  const [menuItems, setMenuItems] = useState<React.ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const catFoods = useAppSelector(selectSelectedCoffeeShopCatFood);
  const isLoadingGetCatFood = useAppSelector(selectLoadingGetCatFood);
  const cats = useAppSelector(selectSelectedCoffeeShopCats);
  const isLoadingGetCats = useAppSelector(selectLoadingGetCats);
  const drinks = useAppSelector(selectSelectedCoffeeShopDrinks);
  const isGetDrinksSuccess = useAppSelector(selectGetDrinkStatus);
  const isSignedIn = useAppSelector(selectSignInStatus);
  const account = useAppSelector(selectUser);
  const isLoadingBooking = useAppSelector(selectIsLoadingBooking);
  const isBookingSuccess = useAppSelector(selectBookingSuccess);

  const onClick: MenuProps['onClick'] = (e) => {
    const { key } = e;
    renderMenuItem(key as 'drinks' | 'cats' | 'cat-food');
  };

  const renderMenuItem = useCallback(
    (key: 'drinks' | 'cats' | 'cat-food') => {
      switch (key) {
        case 'drinks':
          setMenuItems(
            <Flex vertical>
              {drinks?.map((drink) => (
                <Item justify="space-between" key={drink.drinkId}>
                  <Flex gap={20}>
                    <img
                      src={drink.imageDrink}
                      style={{
                        width: '60px',
                        height: '60px',
                      }}
                    />
                    <MenuItemLabel>{drink.drinkName}</MenuItemLabel>
                  </Flex>
                  <PriceLabel>
                    {drink.price}
                    <CurrencyLabel>đ</CurrencyLabel>
                  </PriceLabel>
                </Item>
              ))}
            </Flex>,
          );
          break;
        case 'cats':
          setMenuItems(
            isLoadingGetCats ? (
              <Spin />
            ) : (
              <Flex vertical>
                {cats?.map((cat) => (
                  <Item justify="space-between" key={cat.catId}>
                    <Flex gap={20} key={cat.catId}>
                      <img
                        src={stockCat}
                        style={{
                          width: '60px',
                          height: '60px',
                        }}
                      />
                      <MenuItemLabel>{cat.catName}</MenuItemLabel>
                    </Flex>
                  </Item>
                ))}
              </Flex>
            ),
          );
          break;
        case 'cat-food':
          setMenuItems(
            isLoadingGetCatFood ? (
              <Spin />
            ) : (
              <Flex vertical>
                {catFoods?.map((catFood) => (
                  <Item justify="space-between" key={catFood.foodCatId}>
                    <Flex gap={20}>
                      <img
                        src={stockCatFood}
                        style={{
                          width: '60px',
                          height: '60px',
                        }}
                      />
                      <MenuItemLabel>{catFood.foodCatName}</MenuItemLabel>
                    </Flex>
                    <PriceLabel>
                      {catFood.foodPrice}
                      <CurrencyLabel>đ</CurrencyLabel>
                    </PriceLabel>
                  </Item>
                ))}
              </Flex>
            ),
          );
          break;
        default:
          return null;
      }
    },
    [catFoods, cats, isLoadingGetCatFood, isLoadingGetCats, coffeeShops],
  );

  useEffect(() => {
    if (coffeeShops?.length !== 0) {
      setSelectedCoffeeShop(coffeeShops?.find((shop) => shop.shopId == id));
    }
  }, [coffeeShops]);

  useEffect(() => {
    if (selectedCoffeeShop) {
      dispatch(getCoffeeShopCatFoodThunk(selectedCoffeeShop.shopId || ''));
      dispatch(getCoffeeShopCatsThunk(selectedCoffeeShop.shopId || ''));
      dispatch(getCoffeeShopDrinksThunk(selectedCoffeeShop.shopId || ''));
    }
  }, [selectedCoffeeShop]);

  useEffect(() => {
    if (!coffeeShops) {
      dispatch(getAllCoffeeShopsThunk());
    }

    if (id) {
      dispatch(getTableByShopIdThunk(id));
    }
  }, []);

  useEffect(() => {
    if (isBookingSuccess) {
      setIsModalOpen(false);
      form.resetFields();
    }
  }, [isBookingSuccess]);

  useEffect(() => {
    if (isGetDrinksSuccess && drinks) {
      renderMenuItem('drinks');
    }
  }, [isGetDrinksSuccess, drinks]);

  const handleOnSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const { catFoods, drinks, drinksTotal, catFoodsTotal, ...rest } =
          values;
        const catFoodObject = catFoods.map(
          (catFood: {
            foodCatId: { key: string; label: string; value: string };
            quantity: number;
          }) => {
            const { foodCatId, quantity } = catFood;
            return {
              foodCatId: foodCatId.value,
              quantity,
            };
          },
        );

        const drinkObject = drinks.map(
          (drink: {
            drinkId: { key: string; label: string; value: string };
            quantity: number;
          }) => {
            const { drinkId, quantity } = drink;
            return {
              drinkId: drinkId.value,
              quantity,
            };
          },
        );

        dispatch(
          bookTableThunk({
            ...rest,
            catFoods: catFoodObject,
            drinks: drinkObject,
            drinksTotal,
            catFoodsTotal,
            accountId: account?.id,
            shopId: id,
            total: 0,
          }),
        );
      })
      .catch((err) => {
        toast.error(err);
      });
  };

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
              <h1>{selectedCoffeeShop?.shopName}</h1>
              <ShopDetailText>{selectedCoffeeShop?.address}</ShopDetailText>
              <Divider />
              <ShopDetailText>
                Hours: {selectedCoffeeShop?.startDate} -{' '}
                {selectedCoffeeShop?.endDate}
              </ShopDetailText>
              {!isSignedIn ? (
                <Button>
                  Sign in to start Booking <LoginOutlined />
                </Button>
              ) : (
                <>
                  <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Start Booking <CalendarOutlined />
                  </Button>
                  <BookingModal
                    open={isModalOpen}
                    title={`Booking for ${selectedCoffeeShop?.shopName}`}
                    onCancel={() => setIsModalOpen(false)}
                    onOk={handleOnSubmit}
                    confirmLoading={isLoadingBooking}
                  >
                    <BookingForm form={form} handleOnSubmit={handleOnSubmit} />
                  </BookingModal>
                </>
              )}
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
          <ShopMenu>{menuItems || <Spin />}</ShopMenu>
        </Flex>
      </BackgroundWrapper>
    </>
  );
};
