import {
  DETAILS_USER_FAIL,
  DETAILS_USER_REQUEST,
  DETAILS_USER_RESET,
  DETAILS_USER_SUCCESS,
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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true };
    case LOGIN_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload };

    case LOGOUT_USER:
      return { userInfo: {} };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case DETAILS_USER_REQUEST:
      return { ...state, loading: true };
    case DETAILS_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case DETAILS_USER_FAIL:
      return { loading: false, error: action.payload };
    case DETAILS_USER_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_USER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PROFILE_USER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case UPDATE_PROFILE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
