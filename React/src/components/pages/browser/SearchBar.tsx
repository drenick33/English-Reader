import React, { useState, useEffect } from 'react';
import { Row, Select, Input } from 'antd';
import SearchDifficultySelector from './SearchDifficultySelector';
import { browserStrings } from './Strings';

const { Search } = Input;
const { Option } = Select;

const SearchBar = () => {
  const [difficulty, setDifficulty] = useState('All');

  const onSearch = (value: any) => console.log(value);
  const selectDifficulty = (level: string) => {
    console.log(level);
    setDifficulty(level);
  };

  return (
    <Row justify='center'>
      <SearchDifficultySelector selectDifficulty={selectDifficulty} />
      <Search
        className='ml-3'
        placeholder='Story Title'
        onSearch={onSearch}
        enterButton
        style={{ maxWidth: '20%' }}
      />
    </Row>
  );
};

export default SearchBar;
