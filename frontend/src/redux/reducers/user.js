import {
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  SET_UPDATING_USER_STATUS
} from '../../redux/actions/types';
import isEmpty from '../../utils/validation/is-empty';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: Cookies.get('accessToken') != null,
  userInfo: [],
  isUpdating: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        userInfo: action.payload,
        loader: false
      };
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        userInfo: Object.assign(state.userInfo, action.payload)
      };
    case SET_UPDATING_USER_STATUS:
      return {
        ...state,
        isUpdating: action.payload
      };
    default:
      return state;
  }
}
