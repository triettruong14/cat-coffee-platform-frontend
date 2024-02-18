import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useSearchParams } from 'react-router-dom';
import { searchCoffeeShopByNameThunk, selectSearchResults } from '../../redux';

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
    <div>
      <h1>Search</h1>
      {results!.toString()}
    </div>
  );
};
