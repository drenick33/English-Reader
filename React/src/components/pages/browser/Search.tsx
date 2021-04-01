import React from 'react';
import { Row } from 'antd';
import SearchBar from './SearchBar';

const Search = () => {
  return (
    <div className='mainContainer'>
      <Row justify='center'>
        <h2>Search WIP</h2>
      </Row>
      <SearchBar />
    </div>
  );
};

export default Search;
