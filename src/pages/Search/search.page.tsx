import { Card, Flex, Input, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import background from '../../assets/saigon_background.jpeg';
import stockCoffeeShop from '../../assets/stock_coffee_shop.jpeg';
import { useDebounce } from '../../hooks';
import {
  searchCoffeeShopByNameThunk,
  selectIsLoadingSearch,
  selectSearchResults,
} from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const BackgroundWrapper = styled(Flex)`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${background});
  height: 100vh;
  overflow: hidden;
  background-size: cover;
  padding-block: 4rem;
`;

const ResultsSection = styled.div`
  height: 692px;
  width: 65%;
  overflow-y: scroll;
  padding: 1rem;
  border-radius: 10px;
  background: #fff;
`;

export const mockCoffeeShops = [
  {
    id: 1,
    name: 'The Cat Cafe',
    address: '123 Catnip Lane',
    startTime: '8:00',
    endTime: '22:00',
  },
  {
    id: 2,
    name: 'Pawsome Coffee',
    address: '456 Meow Street',
    startTime: '7:00',
    endTime: '20:00',
  },
  {
    id: 3,
    name: 'Feline Roasters',
    address: '789 Scratch Avenue',
    startTime: '9:00',
    endTime: '21:00',
  },
  {
    id: 4,
    name: 'Whiskers Cafe',
    address: '321 Catnip Lane',
    startTime: '8:00',
    endTime: '22:00',
  },
  {
    id: 5,
    name: 'Kitty Kafe',
    address: '654 Meow Street',
    startTime: '7:30',
    endTime: '20:30',
  },
  {
    id: 6,
    name: 'Purrfect Brews',
    address: '987 Scratch Avenue',
    startTime: '8:30',
    endTime: '21:30',
  },
  {
    id: 7,
    name: 'Catnip Coffee',
    address: '111 Whisker Way',
    startTime: '6:00',
    endTime: '18:00',
  },
  {
    id: 8,
    name: 'Scratch Cafe',
    address: '222 Feline Road',
    startTime: '8:00',
    endTime: '20:00',
  },
  {
    id: 9,
    name: 'Meow Roasters',
    address: '333 Kitten Drive',
    startTime: '7:00',
    endTime: '19:00',
  },
  {
    id: 10,
    name: 'Kitten Kafe',
    address: '444 Purr Street',
    startTime: '9:00',
    endTime: '21:00',
  },
  {
    id: 11,
    name: 'Pawsome Brews',
    address: '555 Catnip Lane',
    startTime: '8:00',
    endTime: '22:00',
  },
  {
    id: 12,
    name: 'Feline Cafe',
    address: '777 Whisker Way',
    startTime: '7:30',
    endTime: '20:30',
  },
  {
    id: 13,
    name: 'Purrfect Roasters',
    address: '888 Kitten Drive',
    startTime: '8:30',
    endTime: '21:30',
  },
  {
    id: 14,
    name: 'Clawsome Coffee',
    address: '999 Feline Road',
    startTime: '6:00',
    endTime: '18:00',
  },
  {
    id: 15,
    name: "Cat's Meow Cafe",
    address: '1010 Meow Street',
    startTime: '8:00',
    endTime: '20:00',
  },
];

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || '',
  );
  const isLoading = useAppSelector(selectIsLoadingSearch);
  const results = useAppSelector(selectSearchResults);

  const dispatch = useAppDispatch();
  const debounce = useDebounce(400);

  useEffect(() => {
    if (searchTerm !== '') {
      console.log('searchTerm', searchTerm);
      dispatch(searchCoffeeShopByNameThunk(searchTerm));
    }
  }, []);

  const handleOnSearch = (value: string) => {
    debounce(() => {
      dispatch(searchCoffeeShopByNameThunk(value));
      setSearchParams({ search: value });
    });
  };

  return (
    <BackgroundWrapper>
      <Flex justify="center" align="center" style={{ width: '100%' }} vertical>
        <ResultsSection>
          <Input.Search
            value={searchTerm}
            placeholder="Search for coffee shops"
            onSearch={handleOnSearch}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              handleOnSearch(event.target.value);
            }}
            style={{ marginBottom: '2rem' }}
          />
          {isLoading ? (
            <Flex justify="center" align="center">
              <Spin size="large" />
            </Flex>
          ) : (
            <>
              <h2>Found {results?.length} results</h2>
              <Flex wrap="wrap" gap={15}>
                {results?.map((shop) => (
                  <Flex key={shop.shopId}>
                    <Card
                      cover={
                        <img src={stockCoffeeShop} width={50} height={25} />
                      }
                    >
                      <Link
                        to={`/coffee-shop/${shop.shopId}`}
                        style={{ color: '#000' }}
                      >
                        <Space direction="vertical">
                          <h3>{shop.shopName}</h3>
                          <p>{shop.address}</p>
                          <p>
                            Open from {shop.startDate} to {shop.endDate}
                          </p>
                        </Space>
                      </Link>
                    </Card>
                  </Flex>
                ))}
              </Flex>
            </>
          )}
        </ResultsSection>
      </Flex>
    </BackgroundWrapper>
  );
};
