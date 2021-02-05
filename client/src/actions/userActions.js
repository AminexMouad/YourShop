import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import {
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DETAILS_USER_FAIL,
  DETAILS_USER_REQUEST,
  DETAILS_USER_RESET,
  DETAILS_USER_SUCCESS,
  LIST_USER_FAIL,
  LIST_USER_REQUEST,
  LIST_USER_RESET,
  LIST_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_USER_FAIL,
  UPDATE_PROFILE_USER_REQUEST,
  UPDATE_PROFILE_USER_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: LOGOUT_USER });
  dispatch({ type: DETAILS_USER_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: LIST_USER_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DETAILS_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: DETAILS_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DETAILS_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PROFILE_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({ type: UPDATE_PROFILE_USER_SUCCESS, payload: data });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    dispatch({ type: DETAILS_USER_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);
    dispatch({ type: LIST_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);
    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
