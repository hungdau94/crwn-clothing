import {all, call, put, takeEvery} from 'redux-saga/effects';

import {convertCollectionSnapshotToMap, firestore} from "../../firebase/firebase.util";
import ShopActionTypes from './shop.types';
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(
            convertCollectionSnapshotToMap,
            snapshot
        );
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (e) {
        yield put(fetchCollectionsFailure(e.message))
    }
}

export function* fetchCollectionsAsyncLocal(){
    const url = "http://localhost:8080/api/v1/collection";
    try{
        const fetchCollection = async () => {
            const res = await fetch(url);
            const collection = await res.json();
            return convertCollectionsToMap(collection);
        };
        const collectionsMap = yield fetchCollection();
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (e) {
        yield put(fetchCollectionsFailure(e.message))
    }
}
// reducer -> [[id, title1], [id, title2]] -> map{title1 -> [id, title1], title2 -> [id, title2]}
export function convertCollectionsToMap(collectionsJson){
    const reduced = collectionsJson
        .reduce((accumulator, collection) => {
            accumulator[collection.title.toLowerCase()] = collection;
            return accumulator;
        }, {});
    console.log(reduced);
    return reduced;
}


export function* fetchCollectionsStart() {
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsyncLocal
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}