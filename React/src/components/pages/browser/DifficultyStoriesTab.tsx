import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Button } from 'antd';
import { get } from '../../../utils/httpMethods';
import { browserStrings } from './Strings';
import StoryCard from './StoryCard';

const DifficultyStoriesTab = () => {
  const [stories, setStories] = useState([{}]);
  const [difficultyLabel, setDifficultyLabel] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    queryGetStoriesByDifficultyAndSet();
    let lang = localStorage.getItem('locale') || '';
    browserStrings.setLanguage(lang);
    //Move to new function
    setLink(localStorage.getItem('difficulty') || 'Beginner');
  }, []);

  const queryGetStoriesByDifficultyAndSet = async () => {
    const difficulty = localStorage.getItem('difficulty') || 'Beginner';
    setDifficultyLabel(browserStrings[difficulty]);
    const url = '/story/difficulty/' + difficulty + '/6';
    let data = await get({ url: url });
    data = data.stories;
    showSelectedStories(data);
  };

  const showSelectedStories = (storyResults: any) => {
    setStories(storyResults);
  };

  return (
    <>
      <Row justify='space-around'>
        <h2>
          {difficultyLabel} {browserStrings.stories}
        </h2>
        <Link
          to={{
            pathname: '/difficulties/' + link,
          }}
        >
          <Button type='link'>{browserStrings.showMore}</Button>
        </Link>
      </Row>
      <Row justify='center'>
        {stories && stories.map((el: any) => <StoryCard story={el} />)}
      </Row>
    </>
  );
};

export default DifficultyStoriesTab;
