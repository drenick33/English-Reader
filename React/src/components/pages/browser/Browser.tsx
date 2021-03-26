import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar, Col, Row, Tag } from 'antd';
import { get } from '../../../utils/httpMethods';
import { browserStrings } from './Strings';
const { Meta } = Card;

const Browser = (props: any) => {
  const [focus, setFocus] = useState(Number);
  const [stories, setStories] = useState([{}]);

  useEffect(() => {
    queryGetAllStories();
    let lang = localStorage.getItem('locale') || '';
    browserStrings.setLanguage(lang);
  }, []);

  async function queryGetAllStories(): Promise<any> {
    let data = await get({ url: `/story` });
    data = data.stories;
    setStories(data);
  }

  const handleHover = (_id: any) => {
    setFocus(_id);
  };

  const handleExit = () => {
    setFocus(0);
  };

  const difficultyTag = (level: string) => {
    let color = '';
    switch (level) {
      case 'Beginner':
        color = 'lime';
        break;
      case 'Elementary':
        color = 'green';
        break;
      case 'Intermediate':
        color = 'blue';
        break;
      case 'Upper Intermediate':
        color = 'orange';
        break;
      case 'Expert':
        color = 'volcano';
        break;
      case 'Master':
        color = 'magenta';
        break;
      default:
        color = 'purple';
    }

    return <Tag color={color}>{level}</Tag>;
  };

  return (
    <div className='mainContainer'>
      <div className='site-card-wrapper'>
        <Row justify='center'>
          <h1>{browserStrings.new}</h1>
        </Row>
        <Row justify='center'>
          {stories &&
            stories.map((el: any) => (
              <Col key={el._id}>
                {el._id === focus ? (
                  <Link
                    to={{
                      pathname: '/story/' + el._id,
                      state: { story: el.text, title: el.title },
                    }}
                  >
                    <Card
                      bordered={true}
                      style={{
                        height: 'auto',
                        marginLeft: '10px',
                        marginBottom: '10px',
                        maxWidth: '200px',
                        boxShadow: '1px 3px 1px 1px rgba(29, 165, 122, 0.5)',
                      }}
                      onMouseLeave={handleExit}
                      cover={
                        <Avatar
                          alt={el.title}
                          size={200}
                          shape='square'
                          src={el.image}
                          className='img-fluid'
                          style={{
                            width: 'auto',
                            maxWidth: '200px',
                          }}
                        >
                          {el.title}
                        </Avatar>
                      }
                    >
                      <Meta title={el.title} description={el.author} />
                      {difficultyTag(el.level)}
                    </Card>
                  </Link>
                ) : (
                  <Card
                    bordered={true}
                    style={{
                      height: 'auto',
                      marginLeft: '10px',
                      marginBottom: '10px',
                      maxWidth: '200px',
                    }}
                    onMouseOver={() => {
                      handleHover(el._id);
                    }}
                    cover={
                      <Avatar
                        alt='example'
                        size={200}
                        shape='square'
                        src={el.image}
                        className='img-fluid'
                        style={{
                          width: 'auto',
                          maxWidth: '200px',
                        }}
                      >
                        {el.title}
                      </Avatar>
                    }
                  >
                    <Meta title={el.title} description={el.author} />
                    {difficultyTag(el.level)}
                  </Card>
                )}
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default Browser;
