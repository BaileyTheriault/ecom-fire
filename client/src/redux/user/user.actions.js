import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = errMsg => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: errMsg,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: UserActionTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_USER_SUCCESS,
});

export const signOutUserFailure = errMsg => ({
  type: UserActionTypes.SIGN_OUT_USER_FAILURE,
  payload: errMsg,
});

export const createUserStart = user => ({
  type: UserActionTypes.CREATE_USER_START,
  payload: user,
});

export const createUserSuccess = ({ user, additonalData }) => ({
  type: UserActionTypes.CREATE_USER_SUCCESS,
  payload: { user, additonalData },
});

export const createUserFailure = errMsg => ({
  type: UserActionTypes.CREATE_USER_FAILURE,
  payload: errMsg,
});
