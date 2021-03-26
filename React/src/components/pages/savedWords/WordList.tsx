import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get, patch, post, del } from '../../../utils/httpMethods';
import { Card, Avatar } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { get as got } from 'lodash';
const { Meta } = Card;

const WordList = (props: any) => {
  let [words, setWords] = useState([]);
  console.log(props);
  const userId = got(props, 'auth.user.user._id', '');

  useEffect(() => {
    getMyWords();
  }, []);

  const getMyWords = async () => {
    let data = await get({ url: '/user/words' });
    console.log(data);
    console.log(data.words);
    setWords(data);
  };

  const removeWord = async (id: string) => {
    await patch({ url: '/words/user/remove/' + userId, data: { wordId: id } });
    getMyWords();
  };

  return (
    <div className='mainContainer'>
      <Card title={words.length + ' Saved Words'}>
        {words.map((el: any) => (
          <Card
            key={el._id}
            hoverable={true}
            style={{ marginTop: 16 }}
            title={el.word}
            type='inner'
            extra={
              <DeleteTwoTone
                onClick={() => removeWord(el._id)}
                twoToneColor='#1DA57A'
              />
            }
          >
            <Meta title={el.trans} />
          </Card>
        ))}
      </Card>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(WordList);
