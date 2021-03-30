import React from 'react';
import NewStoriesTab from './NewStoriesTab';
import DifficultyStoriesTab from './DifficultyStoriesTab';

const Browser = () => {
  return (
    <div className='mainContainer'>
      <NewStoriesTab />
      <div className='mt-3'>
        <DifficultyStoriesTab />
      </div>
    </div>
  );
};

export default Browser;
