import React, { useCallback, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setSearchField, selectSearchField } from './searchSlice';
import { getKittiesAsync, selectKitty } from './kittySlice';

import { ErrorBoundry } from '../../containers/errorBoundary/ErrorBoundry';
import { SearchBox } from '../../components/searchBox/SearchBox';
import { CardList } from '../../components/card/CardList';
import { Title } from '../../components/title/Title';
import GithubCorner from 'react-github-corner';

export const Home = () => {
  const searchField = useAppSelector(selectSearchField);
  const { kitties, isPending } = useAppSelector(selectKitty);
  const dispatch = useAppDispatch();

  // `Dispatch` comes from a custom `hook`, so it doesn't have an stable
  // signature and it will change on each render (reference equality)
  // Add an aditional layer of dependencies by wrapping the hanlder inside a `useCallback` hook
  const stableDispatch = useCallback(dispatch, [dispatch]);

  // Mounted life cycle
  useEffect(() => {
    stableDispatch(getKittiesAsync());
  }, [stableDispatch]);

  const filteredKitties = kitties.filter((kitty) => {
    return kitty.name.toLowerCase().includes(searchField.toLowerCase());
  });

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchField(event.target.value));
  };

  return (
    <>
      <GithubCorner href="https://github.com/TriDiamond/kitty-friends-typescript" />
      <div className="block w-full px-6">
        <div className="max-w-4xl lg:max-w-6xl mx-auto pb-12 py-6">
          <div className="flex flex-col justify-center items-center my-6">
            {isPending ? (
              <>
                <Title context="Loading..." />
              </>
            ) : (
              <>
                <Title context="Kitty Friends" />
              </>
            )}
            <SearchBox searchChange={onSearchChange} />
          </div>
          <ErrorBoundry>
            <CardList data={filteredKitties} />
          </ErrorBoundry>
          <div className="flex flex-col items-center mt-10 text-gray-400 text-lg">
            <p>
              Made with 💎 by
              <a href="https://github.com/TriDiamond"> Tridiamond</a>
            </p>
            <p>Build with React + Redux</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
