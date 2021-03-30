import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Button } from 'antd';
import { get } from '../../../utils/httpMethods';
import { browserStrings } from './Strings';
import StoryCard from './StoryCard';

const NewStoriesTab = () => {
  const [stories, setStories] = useState([{}]);

  useEffect(() => {
    queryGetAllStoriesAndSet();
    let lang = localStorage.getItem('locale') || '';
    browserStrings.setLanguage(lang);
  }, []);

  const queryGetAllStoriesAndSet = async () => {
    let data = await get({ url: `/story/new/6` });
    data = data.stories;
    showSelectedStories(data);
  };

  const showSelectedStories = (storyResults: any) => {
    setStories(storyResults);
  };

  return (
    <>
      <Row justify='space-around'>
        <h2>{browserStrings.new}</h2>
        <Link to={{ pathname: '/newstories' }}>
          <Button type='link'>{browserStrings.showMore}</Button>
        </Link>
      </Row>
      <Row justify='center'>
        {stories && stories.map((el: any) => <StoryCard story={el} />)}
      </Row>
    </>
  );
};

export default NewStoriesTab;
