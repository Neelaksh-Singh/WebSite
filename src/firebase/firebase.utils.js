import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDN8uGJVVRF3MSa7iUoWjTexJX1XmYTCZc",
    authDomain: "website-1-6e4ba.firebaseapp.com",
    projectId: "website-1-6e4ba",
    storageBucket: "website-1-6e4ba.appspot.com",
    messagingSenderId: "222840923045",
    appId: "1:222840923045:web:59cfe4e4f02e60a33f3e4c",
    measurementId: "G-YMWD1M5YN0"
}

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth){
        return
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()

    if(!snapshot.exists){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }
    return userRef

}


firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase