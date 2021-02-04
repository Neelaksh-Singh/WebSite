import { takeLatest, call, put, all } from "redux-saga/effects";
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {
    fetchCollectionsSucccess,
    fetchCollectionsFailiur

} from './shop.actions'

import ShopActionTypes from './shop.types'

export function* fetchCollectionsAsync(){
    yield console.log('I am fired');

    try {

        const collectionRef  =  firestore.collection('collections')

        const snapshot =  yield collectionRef.get()
        const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        yield put(fetchCollectionsSucccess(collectionMap))

    } catch (error) {
        yield put(fetchCollectionsFailiur(error.message))
        
    }
    
        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        //     dispatch(fetchCollectionsSucccess(collectionsMap))
           
        //   }).catch(error => dispatch(fetchCollectionsFailiur(error.message)))
    

}

export function* fetchCollectionsStart() {
    // only want to fire api call one time
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
} 

export function* shopSagas(){
    yield all([
        call(fetchCollectionsStart)
    ])
}