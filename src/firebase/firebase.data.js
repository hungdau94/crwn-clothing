import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();
firestore.collection('users')
    .doc('8rsxRt4KNWthjBoyQ4VV')
    .collection('itemsList')
    .doc('G1iKlzIoJWjh0CAQKYUq');
