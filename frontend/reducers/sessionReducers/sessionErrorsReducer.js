import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER, CLEAR_SESSION_ERRORS } from '../../actions/sessionActions';

const sessionErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS: {
      const { errors } = action;

      return errors.slice();
    }
    case RECEIVE_CURRENT_USER: {
      return [];
    }
    case CLEAR_SESSION_ERRORS: {
      return [];
    }
    default:
      return oldState;
  }
};

export default sessionErrorsReducer;