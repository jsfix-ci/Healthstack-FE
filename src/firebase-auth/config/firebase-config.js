import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCaip9EpUwmTX2VbRtxESjS_xgGJn4AYtU',
  authDomain: 'healthstack-eebd5.firebaseapp.com',
  projectId: 'healthstack-eebd5',
  storageBucket: 'healthstack-eebd5.appspot.com',
  messagingSenderId: '221269896200',
  appId: '1:221269896200:web:40601fae6525175180b5bd',
  measurementId: 'G-PLGEN89WMG',
};

const app = initializeApp(firebaseConfig);

export const firebase = getAuth(app);
