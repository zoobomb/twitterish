import React from "react";
import { authService, firebaseInstance } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

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
    <div className='authBtns'>
      <button name='google' onClick={onSocialClick} className='authBtn'>
        Continue with Google <FontAwesomeIcon icon={faGoogle} />
      </button>
      <button name='github' onClick={onSocialClick} className='authBtn'>
        Continue with Github <FontAwesomeIcon icon={faGithub} />
      </button>
    </div>
  );
};

export default AuthSocial;
