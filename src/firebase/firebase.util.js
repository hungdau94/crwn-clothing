import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCzePWaThUa6aHbza7Fx30rSlcnu7oVfjo",
    authDomain: "crwn-clothing-c50da.firebaseapp.com",
    databaseURL: "https://crwn-clothing-c50da.firebaseio.com",
    projectId: "crwn-clothing-c50da",
    storageBucket: "crwn-clothing-c50da.appspot.com",
    messagingSenderId: "737743387569",
    appId: "1:737743387569:web:9b16a23316024f035d9b90",
    measurementId: "G-WKBHHXCJN6"
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, moreData) => {
    if(!userAuth){
        return;
    }
    const ref = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await ref.get();

    if(!snapshot.exists){
        const { displayName , email } = userAuth;
        const createdAt = new Date();

        try{
            await ref.set({
                displayName,
                email,
                createdAt,
                ...moreData
            })
        } catch (err) {
            console.log("Error creating user", err.message)
        }
    }
    return ref;

};

export default firebase;