import ShopActionTypes from "./shop.types";
import {convertCollectionSnapshotToMap, firestore} from "../../firebase/firebase.util";

const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef
            .get()
            .then(snapshot => {
                const collectionMap = convertCollectionSnapshotToMap(snapshot);
                dispatch(fetchCollectionsSuccess(collectionMap));
            })
            .catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
};


