import { signInWithPopup } from 'firebase/auth';

import { firebase } from '../config/firebase-config';

const socialMediaAuth = (provider) => {
  signInWithPopup(firebase, provider)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// console.log(socialMediaAuth())

export default socialMediaAuth;
