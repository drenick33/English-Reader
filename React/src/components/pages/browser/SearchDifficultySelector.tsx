import React from 'react';
import { Select } from 'antd';
import { browserStrings } from './Strings';

const { Option } = Select;

type SearchProps = {
  selectDifficulty: Function;
};

const SearchDifficultySelector = ({ selectDifficulty }: SearchProps) => {
  return (
    <Select
      defaultValue='All'
      onSelect={(value: string) => selectDifficulty(value)}
      style={{ maxWidth: '20%', minWidth: '15%' }}
    >
      <Option key='searchAll' value='All'>
        {browserStrings.all}
      </Option>
      <Option key='searchBeginner' value='Beginner'>
        {browserStrings.Beginner}
      </Option>
      <Option key='searchElementary' value='Elementary'>
        {browserStrings.Elementary}
      </Option>
      <Option key='searchIntermediate' value='Intermediate'>
        {browserStrings.Intermediate}
      </Option>
      <Option key='searchExpert' value='Expert'>
        {browserStrings.Expert}
      </Option>
      <Option key='searchMaster' value='Master'>
        {browserStrings.Master}
      </Option>
    </Select>
  );
};

export default SearchDifficultySelector;
