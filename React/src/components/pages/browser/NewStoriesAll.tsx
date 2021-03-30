import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { get } from '../../../utils/httpMethods';
import { browserStrings } from './Strings';
import StoryCard from './StoryCard';

const NewStoriesAll = () => {
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
      <Row justify='center'>
        <h2>{browserStrings.new}</h2>
      </Row>
      <Row justify='center'>
        {stories && stories.map((el: any) => <StoryCard story={el} />)}
      </Row>
    </div>
  );
};

export default NewStoriesAll;
