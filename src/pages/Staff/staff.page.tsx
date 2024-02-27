import Icon, { DeleteOutlined, GithubOutlined } from '@ant-design/icons';
import { GetProps, Layout, Menu, MenuProps, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { ColumnType, TableProps } from 'antd/es/table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AppHeader } from '../../components/Header';
import {
  Cat,
  CatFood,
  deleteCatById,
  Drink,
  getCatTypesThunk,
  getCoffeeShopCatFoodThunk,
  getCoffeeShopCatsThunk,
  getCoffeeShopDrinksThunk,
  getShopIdByAccountEmailThunk,
  selectCatTypes,
  selectCurrentShopId,
  selectIsLoadingGetCatTypes,
  selectLoadingGetCatFood,
  selectLoadingGetCats,
  selectLoadingGetDrinks,
  selectSelectedCoffeeShopCatFood,
  selectSelectedCoffeeShopCats,
  selectSelectedCoffeeShopDrinks,
  selectUser,
} from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

type CustomIconcomponentProps = GetProps<typeof Icon>;

const Catsvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path
      fill="#ffffff"
      d="M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5v0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32h0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128v0V32 12 10.7C352 4.8 356.7 .1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2l0 .1L384 21.3l27.2 36.3L416 64h64l4.8-6.4L512 21.3 524.8 4.3l0-.1c2-2.6 5.1-4.2 8.4-4.2h.2C539.3 .1 544 4.8 544 10.7V12 32v96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"
    />
  </svg>
);
const CatIcon = (Props: Partial<CustomIconcomponentProps>) => (
  <Icon component={Catsvg} {...Props} />
);

const Drinksvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="#ffffff"
      d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"
    />
  </svg>
);
const DrinkIcon = (Props: Partial<CustomIconcomponentProps>) => (
  <Icon component={Drinksvg} {...Props} />
);

const Foodsvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="#ffffff"
      d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z"
    />
  </svg>
);

const FoodIcon = (Props: Partial<CustomIconcomponentProps>) => (
  <Icon component={Foodsvg} {...Props} />
);

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

const items: MenuItem[] = [
  getItem('Manage Cats', 'cats', <CatIcon style={{ color: '#fff' }} />),
  getItem('Manage Drinks', 'drinks', <DrinkIcon style={{ color: '#fff' }} />),
  getItem(
    'Manage Cat Food',
    'cat-food',
    <FoodIcon style={{ color: '#fff' }} />,
  ),
];

const TableContainer = styled.div`
  width: 95%;
  height: 95%;
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Staff = () => {
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedContent, setSelectedContent] = useState<React.ReactNode>();

  const cats = useAppSelector(selectSelectedCoffeeShopCats);
  const catFood = useAppSelector(selectSelectedCoffeeShopCatFood);
  const drinks = useAppSelector(selectSelectedCoffeeShopDrinks);
  const currentShopId = useAppSelector(selectCurrentShopId);
  const catTypes = useAppSelector(selectCatTypes);
  const user = useAppSelector(selectUser);

  const isLoadingGetCats = useAppSelector(selectLoadingGetCats);
  const isLoadingGetCatFood = useAppSelector(selectLoadingGetCatFood);
  const isLoadingGetDrinks = useAppSelector(selectLoadingGetDrinks);
  const isLoadingCatTypes = useAppSelector(selectIsLoadingGetCatTypes);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    renderSelectedContent(key as 'drinks' | 'cats');
  };

  const CatsTable = () => (
    <>
      <h2>Cats</h2>
      <Table
        bordered
        dataSource={cats}
        loading={isLoadingGetCats || isLoadingCatTypes}
        columns={catsColumn}
      />
    </>
  );

  const catsColumn: TableProps<Cat>['columns'] = useMemo(
    () => [
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
        render: (text, record) => (
          <a>
            <DeleteOutlined
              onClick={() => dispatch(deleteCatById(record.catId))}
            />
          </a>
        ),
      },
    ],
    [catTypes.length],
  );

  const DrinksTable = () => (
    <>
      <h2>Drinks</h2>
      <Table
        bordered
        dataSource={drinks}
        loading={isLoadingGetDrinks}
        columns={drinksColumn}
      />
    </>
  );

  const drinksColumn: TableProps<Drink>['columns'] = useMemo(
    () => [
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
          </a>
        ),
      },
    ],
    [drinks],
  );

  const CatFoodTable = () => (
    <>
      <h2>Cat Food</h2>
      <Table
        bordered
        dataSource={catFood}
        loading={isLoadingGetCatFood}
        columns={catFoodColumn}
      />
    </>
  );

  const catFoodColumn: TableProps<CatFood>['columns'] = useMemo(
    () => [
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
          </a>
        ),
      },
    ],
    [catFood],
  );

  const renderSelectedContent = useCallback(
    (key: 'drinks' | 'cats' | 'cat-food') => {
      switch (key) {
        case 'cats':
          setSelectedContent(<CatsTable />);
          break;
        case 'drinks':
          setSelectedContent(<DrinksTable />);
          break;
        case 'cat-food':
          setSelectedContent(<CatFoodTable />);
          break;
      }
    },
    [CatsTable, DrinksTable, CatFoodTable],
  );

  useEffect(() => {
    renderSelectedContent('cats');
    if (!catTypes) {
      dispatch(getCatTypesThunk());
    }
    dispatch(getShopIdByAccountEmailThunk(user?.email as string));
  }, []);

  useEffect(() => {
    if (currentShopId) {
      dispatch(getCoffeeShopCatsThunk(currentShopId.toString()));
      dispatch(getCoffeeShopDrinksThunk(currentShopId.toString()));
      dispatch(getCoffeeShopCatFoodThunk(currentShopId.toString()));
    }
  }, [currentShopId]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={['cats']}
            mode="inline"
            items={items}
            onClick={onClick}
          />
        </Sider>
        <Content>
          <Wrapper>
            <TableContainer>{selectedContent}</TableContainer>
          </Wrapper>
        </Content>
      </Layout>
    </Layout>
  );
};
