import React, { useEffect } from 'react';
import { Select } from 'antd';
import { navStrings } from './Strings';

const { Option } = Select;

const DifficultySelector = (props: any) => {
  useEffect(() => {
    let lang = localStorage.getItem('locale') || '';
    navStrings.setLanguage(lang);
  }, []);

  const setDifficulty = (difficulty: string) => {
    localStorage.setItem('difficulty', difficulty);
    window.location.reload();
  };

  return (
    <div>
      <p>{navStrings.lang}</p>
      <Select
        defaultValue={localStorage.getItem('difficulty') || 'Beginner'}
        onSelect={(value: string) => setDifficulty(value)}
      >
        <Option value='Beginner'>{navStrings.Beginner}</Option>
        <Option value='Elementary'>{navStrings.Elementary}</Option>
        <Option value='Intermediate'>{navStrings.Intermediate}</Option>
        <Option value='Expert'>{navStrings.Expert}</Option>
        <Option value='Expert'>{navStrings.Master}</Option>
      </Select>
    </div>
  );
};

export default DifficultySelector;
