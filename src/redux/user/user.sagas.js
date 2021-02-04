import {takeLatest,   all, call, put} from 'redux-saga/effects'

import UserActionTypes from './user.types'
import {signInFailiur , signInSuccess, signOutFailiur, signOutSuccess, signUpFailiur, signUpSuccess} from './users.actions'

import {auth, googleprovider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'


export function* getSnapShotFromUserAuth(userAuth, additionalData){
    try {
        const userRef = yield call(createUserProfileDocument,userAuth, additionalData )
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({id: userSnapshot.id , ...userSnapshot.data()}))
    
    } catch (error) {
        yield put(signInFailiur(error))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleprovider)
        yield getSnapShotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailiur(error))
    }

}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({payload: {email,password}}) {
     try {
        const {user} = yield auth.signInWithEmailAndPassword(email,password)
        yield getSnapShotFromUserAuth(user)
    } catch (error) {
         yield put(signInFailiur(error))
     }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser()
        if(!userAuth) return
        yield getSnapShotFromUserAuth(userAuth)
    } catch (error) {
        yield put(signInFailiur(error))
        
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut(){
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailiur(error))
    }
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* signUp({payload: {email, password, displayname}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(
            email,
            password 
        )
        yield put(signUpSuccess({user, additionalData:{displayname}}))
    } catch (error) {
        yield put(signUpFailiur(error))
        
    }
}

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* signInAfterSignUp({payload: {user, additionalData}}){
    yield getSnapShotFromUserAuth(user,additionalData)
}

export function* onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}
