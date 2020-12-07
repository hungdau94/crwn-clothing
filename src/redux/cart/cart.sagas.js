import {all, call, takeLatest, put} from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import {clearCart} from "./cart.actions";

export function* clearCartOnUserActions(){
    yield put(clearCart())
}

export function* onCheckoutSuccess(){
    yield takeLatest(UserActionTypes.CHECKOUT_SUCCESS, clearCartOnUserActions)
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnUserActions);
}

export function* cartSagas(){
    yield all([call(onSignOutSuccess), call(onCheckoutSuccess)]);
}