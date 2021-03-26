import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Input, notification } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import validator from '../../../utils/validators';
import { get } from 'lodash';
import { login } from '../../../store/actions/authActions';
import { IAuthFunction, IAuthReduxProps } from '../../../types/interfaces';

interface IProps {
  login: (values: IAuthFunction) => void;
  children: any;
}

const UserLogin = (props: IProps) => {
  const { login } = props;
  const auth = get(props, 'auth.isAuthenticated');
  let history = useHistory();
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    if (auth) {
      notification.error({ message: 'Already logged in', duration: 3 });
      history.push('/');
    }
  }, [auth]);

  const onFinish = (values: any) => {
    login({ ...values });
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
          name='normal_login'
          className='login-form'
          onFieldsChange={onFieldsChange}
          onFinish={onFinish}
        >
          <h1 className='mb-4'>Welcome back!</h1>

          <Form.Item
            name='email'
            rules={[{ type: 'email' }, validator.require]}
          >
            <Input
              addonBefore={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>

          <Form.Item name='password' rules={[validator.require]}>
            <Input
              addonBefore={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              disabled={disableSubmit}
            >
              Log in
            </Button>
          </Form.Item>

          <Form.Item>
            <p>
              Don’t have an account?{' '}
              <Link to='/user/register' style={{ color: '#1DA57A' }}>
                Create one
              </Link>
              .
            </p>

            <p>
              Forgot your password?{' '}
              <Link to='/user/password/reset' style={{ color: '#1DA57A' }}>
                Reset it
              </Link>
              .
            </p>
          </Form.Item>
        </Form>
        {/*Log In with google or facebook are temporarily disabled, work in progress */}
        {/*<FirebaseAuthentication />*/}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(UserLogin);
