import axios from 'axios';
import { get, post } from '../../utils/httpMethods';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';
import { IAuthFunction, IConfigHeaders } from '../../types/interfaces';

//@TODO Clean up network calls using httpMethods util

// Check token & load user
export const loadUser = () => async (
  dispatch: Function,
  getState: Function
) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // let data = await post({ url: '/user/login' });
  // console.log(data);

  console.log('LOCALSTORAGE');
  console.log(localStorage);
  axios
    .get('http://localhost:5000/user', tokenConfig(getState))
    .then((res) => {
      console.log(res);
      dispatch({
        type: USER_LOADED,
        payload: res.data, //User and Token
      });
    })
    .catch((err) => {
      console.log('hi');
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = ({
  name,
  email,
  password,
  level,
}: IAuthFunction) => async (dispatch: Function) => {
  // Headers
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };

  // Request body
  const body = JSON.stringify({ name, email, password, level });

  let data = await post({ url: '/user/register', data: body });
  console.log(data.name);
  if (data !== Error) {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({
      type: REGISTER_FAIL,
    });
  }

  // axios
  //   .post('http://localhost:5000/user/register', body, config)
  //   .then((res) =>
  //     dispatch({
  //       type: REGISTER_SUCCESS,
  //       payload: res.data,
  //     })
  //   )
  //   .catch((err) => {
  //     dispatch(
  //       returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
  //     );
  //     dispatch({
  //       type: REGISTER_FAIL,
  //     });
  //   });
};

// Login User
export const login = ({ email, password }: IAuthFunction) => async (
  dispatch: Function
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log('In login');

  // Request body

  // Request body
  const body = JSON.stringify({ email, password });

  let data = await post({ url: '/user/login', data: body });
  console.log(data.name);
  if (data.name !== 'Error') {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => {
  console.log('in logout');
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState: Function) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config: IConfigHeaders = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  console.log('TOKEN');
  console.log(token);

  return config;
};
