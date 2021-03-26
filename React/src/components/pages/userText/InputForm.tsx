import React, { useState } from 'react';
import { Button, Input, Menu, notification } from 'antd';
import {
  CopyTwoTone,
  FolderTwoTone,
  CheckSquareTwoTone,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import useClippy from 'use-clippy';

const { TextArea } = Input;

//@TODO PREVENT SCROLLING AND USE PADDING TO MAKE INPUT SIZE CORRECTLY
const InputForm = () => {
  let [text, setText] = useState('');
  let history = useHistory();
  const [clipboard] = useClippy();

  const handleInput = (e: any) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (text !== '') {
      //Make sure there is text
      history.push({
        pathname: '/story/custom',
        state: {
          story: text.replace(/--/g, ' '),
          title: 'Custom Story',
        },
      });
    } else {
      notification.warn({
        message: 'No text',
        description: 'Please enter your text before submiting :)',
        duration: 2,
      });
    }
  };

  const handleClipboardClick = () => {
    setText(clipboard);
    console.log(text);
  };

  const handleFileSelect = (e: any) => {
    console.log(e.target.files[0]);
  };

  return (
    <div className="mainContainer">
      <div
        style={{
          padding: '42px',
        }}
      >
        <TextArea
          value={text}
          placeholder="Write your text here"
          autoSize={{ minRows: 30, maxRows: 69 }}
          onChange={handleInput}
        />
      </div>
      <footer
        style={{
          backgroundColor: 'green',
        }}
      >
        <Menu theme="light" mode="horizontal">
          <Menu.Item key="1" style={{ float: 'right', paddingTop: '12px' }}>
            <Button type="primary" onClick={handleSubmit}>
              <label>Submit</label>
              <CheckSquareTwoTone
                twoToneColor="#1DA57A"
                style={{ paddingLeft: '12px', fontSize: 18 }}
              />
            </Button>
          </Menu.Item>
          <Menu.Item key="2" style={{ float: 'right', paddingTop: '12px' }}>
            <Button type="ghost" onClick={handleClipboardClick}>
              <label>Clipboard</label>
              <CopyTwoTone
                twoToneColor="#1DA57A"
                style={{ paddingLeft: '12px', fontSize: 18 }}
              />
            </Button>
          </Menu.Item>
          {/* <Menu.Item key="3" style={{ float: 'right', paddingTop: '12px' }}>
            <Button type="ghost">
              <input
                              type="file"
                              accept='/'
                onChange={handleFileSelect}
                style={{
                  opacity: '0.0',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  bottom: '0',
                  right: '0',
                  height: 32,
                  width: 91,
                  cursor: 'pointer',
                  fontSize: 0,
                  zIndex: 999,
                }}
              ></input>
              <label>File</label>
              <FolderTwoTone
                twoToneColor="#1DA57A"
                style={{ paddingLeft: '12px' }}
              />
            </Button>
          </Menu.Item> */}
        </Menu>
      </footer>
    </div>
  );
};

export default InputForm;
