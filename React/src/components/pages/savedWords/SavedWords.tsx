import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Avatar } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
const { Meta } = Card;

//@TODO, make LINK work for any story
//@TODO, add page to state data in link
//@TODO, later add pagination (maybe in backend)

const SavedWords = (props: any) => {
  return (
    <div className="mainContainer">
      <Card title={props.words.length + ' Saved Words'}>
        {props.words.map((el: any) => (
          <Card
            key={el._id}
            hoverable={true}
            style={{ marginTop: 16 }}
            title={el.word}
            type="inner"
            extra={<DeleteTwoTone twoToneColor="#1DA57A" />}
          >
            <Meta
              title={el.trans}
              avatar={
                <Avatar
                  size="large"
                  src={el.story.avatar}
                  style={{ marginRight: 20 }}
                />
              }
              description={
                <div>
                  <span>From: </span>
                  <Link
                    to={{
                      pathname: el.story.link,
                      state: {
                        story: props.stories[1].text,
                        title: props.stories[1].text,
                      },
                    }}
                  >
                    {el.story.title}
                  </Link>
                </div>
              }
            />
          </Card>
        ))}
      </Card>
      ,
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    words: state.words.savedWords,
    stories: state.stories.stories,
  };
};

export default connect(mapStateToProps, null)(SavedWords);
