import { authService, dbService } from "myFirebase";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.dispayName);

  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyTweet = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt", "desc")
      .get();
    console.log(tweets.docs.map((doc) => doc.data));
  };

  useEffect(() => {
    getMyTweet();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.dispayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit} className='profileForm'>
        <input
          onChange={onChange}
          type='text'
          autoFocus
          placeholder='Display name'
          value={newDisplayName}
          className='formInput'
        />
        <input
          type='submit'
          value='Update Profile'
          className='formBtn'
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className='formBtn cancelBtn logOut' onClick={onLogoutClick}>
        Log Out
      </span>
    </div>
  );
};
export default Profile;
