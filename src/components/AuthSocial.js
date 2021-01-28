import React from "react";
import { authService, firebaseInstance } from "myFirebase";

const AuthSocial = () => {
  const onSocialClick = async (event) => {
    // console.log(event.target.name);
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <button name='google' onClick={onSocialClick}>
        Continue with Google
      </button>
      <button name='github' onClick={onSocialClick}>
        Continue with Github
      </button>
    </div>
  );
};

export default AuthSocial;
