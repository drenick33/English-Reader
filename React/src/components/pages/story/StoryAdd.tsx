import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Row, Col, Select, Form, Input, notification } from 'antd';
import validator from '../../../utils/validators';
import { IAuthFunction, IAuthReduxProps } from '../../../types/interfaces';
import { get } from 'lodash';
import { post } from '../../../utils/httpMethods';

const { TextArea } = Input;

interface IProps {
  register: (values: IAuthFunction) => void;
}

const StoryAdd = (props: IProps) => {
  const [eng, setEng] = useState('');
  const [chi, setChi] = useState('');
  const { Option } = Select;
  const auth = get(props, 'auth.isAuthenticated');
  const role = get(props, 'auth.user.user.role');

  let history = useHistory();

  useEffect(() => {
    //Check if user has permission
    if (role !== 'admin') {
      notification.error({ message: 'Access Denied', duration: 3 });
      history.push('/');
    }
  }, [auth]);

  async function queryPostStory(): Promise<any> {}

  const onFinish = async (values: any) => {
    if (chi !== '' || eng !== '') {
      let payload = { ...values };
      let english = [];
      let chinese = [];
      english = eng.split(/\r?\n/);
      chinese = chi.split(/\r?\n/);
      payload['english'] = english;
      payload['chinese'] = chinese;
      if (english.length === chinese.length) {
        console.log(values);
        let data = await post({ url: '/story/', data: payload });
        console.log(data);
        if ((data.message = 'Story Added!')) {
          notification.success({
            message: 'Added: ' + data.story.title,
          });
        }
      } else {
        notification.error({
          message: 'English & Chinese need the same number of lines',
          duration: 2,
        });
      }
    } else {
      notification.error({
        message: 'No text',
        duration: 2,
      });
    }
  };

  const handleInputEng = (e: any) => {
    setEng(e.target.value);
  };

  const handleInputChi = (e: any) => {
    setChi(e.target.value);
  };

  return (
    <div className='mainContainer'>
      <div className='formContainer'>
        <h1 className='mb-4'>Add a story</h1>
        <Row gutter={6}>
          <Col span={12}>
            <h3>English</h3>
            <TextArea
              value={eng}
              placeholder='English here'
              autoSize={{ minRows: 20, maxRows: 30 }}
              onChange={handleInputEng}
            />
          </Col>

          <Col span={12}>
            <h3>Chinese</h3>
            <TextArea
              value={chi}
              placeholder='Chinese here'
              autoSize={{ minRows: 20, maxRows: 30 }}
              onChange={handleInputChi}
            />
          </Col>
        </Row>
        <Form
          size='large'
          name='story_add_form'
          className='story-add-form'
          onFinish={onFinish}
        >
          <Row gutter={6} className='mt-4'>
            <Col span={6}>
              <Form.Item name='level' rules={[{ required: true }]}>
                <Select placeholder='Story Level' allowClear>
                  <Option value='Beginner'>Beginner</Option>
                  <Option value='Elementary'>Elementary</Option>
                  <Option value='Intermediate'>Intermediate</Option>
                  <Option value='Upper Intermediate'>Upper Intermediate</Option>
                  <Option value='Expert'>Expert</Option>
                  <Option value='Master'>Master</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='genre' rules={[{ required: true }]}>
                <Select placeholder='Genre' allowClear>
                  <Option value='poetry'>Poetry</Option>
                  <Option value='dialogue'>Dialogue</Option>
                  <Option value='story'>Story</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='author' rules={[{ required: true }]}>
                <Input placeholder='author' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='tags' rules={[validator.require]} hasFeedback>
                <Input placeholder='Tags seperated by a ","' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={6}>
            <Col span={6}>
              <Form.Item name='title' rules={[validator.require]} hasFeedback>
                <Input placeholder='Title' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='description'
                rules={[validator.require]}
                hasFeedback
              >
                <Input placeholder='Description' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='image' rules={[validator.require]} hasFeedback>
                <Input placeholder='image URL' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={6} justify='end'>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Add
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(StoryAdd);
