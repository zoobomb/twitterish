import { dbService, storageService } from "myFirebase";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  /* oldschool...
  const getTweets = async () => {
    const dbTweets = await dbService.collection("tweets").get();
    // console.log(userObj.uid);
    dbTweets.forEach((document) => {
      //   console.log(document.data());
      const tweetObj = {
        ...document.data(),
        id: document.id,
      };
      setTweets((prev) => [tweetObj, ...prev]);
    });
    console.log(dbTweets); // quarySnapShat
  };
  */
  useEffect(() => {
    // getTweets();
    dbService.collection("tweets").onSnapshot((snapshot) => {
      //   console.log("Something happened!");
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []); // component is mounted

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    setTweet(event.target.value);
    // console.log(tweet);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const myFile = files[0];
    const reader = new FileReader(); // file api
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(myFile);
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type='file' accept='image/*' onChange={onFileChange} />
        <input type='submit' value='Tweet' />
        {attachment && (
          <div>
            <img src={attachment} width='50px' />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((obj) => (
          <Tweet
            key={obj.id}
            tweetObj={obj}
            isOwner={obj.creatorId === userObj.uid ? true : false}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
