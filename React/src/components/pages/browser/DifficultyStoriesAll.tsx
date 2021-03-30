import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { get } from '../../../utils/httpMethods';
import { get as Got } from 'lodash';
import { browserStrings } from './Strings';
import StoryCard from './StoryCard';

const DifficultyStoriesAll = (props: any) => {
  const [stories, setStories] = useState([{}]);
  const [difficultyLabel, setDifficultyLabel] = useState('');
  const difficulty = Got(props, 'match.params.difficulty', '');

  useEffect(() => {
    queryGetStoriesByDifficultyAndSet();
    let lang = localStorage.getItem('locale') || '';
    browserStrings.setLanguage(lang);
  }, []);

  const queryGetStoriesByDifficultyAndSet = async () => {
    const difficulty = localStorage.getItem('difficulty') || 'Beginner';
    setDifficultyLabel(browserStrings[difficulty]);
    const url = '/story/difficulty/' + difficulty;
    let data = await get({ url: url });
    data = data.stories;
    showSelectedStories(data);
  };

  const showSelectedStories = (storyResults: any) => {
    setStories(storyResults);
  };

  return (
    <div className='mainContainer'>
      <Row justify='space-around'>
        <h2>
          {difficultyLabel} {browserStrings.stories}
        </h2>
      </Row>
      <Row justify='center'>
        {stories && stories.map((el: any) => <StoryCard story={el} />)}
      </Row>
    </div>
  );
};

export default DifficultyStoriesAll;
