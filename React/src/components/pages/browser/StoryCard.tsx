import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { get } from 'lodash';
import { browserStrings } from './Strings';
import DifficultyTag from './DifficultyTag';

const { Meta } = Card;

const StoryCard = (props: any) => {
  const story = get(props, 'story', {});
  console.log(story);

  return (
    <Link
      to={{
        pathname: '/story/' + story._id,
        state: { story: story.text, title: story.title },
      }}
    >
      <Card
        className='card-1'
        bordered={true}
        style={{
          height: 'auto',
          marginLeft: '10px',
          marginBottom: '10px',
          maxWidth: '200px',
        }}
        cover={
          <Avatar
            alt={story.title}
            size={200}
            shape='square'
            src={story.image}
            className='img-fluid'
            style={{
              width: 'auto',
              maxWidth: '200px',
            }}
          >
            {story.title}
          </Avatar>
        }
      >
        <Meta title={story.title} description={story.author} />
        <DifficultyTag difficulty={story.level} />
      </Card>
    </Link>
  );
};

export default StoryCard;
