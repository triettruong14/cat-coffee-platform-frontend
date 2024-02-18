import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useSearchParams } from 'react-router-dom';
import { searchCoffeeShopByNameThunk, selectSearchResults } from '../../redux';
import styled from 'styled-components';
import background from '../../assets/saigon_background.jpeg';
import { Flex } from 'antd';

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
  width: 60%;
  overflow-y: scroll;
  padding: 1rem;
  border-radius: 10px;
  background: #fff;
`;

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const results = useAppSelector(selectSearchResults);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      dispatch(searchCoffeeShopByNameThunk(search));
    }
  }, []);

  return (
    <BackgroundWrapper>
      <Flex justify="center" align="center" style={{ width: '100%' }} vertical>
        <ResultsSection>
          <Flex justify="start" align="start">
            <h2>Found {results?.length} results</h2>
          </Flex>
          {results!.toString()}
          <div
            style={{ width: '200px', height: '100px', background: 'red' }}
          ></div>
          <div
            style={{ width: '200px', height: '100px', background: 'red' }}
          ></div>
          <div
            style={{ width: '200px', height: '100px', background: 'red' }}
          ></div>
          <div
            style={{ width: '200px', height: '100px', background: 'red' }}
          ></div>
        </ResultsSection>
      </Flex>
    </BackgroundWrapper>
  );
};
