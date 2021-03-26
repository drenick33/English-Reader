import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { get } from '../../../utils/httpMethods';
import { browserStrings } from './Strings';
import StoryCard from './StoryCard';

const Browser = () => {
  const [stories, setStories] = useState([{}]);

  useEffect(() => {
    queryGetAllStoriesAndSet();
    let lang = localStorage.getItem('locale') || '';
    browserStrings.setLanguage(lang);
  }, []);

  const queryGetAllStoriesAndSet = async () => {
    let data = await get({ url: `/story` });
    data = data.stories;
    showSelectedStories(data);
  };

  const showSelectedStories = (storyResults: any) => {
    setStories(storyResults);
  };

  return (
    <div className='mainContainer'>
      <div className='site-card-wrapper'>
        <Row justify='center'>
          <h1>{browserStrings.new}</h1>
        </Row>
        <Row justify='center'>
          {stories && stories.map((el: any) => <StoryCard story={el} />)}
        </Row>
      </div>
    </div>
  );
};

export default Browser;
