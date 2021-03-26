import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Checkbox, Select, Form, Input, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import validator from '../../../utils/validators';
import { passwordLength, passwordWhitespacePattern } from './validators';
import { register } from '../../../store/actions/authActions';
import { IAuthFunction, IAuthReduxProps } from '../../../types/interfaces';
import { get } from 'lodash';

interface IProps {
  register: (values: IAuthFunction) => void;
}

const UserRegister = (props: IProps) => {
  const { register } = props;
  const [disableSubmit, setDisableSubmit] = useState(true);
  const { Option } = Select;
  const auth = get(props, 'auth.isAuthenticated');
  let history = useHistory();

  useEffect(() => {
    if (auth) {
      notification.error({ message: 'Already logged in', duration: 3 });
      history.push('/');
    }
  }, [auth]);

  const onFinish = (values: any) => {
    register({ ...values });
  };

  const onFieldsChange = (_: any, allFields: any) => {
    const hasErrors = allFields.some((el: any) => el.errors.length);
    const hasEmptyFields = allFields.some((el: any) => !el.value);
    setDisableSubmit(hasErrors || hasEmptyFields);
  };

  return (
    <div className='mainContainer'>
      <div className='formContainer'>
        <Form
          size='large'
          name='user_login'
          className='login-form'
          onFinish={onFinish}
          onFieldsChange={onFieldsChange}
        >
          <h1 className='mb-4'>Create an account</h1>

          <Form.Item name='name' rules={[validator.require]} hasFeedback>
            <Input placeholder='User Name' />
          </Form.Item>

          <Form.Item
            name='email'
            rules={[{ type: 'email' }, validator.require]}
            hasFeedback
          >
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[passwordWhitespacePattern, passwordLength(5)]}
            hasFeedback
          >
            <Input.Password
              type='password'
              prefix={<LockOutlined />}
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item name='level' rules={[{ required: true }]}>
            <Select placeholder='English Level' allowClear>
              <Option value='Beginner'>Beginner</Option>
              <Option value='Elementary'>Elementary</Option>
              <Option value='Intermediate'>Intermediate</Option>
              <Option value='Upper Intermediate'>Upper Intermediate</Option>
              <Option value='Expert'>Expert</Option>
              <Option value='Master'>Master</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='agreement'
            valuePropName='checked'
            rules={[validator.require]}
          >
            <Checkbox>
              I have read
              <Button
                className='pl-1'
                size='small'
                type='link'
                onClick={() => {
                  console.log('clicked');
                }}
                data-qa='termsBtn'
              >
                Terms and agreements
              </Button>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' disabled={disableSubmit}>
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            <p>
              Already have an account? Just click{' '}
              <Link to='/user/login' style={{ color: '#1DA57A' }}>
                Log in
              </Link>
              .
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(UserRegister);
