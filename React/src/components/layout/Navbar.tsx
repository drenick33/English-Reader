import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { HomeTwoTone } from '@ant-design/icons';
import NavDrawer from './NavDrawer';
import { logout } from '../../store/actions/authActions';
import {
  IAppNavbar,
  ILogoutProps,
  IAuthReduxProps,
} from '../../types/interfaces';
import { get } from 'lodash';
import { navStrings } from './Strings';

const Navbar = ({ logout, auth }: ILogoutProps) => {
  let history = useHistory();
  const role = get(auth, 'user.user.role');
  console.log(role);
  console.log(auth);

  useEffect(() => {
    let lang = localStorage.getItem('locale') || '';
    navStrings.setLanguage(lang);
  }, []);

  const setLang = (lang: string) => {
    localStorage.setItem('locale', lang);
    window.location.reload();
  };

  const logoutHandler = () => {
    history.push('/');
    logout();
  };

  return (
    <Menu theme='light' mode='horizontal'>
      <Menu.Item key='home'>
        <a href='/'>
          <HomeTwoTone twoToneColor={'#1DA57A'} />
          <span>{navStrings.reader}</span>
        </a>
      </Menu.Item>
      <Menu.Item key='options' style={{ float: 'right' }}>
        <NavDrawer></NavDrawer>
      </Menu.Item>
      {auth.isAuthenticated ? (
        <>
          <Menu.Item key='logout' style={{ float: 'right' }}>
            <Button type='text' onClick={logoutHandler}>
              {navStrings.logout}
            </Button>
          </Menu.Item>
          <Menu.Item key='words' style={{ float: 'right' }}>
            <Link to={{ pathname: '/words' }}>{navStrings.saved}</Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key='register' style={{ float: 'right' }}>
            <Link
              to={{
                pathname: '/user/register',
              }}
            >
              {navStrings.register}
            </Link>
          </Menu.Item>
          <Menu.Item key='login' style={{ float: 'right' }}>
            <Link
              to={{
                pathname: '/user/login',
              }}
            >
              {navStrings.login}
            </Link>
          </Menu.Item>
        </>
      )}
      <Menu.Item key='search' style={{ float: 'right' }}>
        <Link
          to={{
            pathname: '/search/',
          }}
        >
          {navStrings.search}
        </Link>
      </Menu.Item>
      <Menu.Item key='custom' style={{ float: 'right' }}>
        <Link
          to={{
            pathname: '/custom/',
          }}
        >
          {navStrings.custom}
        </Link>
      </Menu.Item>
      {role === 'admin' ? (
        <Menu.Item key='addstory' style={{ float: 'right' }}>
          <Link
            to={{
              pathname: '/addstory/',
            }}
          >
            {navStrings.add}
          </Link>
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
