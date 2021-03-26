import React from 'react';
import { Space, Button } from 'antd';
import { SoundTwoTone, SaveTwoTone } from '@ant-design/icons';
import { get } from 'lodash';
import { storyStrings } from './Strings';

const StoryTrans = (props: any) => {
  let chinese = get(props, 'chinese', ['']);
  let showTrans = get(props, 'showTrans');
  let setShowTrans = get(props, 'setShowTrans');
  //   const playAudio = () => {
  //     //say.speak(trans);
  //   };

  return (
    <div onClick={() => setShowTrans(!showTrans)}>
      <Space
        direction='horizontal'
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {showTrans ? (
          <p style={{ fontSize: '24px' }}>{chinese}</p>
        ) : (
          <p style={{ fontSize: '24px' }}>{storyStrings.show}</p>
        )}
      </Space>
      <Space
        direction='horizontal'
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {/* <Button type='default' onClick={playAudio}>
          <SoundTwoTone twoToneColor='#1DA57A' />
          Play Audio
        </Button> */}
      </Space>
    </div>
  );
};

export default StoryTrans;
