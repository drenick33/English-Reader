import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import { get } from 'lodash';
import { browserStrings } from './Strings';

const StoryCard = (props: any) => {
  const difficulty = get(props, 'difficulty', 'Beginner');
  let [color, setColor] = useState('');

  useEffect(() => {
    setDifficultyTagColor();
  }, [difficulty]);

  const setDifficultyTagColor = () => {
    switch (difficulty) {
      case 'Beginner':
        setColor('lime');
        break;
      case 'Elementary':
        setColor('green');
        break;
      case 'Intermediate':
        setColor('blue');
        break;
      case 'Upper Intermediate':
        setColor('orange');
        break;
      case 'Expert':
        setColor('volcano');
        break;
      case 'Master':
        setColor('magenta');
        break;
      default:
        setColor('purple');
    }
  };

  return <Tag color={color}>{browserStrings[difficulty]}</Tag>;
};

export default StoryCard;
