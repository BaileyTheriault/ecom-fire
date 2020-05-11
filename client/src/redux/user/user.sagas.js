import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutUserSuccess,
  signOutUserFailure,
  createUserSuccess,
  createUserFailure,
} from './user.actions';

import {
  googleProvider,
  auth,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additonalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additonalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* signOutCurrentUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (err) {
    yield put(signOutUserFailure(err.message));
  }
}

export function* createUser({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(createUserSuccess({ user, additonalData: { displayName } }));
  } catch (err) {
    yield put(createUserFailure(err.message));
  }
}

export function* signInAfterSignUp({ payload: { user, additonalData } }) {
  yield getSnapshotFromUserAuth(user, additonalData);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onUserSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_USER_START, signOutCurrentUser);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.CREATE_USER_START, createUser);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.CREATE_USER_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(isUserAuthenticated),
    call(onUserSignOut),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
