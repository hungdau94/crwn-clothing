import {all, call, put, takeLatest} from 'redux-saga/effects';
import UserActionTypes from "./user.types";
import {auth, createUserProfileDocument, getCurrentUser, googleProvider} from "../../firebase/firebase.util";

import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess
} from "./user.actions";

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        yield put(signInFailure(e.message))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}

function* getSnapshotFromUserAuth(user, ...moreData) {
    try {
        const userRef = yield call(createUserProfileDocument, user, ...moreData);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess(
                {
                    id: userSnapshot.id,
                    ...userSnapshot.data()
                }
            )
        )
    } catch (e) {
        put(signInFailure(e))
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        put(signInFailure(e))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    )
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (e) {
        yield put(signOutFailure(e))
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signUpWithEmailPassword({payload: {displayName, email, password}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user, {displayName});
        yield put(signUpSuccess())
    } catch (e) {
        yield put(signUpFailure(e))
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUpWithEmailPassword);
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (e) {
        yield put(signInFailure(e));
    }
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart)
    ])
}

